from langchain_google_genai import GoogleGenerativeAIEmbeddings
from config.settings import GOOGLE_API_KEY

def get_embeddings():
    if not GOOGLE_API_KEY:
        raise ValueError("GOOGLE_API_KEY is missing")

    return GoogleGenerativeAIEmbeddings(
        model="models/gemini-embedding-001",
        google_api_key=GOOGLE_API_KEY,
    )
