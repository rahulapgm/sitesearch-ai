import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")

os.environ["USER_AGENT"] = os.getenv("USER_AGENT", "SiteSearchAI/1.0")


def validate_settings():
    if not SUPABASE_URL:
        raise ValueError("SUPABASE_URL is missing")

    if not SUPABASE_SERVICE_ROLE_KEY:
        raise ValueError("SUPABASE_SERVICE_ROLE_KEY is missing")

    if not GOOGLE_API_KEY:
        raise ValueError("GOOGLE_API_KEY is missing")
