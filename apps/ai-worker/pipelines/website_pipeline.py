from loader.web_loader import load_website
from rag.splitter import split_documents, add_source_metadata
from rag.vectorstore import store_documents
from rag.retriever import retrieve_documents, build_context
from llm.gemini import generate_answer


def run_website_pipeline(url: str, query: str):
    docs = load_website(url)

    chunks = split_documents(docs)
    chunks = add_source_metadata(chunks, url)

    store_documents(chunks)

    relevant_docs = retrieve_documents(query, url)
    context = build_context(relevant_docs)

    return generate_answer(context, query)