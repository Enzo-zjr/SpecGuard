from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    # deepseek / LLM Configuration
    deepseek_api_key: str = "sk-8359847443014776897641658846a28329615c6172939271"
    deepseek_api_base: str = "https://api.deepseek.com"
    model_name: str = "deepseek-v3"

    # Embedding Configuration (DeepSeek 不提供 Embedding 模型, 可用 OpenAI 或其他兼容服务)
    embedding_api_key: str = "sk-8359847443014776897641658846a28329615c6172939271"
    embedding_api_base: str = "https://api.deepseek.com"
    embedding_model: str = "text-embedding-3-small"

    # Database Configuration
    database_url: Optional[str] = None

    # AI Service Configuration
    port: int = 8000
    host: str = "0.0.0.0"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

settings = Settings()
