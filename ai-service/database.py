"""
向量数据库连接模块
使用 PostgreSQL + pgvector 作为向量存储
"""
from sqlalchemy import create_engine, text
from config import settings

engine = None

def get_engine():
    global engine
    if engine is None:
        engine = create_engine(settings.database_url)
    return engine


def ensure_vector_extension():
    """确保 pgvector 扩展已启用"""
    with get_engine().connect() as conn:
        conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector"))
        conn.commit()


def ensure_chunks_table():
    """确保 spec_chunks 表已存在"""
    with get_engine().connect() as conn:
        conn.execute(text("""
            CREATE TABLE IF NOT EXISTS spec_chunks (
                id          BIGSERIAL PRIMARY KEY,
                project_id  BIGINT NOT NULL,
                document_id BIGINT,
                chunk_text  TEXT NOT NULL,
                section     TEXT,
                embedding   vector(1536)
            )
        """))
        conn.execute(text("""
            CREATE INDEX IF NOT EXISTS spec_chunks_embedding_idx
            ON spec_chunks USING ivfflat (embedding vector_cosine_ops)
        """))
        conn.commit()


def save_chunks(chunks: list[dict]):
    """
    将 chunk 列表批量写入数据库
    每个 chunk: {project_id, document_id, chunk_text, section, embedding}
    """
    with get_engine().connect() as conn:
        for chunk in chunks:
            conn.execute(
                text("""
                    INSERT INTO spec_chunks (project_id, document_id, chunk_text, section, embedding)
                    VALUES (:project_id, :document_id, :chunk_text, :section, :embedding)
                """),
                {
                    "project_id": chunk["project_id"],
                    "document_id": chunk.get("document_id"),
                    "chunk_text": chunk["chunk_text"],
                    "section": chunk.get("section", ""),
                    "embedding": str(chunk["embedding"]),
                }
            )
        conn.commit()


def search_similar_chunks(query_embedding: list[float], project_id: int, top_k: int = 5) -> list[str]:
    """
    通过余弦相似度搜索最相关的规范片段
    """
    with get_engine().connect() as conn:
        result = conn.execute(
            text("""
                SELECT chunk_text
                FROM spec_chunks
                WHERE project_id = :project_id
                ORDER BY embedding <=> CAST(:embedding AS vector)
                LIMIT :top_k
            """),
            {
                "project_id": project_id,
                "embedding": str(query_embedding),
                "top_k": top_k,
            }
        )
        return [row[0] for row in result]
