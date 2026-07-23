from fastapi import FastAPI, UploadFile, File
from app.pdf_parser import extract_text_from_pdf

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Backend Running 🚀"}

@app.post("/resume-analysis")
async def resume_analysis(file: UploadFile = File(...)):

    resume_text = extract_text_from_pdf(file)

    return {
        "resume": resume_text[:1000]
    }