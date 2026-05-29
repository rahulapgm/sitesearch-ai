from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate

from config.settings import GEMINI_MODEL, GOOGLE_API_KEY


def get_llm():
    return ChatGoogleGenerativeAI(
        model=GEMINI_MODEL,
        google_api_key=GOOGLE_API_KEY,
        temperature=0.4,
    )


def normalize_llm_content(content):
    if isinstance(content, str):
        return content

    if isinstance(content, list):
        text_parts = []

        for item in content:
            if isinstance(item, dict) and item.get("type") == "text":
                text_parts.append(item.get("text", ""))

        return "\n".join(text_parts).strip()

    return str(content)


def generate_answer(context: str, query: str):
    llm = get_llm()

    prompt = ChatPromptTemplate.from_template("""
        You are SiteSearch AI.

        Use only the provided website context to answer the user request.
        If the answer is not available in the context, say that the website content does not provide enough information.

        Website context:
        {context}

        User request:
        {query}

        Return a clear, useful, structured answer.
        """
    )

    chain = prompt | llm

    response = chain.invoke({
        "context": context,
        "query": query,
    })

    return normalize_llm_content(response.content)