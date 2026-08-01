import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("JSEARCH_API_KEY")

URL = "https://jsearch.p.rapidapi.com/search-v2"

HEADERS = {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": "jsearch.p.rapidapi.com",
    "Content-Type": "application/json"
}


def get_internships(role):
    querystring = {
        "query": f"{role} internship",
        "country": "in",
        "num_pages": "1",
        "date_posted": "all"
    }

    response = requests.get(
        URL,
        headers=HEADERS,
        params=querystring
    )

    return response.json()