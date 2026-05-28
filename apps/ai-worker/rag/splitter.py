
from langchain_text_splitters import RecursiveCharacterTextSplitter
import sys

def split_documents(docs):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=2000,
        chunk_overlap=100,
    )

    chunks = splitter.split_documents(docs)

    print(f"Chunks created: {len(chunks)}", file=sys.stderr)

    return chunks[:20]


def add_source_metadata(chunks, url: str):
    for chunk in chunks:
        chunk.metadata["source_url"] = url

    return chunks
