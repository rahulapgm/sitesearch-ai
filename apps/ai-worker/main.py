import sys

from config.settings import validate_settings
from pipelines.website_pipeline import run_website_pipeline


if __name__ == "__main__":
    validate_settings()

    url = sys.argv[1]
    query = sys.argv[2]

    result = run_website_pipeline(url, query)

    print(result)