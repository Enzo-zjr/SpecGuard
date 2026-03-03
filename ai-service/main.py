"""
SpecGuard AI Service - Main Entry Point
"""
import os
import logging
import tempfile
from contextlib import asynccontextmanager

from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
import uvicorn

from config import settings
from database import ensure_vector_extension, ensure_chunks_table, search_similar_chunks
from ingestion import run_ingestion, get_embeddings_model

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """应用启动时初始化数据库"""
    if settings.database_url:
        logger.info("初始化数据库 (pgvector)...")
        ensure_vector_extension()
        ensure_chunks_table()
        logger.info("数据库初始化完成")
    else:
        logger.warning("DATABASE_URL 未配置, 跳过数据库初始化")
    yield


app = FastAPI(title="SpecGuard AI Service", lifespan=lifespan)


# ────────────────────────────────────────────────────────────────
# Models
# ────────────────────────────────────────────────────────────────

class ReviewRequest(BaseModel):
    code: str
    project_id: int
    document_id: int | None = None


# ────────────────────────────────────────────────────────────────
# Routes
# ────────────────────────────────────────────────────────────────

@app.get("/")
async def root():
    return {"message": "SpecGuard AI Service is running", "model": settings.model_name}


@app.post("/process-document")
async def process_document(
    project_id: int,
    document_id: int | None = None,
    file: UploadFile = File(...),
):
    """
    文档建库接口: 接收文件, 执行完整的 Ingestion Pipeline
    1. 读取文件内容
    2. 按章节分段
    3. 调用 Embedding 模型向量化
    4. 写入 PostgreSQL (pgvector)
    """
    if not settings.database_url:
        raise HTTPException(status_code=503, detail="DATABASE_URL 未配置, 无法执行向量化入库")

    # 将上传文件临时保存到磁盘
    suffix = os.path.splitext(file.filename or "file.md")[1] or ".md"
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    try:
        chunk_count = run_ingestion(
            filepath=tmp_path,
            project_id=project_id,
            document_id=document_id,
        )
    finally:
        os.unlink(tmp_path)  # 删除临时文件

    return {
        "status": "success",
        "filename": file.filename,
        "project_id": project_id,
        "chunks_stored": chunk_count,
    }


@app.post("/workflow/review")
async def review_workflow(request: ReviewRequest):
    """
    代码评审工作流: 检索规范 + 调用 DeepSeek 评审
    1. 将代码片段向量化
    2. 从向量库检索最相关的规范片段
    3. 组装 Prompt
    4. 调用 DeepSeek 生成结构化评审结果
    """
    from langchain_openai import ChatOpenAI
    from langchain.schema import HumanMessage, SystemMessage

    # Step 1: 向量化查询代码
    embedding_model = get_embeddings_model()
    query_vector = embedding_model.embed_query(request.code)

    # Step 2: 检索最相关的规范片段
    context_chunks: list[str] = []
    if settings.database_url:
        context_chunks = search_similar_chunks(
            query_embedding=query_vector,
            project_id=request.project_id,
            top_k=5,
        )
    context = "\n\n".join(context_chunks) if context_chunks else "（暂无规范数据，请先上传规范文档）"

    # Step 3: 组装 Prompt
    system_prompt = """你是一个专业的 Java 代码架构师，请根据【团队规范】对【代码片段】进行评审。

评审要求:
1. 必须指出违反了哪一条团队规范（引用原文）。
2. 若有通用代码质量问题（如圈复杂度、空指针风险）也一并指出。
3. 按以下 JSON 格式返回结果，不要有多余内容:
{
  "issues": [
    {
      "severity": "CRITICAL 或 WARNING",
      "rule_reference": "规范原文",
      "description": "问题描述",
      "suggestion": "修改建议",
      "fixed_code": "修复后的代码示例"
    }
  ]
}"""

    user_prompt = f"""【团队规范】:
{context}

【代码片段】:
{request.code}"""

    # Step 4: 调用 DeepSeek
    llm = ChatOpenAI(
        api_key=settings.deepseek_api_key,
        base_url=settings.deepseek_api_base,
        model=settings.model_name,
        temperature=0.2,
    )

    response = llm.invoke([
        SystemMessage(content=system_prompt),
        HumanMessage(content=user_prompt),
    ])

    return {
        "status": "success",
        "project_id": request.project_id,
        "context_chunks_used": len(context_chunks),
        "review_result": response.content,
    }


if __name__ == "__main__":
    uvicorn.run(app, host=settings.host, port=settings.port)
