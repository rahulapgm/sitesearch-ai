from langchain_core.documents import Document

from rag.embeddings import get_embeddings
from rag.vectorstore import get_supabase_client


def retrieve_documents(query: str, url: str, k: int = 4):
    supabase_client = get_supabase_client()
    embeddings = get_embeddings()

    query_embedding = embeddings.embed_query(query)

    response = supabase_client.rpc(
        "match_documents",
        {
            "query_embedding": query_embedding,
            "match_count": k,
            "filter": {"source_url": url},
        },
    ).execute()

    return [
        Document(
            page_content=item["content"],
            metadata=item.get("metadata", {}),
        )
        for item in response.data
    ]


def build_context(docs):
    return "\n\n".join(doc.page_content for doc in docs)