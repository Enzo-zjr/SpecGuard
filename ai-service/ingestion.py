"""
SpecGuard 文档摄入 (Ingestion) 工作流
流程:
  1. 读取文件 (Markdown / PDF / Docx)
  2. 按章节智能分段 (Chunking)
  3. 调用 Embedding 模型将分段转为向量
  4. 将向量 + 原文 + 元数据存入 PostgreSQL (pgvector)
"""
import logging
from pathlib import Path
from typing import Optional
from langchain_text_splitters import MarkdownHeaderTextSplitter, RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from config import settings
from database import save_chunks

logger = logging.getLogger(__name__)

# ────────────────────────────────────────────────────────────────
# 1. 读取文件
# ────────────────────────────────────────────────────────────────

def read_file(filepath: str) -> str:
    """
    读取文件内容, 支持 Markdown / PDF / Docx / 纯文本
    返回纯文本字符串
    """
    path = Path(filepath)
    suffix = path.suffix.lower()

    if suffix in (".md", ".txt"):
        return path.read_text(encoding="utf-8")

    elif suffix == ".pdf":
        from pypdf import PdfReader
        reader = PdfReader(str(path))
        pages = [page.extract_text() or "" for page in reader.pages]
        return "\n".join(pages)

    elif suffix in (".docx",):
        from docx import Document
        doc = Document(str(path))
        return "\n".join(para.text for para in doc.paragraphs)

    else:
        raise ValueError(f"不支持的文件类型: {suffix}")


# ────────────────────────────────────────────────────────────────
# 2. 文档分段策略
# ────────────────────────────────────────────────────────────────

_MD_HEADERS = [
    ("#", "level1"),
    ("##", "level2"),
    ("###", "level3"),
]

def split_text(text: str, file_suffix: str = ".md") -> list[dict]:
    """
    将文本分段, 返回 list of {chunk_text, section}
    Markdown: 按章节标题切分 (保留语义完整性)
    其他: 按 token 窗口切分
    """
    chunks = []

    if file_suffix in (".md", ".txt"):
        md_splitter = MarkdownHeaderTextSplitter(
            headers_to_split_on=_MD_HEADERS,
            strip_headers=False
        )
        docs = md_splitter.split_text(text)

        # 对过长的 chunk 再做二次切分
        rc_splitter = RecursiveCharacterTextSplitter(
            chunk_size=800,
            chunk_overlap=80,
        )
        for doc in docs:
            sub_docs = rc_splitter.split_documents([doc])
            for sub in sub_docs:
                section = " > ".join(filter(None, [
                    sub.metadata.get("level1"),
                    sub.metadata.get("level2"),
                    sub.metadata.get("level3"),
                ]))
                chunks.append({
                    "chunk_text": sub.page_content,
                    "section": section,
                })

    else:
        # PDF / Docx: 固定窗口切分
        rc_splitter = RecursiveCharacterTextSplitter(
            chunk_size=800,
            chunk_overlap=80,
        )
        for i, piece in enumerate(rc_splitter.split_text(text)):
            chunks.append({
                "chunk_text": piece,
                "section": f"片段 {i + 1}",
            })

    logger.info(f"文档共切分为 {len(chunks)} 个片段")
    return chunks


# ────────────────────────────────────────────────────────────────
# 3. Embedding
# ────────────────────────────────────────────────────────────────

def get_embeddings_model() -> OpenAIEmbeddings:
    """
    返回 Embedding 模型客户端
    默认指向配置中的 embedding_api_base (可接 OpenAI/其他兼容服务)
    """
    return OpenAIEmbeddings(
        api_key=settings.embedding_api_key,
        base_url=settings.embedding_api_base,
        model=settings.embedding_model,
    )


def embed_chunks(chunks: list[dict]) -> list[dict]:
    """
    批量将 chunk_text 转换为 embedding 向量
    返回原 chunks 列表, 每项新增 'embedding' 字段
    """
    embeddings_model = get_embeddings_model()
    texts = [c["chunk_text"] for c in chunks]

    logger.info(f"正在调用 Embedding 模型对 {len(texts)} 个片段进行向量化...")
    vectors = embeddings_model.embed_documents(texts)

    for chunk, vector in zip(chunks, vectors):
        chunk["embedding"] = vector

    logger.info("向量化完成")
    return chunks


# ────────────────────────────────────────────────────────────────
# 4. 主入口: 完整的 Ingestion Pipeline
# ────────────────────────────────────────────────────────────────

def run_ingestion(
    filepath: str,
    project_id: int,
    document_id: Optional[int] = None,
) -> int:
    """
    完整的文档建库流程
    :param filepath:    文件绝对路径 (或临时保存路径)
    :param project_id:  关联的项目 ID
    :param document_id: 关联的文档 ID (可选)
    :return:            入库的片段数量
    """
    path = Path(filepath)
    logger.info(f"[Ingestion] 开始处理文件: {path.name}")

    # Step 1: 读取
    raw_text = read_file(filepath)

    # Step 2: 分段
    chunks = split_text(raw_text, file_suffix=path.suffix.lower())

    # Step 3: 向量化
    chunks = embed_chunks(chunks)

    # Step 4: 补充元数据
    for chunk in chunks:
        chunk["project_id"] = project_id
        chunk["document_id"] = document_id

    # Step 5: 存入数据库
    save_chunks(chunks)

    logger.info(f"[Ingestion] 完成! 共入库 {len(chunks)} 个片段")
    return len(chunks)
