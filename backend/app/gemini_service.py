import json
import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

def ask_gemini(prompt: str):
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        text = response.text

        # Remove Markdown code block if Gemini returns one
        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

        # Convert JSON string to Python dictionary
        return json.loads(text)

    except Exception as e:
        print("Gemini Error:", e)
        raise e