import logging

from fastapi import (
    FastAPI,
    UploadFile,
    File,
    Form,
    HTTPException,
    status,
)
from fastapi.middleware.cors import CORSMiddleware

from app.pdf_parser import extract_text_from_pdf
from app.gemini_service import ask_gemini
from app.prompts import (
    RESUME_ANALYSIS_PROMPT,
    ATS_PROMPT,
    INTERVIEW_PROMPT,
    SKILLS_EXTRACTION_PROMPT,
    JOB_RECOMMENDATION_PROMPT,
    RESUME_IMPROVEMENT_PROMPT,
)


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)

logger = logging.getLogger(__name__)



app = FastAPI(
    title="PATH TO HIRE API",
    description="AI Powered Resume Analysis Backend",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # Change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB




async def validate_pdf(file: UploadFile):
    """
    Validate uploaded PDF.
    """

    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF files are allowed.",
        )

    content = await file.read()

    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="PDF exceeds 10 MB limit.",
        )

    await file.seek(0)



@app.get("/", tags=["Health"])
def home():
    logger.info("Health endpoint accessed")

    return {
        "message": "Backend Running 🚀"
    }


@app.post(
    "/resume-analysis",
    tags=["AI"],
    status_code=status.HTTP_200_OK,
)
async def resume_analysis(
    file: UploadFile = File(...)
):
    try:

        await validate_pdf(file)

        logger.info("Resume Analysis Started")

        resume_text = extract_text_from_pdf(file)

        prompt = RESUME_ANALYSIS_PROMPT.format(
            resume=resume_text
        )

        analysis = ask_gemini(prompt)

        logger.info("Resume Analysis Completed")

        return {
            "success": True,
            "analysis": analysis,
        }

    except HTTPException:
        raise

    except Exception as e:

        logger.exception("Resume Analysis Failed")

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )



@app.post(
    "/ats-analysis",
    tags=["AI"],
    status_code=status.HTTP_200_OK,
)
async def ats_analysis(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    try:

        await validate_pdf(file)

        logger.info("ATS Analysis Started")

        resume_text = extract_text_from_pdf(file)

        prompt = ATS_PROMPT.format(
            resume=resume_text,
            job=job_description,
        )

        analysis = ask_gemini(prompt)

        logger.info("ATS Analysis Completed")

        return {
            "success": True,
            "analysis": analysis,
        }

    except HTTPException:
        raise

    except Exception as e:

        logger.exception("ATS Analysis Failed")

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )



@app.post(
    "/interview-prep",
    tags=["AI"],
    status_code=status.HTTP_200_OK,
)
async def interview_prep(
    file: UploadFile = File(...)
):
    try:

        await validate_pdf(file)

        logger.info("Interview Preparation Started")

        resume_text = extract_text_from_pdf(file)

        prompt = INTERVIEW_PROMPT.format(
            resume=resume_text,
        )

        questions = ask_gemini(prompt)

        logger.info("Interview Preparation Completed")

        return {
            "success": True,
            "analysis": questions,
        }

    except HTTPException:
        raise

    except Exception as e:

        logger.exception("Interview Preparation Failed")

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )

@app.post(
    "/skills-extraction",
    tags=["AI"],
    status_code=status.HTTP_200_OK,
)
async def skills_extraction(file: UploadFile = File(...)):
    try:
        await validate_pdf(file)

        logger.info("Skills Extraction Started")

        resume_text = extract_text_from_pdf(file)

        prompt = SKILLS_EXTRACTION_PROMPT.format(
            resume=resume_text
        )

        response = ask_gemini(prompt)

        logger.info("Skills Extraction Completed")

        return {
            "success": True,
            "skills": response
        }

    except HTTPException:
        raise

    except Exception as e:
        logger.exception("Skills Extraction Failed")

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@app.post(
    "/job-recommendation",
    tags=["AI"],
    status_code=status.HTTP_200_OK,
)
async def job_recommendation(file: UploadFile = File(...)):
    try:
        await validate_pdf(file)

        logger.info("Job Recommendation Started")

        resume_text = extract_text_from_pdf(file)

        prompt = JOB_RECOMMENDATION_PROMPT.format(
            resume=resume_text
        )

        response = ask_gemini(prompt)

        logger.info("Job Recommendation Completed")

        return {
            "success": True,
            "recommendation": response
        }

    except HTTPException:
        raise

    except Exception as e:
        logger.exception("Job Recommendation Failed")

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
@app.post(
    "/resume-improvement",
    tags=["AI"],
    status_code=status.HTTP_200_OK,
)
async def resume_improvement(file: UploadFile = File(...)):
    try:
        await validate_pdf(file)

        logger.info("Resume Improvement Started")

        resume_text = extract_text_from_pdf(file)

        prompt = RESUME_IMPROVEMENT_PROMPT.format(
            resume=resume_text
        )

        response = ask_gemini(prompt)

        logger.info("Resume Improvement Completed")

        return {
            "success": True,
            "improvements": response
        }

    except HTTPException:
        raise

    except Exception as e:
        logger.exception("Resume Improvement Failed")

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
@app.on_event("startup")
async def startup():

    logger.info("=" * 60)
    logger.info("PATH TO HIRE Backend Started Successfully 🚀")
    logger.info("=" * 60)