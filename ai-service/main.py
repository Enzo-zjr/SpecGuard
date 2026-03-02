from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
import uvicorn
import os

app = FastAPI(title="SpecGuard AI Service")

class ReviewRequest(BaseModel):
    code: str
    project_id: int

@app.get("/")
async def root():
    return {"message": "SpecGuard AI Service is running"}

@app.post("/process-document")
async def process_document(project_id: int, file: UploadFile = File(...)):
    # TODO: Implement document parsing, chunking and vectorization
    return {"status": "success", "filename": file.filename, "project_id": project_id}

@app.post("/workflow/review")
async def review_workflow(request: ReviewRequest):
    # 这是 Java 端触发的核心工作流
    # 步骤 1: 从向量数据库检索相关规范 (Mock)
    context = "Retrieved rules: 1. CamelCase for classes. 2. Use interfaces for services."
    
    # 步骤 2: 组装 Prompt 并调用 LLM (Mock)
    review_result = f"基于项目 {request.project_id} 的规范评审结果：代码符合规范。"
    
    return {
        "status": "success",
        "project_id": request.project_id,
        "review_result": review_result
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
