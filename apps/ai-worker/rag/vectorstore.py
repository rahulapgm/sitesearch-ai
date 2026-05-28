from supabase import create_client
from langchain_community.vectorstores import SupabaseVectorStore

from config.settings import SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
from rag.embeddings import get_embeddings


def get_supabase_client():
    return create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)


def store_documents(chunks):
    supabase_client = get_supabase_client()
    embeddings = get_embeddings()

    return SupabaseVectorStore.from_documents(
        documents=chunks,
        embedding=embeddings,
        client=supabase_client,
        table_name="documents",
        query_name="match_documents",
    )