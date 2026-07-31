import json
import logging
import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

logger = logging.getLogger(__name__)

API_KEY = os.getenv("GEMINI_API_KEY")

GEMINI_MODEL = os.getenv(
    "GEMINI_MODEL",
    "gemini-3.5-flash-lite",
)

if not API_KEY:
    raise ValueError(
        "GEMINI_API_KEY not found. Check your .env file."
    )

client = genai.Client(api_key=API_KEY)


def ask_gemini(prompt: str):
    """
    Sends a prompt to Gemini and returns parsed JSON.
    """

    try:
        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt,
        )

        if not response or not response.text:
            raise ValueError(
                "Gemini returned an empty response."
            )

        text = (
            response.text
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        return json.loads(text)

    except json.JSONDecodeError as e:
        logger.exception(
            "Gemini returned invalid JSON."
        )

        raise ValueError(
            f"Invalid JSON received from Gemini.\n\n{text}"
        ) from e

    except Exception:
        logger.exception(
            "Gemini request failed."
        )
        raise