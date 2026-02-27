# SpecGuard 技术详细设计文档

## 1. 数据模型设计
系统采用关系型数据库 (PostgreSQL) 存储元数据，与向量数据库 (ChromaDB) 存储知识内容。

### 1.1 实体关系模型 (ERD)
```mermaid
erDiagram
    USER ||--o{ PROJECT : "拥有"
    PROJECT ||--o{ SPEC_SET : "关联"
    SPEC_SET ||--o{ DOCUMENT : "包含"
    PROJECT ||--o{ REVIEW_REPORT : "属于"
    DOCUMENT ||--o{ CHUNK : "切分为"

    PROJECT {
        long id PK
        string name
        string description
    }
    SPEC_SET {
        long id PK
        string name
        string description
    }
    DOCUMENT {
        long id PK
        string filename
        string raw_content
        datetime upload_time
    }
    REVIEW_REPORT {
        long id PK
        string code_snippet
        text result_json
        datetime created_at
    }
```

### 1.2 向量存储 Schema
- **Collection 名称**: `spec_chunks`
- **Metadata**: 
    - `project_id`: 关联项目
    - `document_id`: 来源文档
    - `spec_set_id`: 所属规范集
- **Document**: 文本片段原始内容
- **Embedding**: 768 或 1536 维向量

## 2. API 接口设计 (核心)

### 2.1 知识库管理
- `POST /api/v1/spec-sets`: 创建规范集
- `POST /api/v1/spec-sets/{id}/documents`: 上传并索引文档
- `GET /api/v1/projects/{id}/specs`: 获取项目关联的所有规范

### 2.2 代码评审
- `POST /api/v1/reviews`: 提交代码评审
    - **请求体**: `{ projectId: long, code: string }`
    - **响应**: 完整的评审报告对象，包含引用条款和修复建议。

## 3. RAG 详细逻辑与 Prompt 设计

### 3.1 检索策略
1. **语义编码**: 使用 `text-embedding-3-small` 或同级开源模型对用户提交的代码片段进行编码。
2. **相似度搜索**: 在对应项目的 `spec_chunks` 集合中执行 Cosine Similarity 搜索。
3. **重排序 (Rerank)**: (可选) 对初筛结果进行重排序，提高准确率。

### 3.2 Prompt 模板
```text
你是一个专业的 Java 架构师，请根据提供的【团队规范】对【代码片段】进行评审。

【团队规范】:
{retrieved_chunks}

【代码片段】:
{user_code}

【评审要求】:
1. 必须指出违反了哪一条团队规范。
2. 若有通用代码质量问题（如：圈复杂度过高、空指针风险）一并指出。
3. 请按以下格式返回 JSON:
{
  "issues": [
    {
      "severity": "CRITICAL/WARNING",
      "rule_reference": "规范原文",
      "description": "问题描述",
      "suggestion": "修改建议",
      "fixed_code": "修复后的代码示例"
    }
  ]
}
```

## 4. 安全与性能优化
- **鉴权**: 使用 JWT 进行 API 鉴权。
- **异步处理**: 文档向量索引与代码评审均采用异步队列处理，提升用户体验。
- **缓存**: 对重复代码片段的评审结果进行 Redis 缓存。
