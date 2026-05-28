
from langchain_text_splitters import RecursiveCharacterTextSplitter
import sys

def split_documents(docs):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=3000,
        chunk_overlap=100,
    )

    chunks = splitter.split_documents(docs)

    return chunks[:12]


def add_source_metadata(chunks, url: str):
    for chunk in chunks:
        chunk.metadata["source_url"] = url

    return chunks
