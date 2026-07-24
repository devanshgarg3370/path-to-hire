from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

from app.pdf_parser import extract_text_from_pdf
from app.gemini_service import ask_gemini
from app.prompts import (
    RESUME_ANALYSIS_PROMPT,
    ATS_PROMPT,
    INTERVIEW_PROMPT
)
from app.schemas import JobDescription
app = FastAPI(
    title="PATH-TO-HIRE API",
    version="1.0.0",
    description="AI Resume Analyzer Backend"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Backend Running 🚀"}


@app.post("/resume-analysis")
async def resume_analysis(file: UploadFile = File(...)):
    print(">>> resume_analysis() was called <<<")

    try:
        # Extract text from uploaded PDF
        resume_text = extract_text_from_pdf(file)

        # Create prompt for Gemini
        prompt = RESUME_ANALYSIS_PROMPT.format(
            resume=resume_text
        )

        # Get AI response
        analysis = ask_gemini(prompt)

        return {
            "analysis": analysis
        }

    except Exception as e:
        import traceback
        print(traceback.format_exc())

        return {
            "error": str(e)
        }
@app.post("/ats-analysis")
async def ats_analysis(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    try:
        # Extract resume text
        resume_text = extract_text_from_pdf(file)

        # Create prompt
        prompt = ATS_PROMPT.format(
            resume=resume_text,
            job=job_description
        )

        # Ask Gemini
        analysis = ask_gemini(prompt)

        return {
            "analysis": analysis
        }

    except Exception as e:
        import traceback
        print(traceback.format_exc())

        return {
            "error": str(e)
        }
@app.post("/interview-prep")
async def interview_prep(file: UploadFile = File(...)):
    try:
        # Extract resume text
        resume_text = extract_text_from_pdf(file)

        # Create prompt
        prompt = INTERVIEW_PROMPT.format(
            resume=resume_text
        )

        # Ask Gemini
        questions = ask_gemini(prompt)

        return {
            "analysis": questions
        }

    except Exception as e:
        import traceback
        print(traceback.format_exc())

        return {
            "error": str(e)
        }
