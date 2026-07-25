import logging
from contextlib import asynccontextmanager

from fastapi import (
    FastAPI,
    UploadFile,
    File,
    Form,
    HTTPException,
    status,
    Depends,
)
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

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
from app.database import Base, engine, get_db
from app.models import User
from app.schemas import UserRegister, UserLogin
from app.auth import (
    hash_password,
    verify_password,
    create_access_token,
)

# Logging configuration
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup tasks
    logger.info("=" * 60)
    logger.info("PATH TO HIRE Backend Starting Up... 🚀")
    logger.info("=" * 60)
    
    # Auto-create database tables on startup
    Base.metadata.create_all(bind=engine)
    
    yield
    
    # Shutdown tasks
    logger.info("PATH TO HIRE Backend Shutting Down...")


app = FastAPI(
    title="PATH TO HIRE API",
    description="AI Powered Resume Analysis Backend",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB


async def validate_pdf(file: UploadFile):
    """Validate uploaded PDF format and size."""
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


# --- System Endpoints ---

@app.get("/", tags=["Health"])
def home():
    logger.info("Health endpoint accessed")
    return {"message": "Backend Running 🚀"}


# --- Auth Endpoints ---

@app.post("/register", tags=["Auth"], status_code=status.HTTP_201_CREATED)
def register(user: UserRegister, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered.",
        )

    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password),
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "success": True,
        "message": "User registered successfully.",
    }


# --- AI Endpoints ---

@app.post("/resume-analysis", tags=["AI"], status_code=status.HTTP_200_OK)
async def resume_analysis(file: UploadFile = File(...)):
    try:
        await validate_pdf(file)
        logger.info("Resume Analysis Started")
        resume_text = extract_text_from_pdf(file)
        prompt = RESUME_ANALYSIS_PROMPT.format(resume=resume_text)
        analysis = ask_gemini(prompt)
        logger.info("Resume Analysis Completed")

        return {"success": True, "analysis": analysis}

    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Resume Analysis Failed")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )


@app.post("/ats-analysis", tags=["AI"], status_code=status.HTTP_200_OK)
async def ats_analysis(
    file: UploadFile = File(...),
    job_description: str = Form(...),
):
    try:
        await validate_pdf(file)
        logger.info("ATS Analysis Started")
        resume_text = extract_text_from_pdf(file)
        prompt = ATS_PROMPT.format(resume=resume_text, job=job_description)
        analysis = ask_gemini(prompt)
        logger.info("ATS Analysis Completed")

        return {"success": True, "analysis": analysis}

    except HTTPException:
        raise
    except Exception as e:
        logger.exception("ATS Analysis Failed")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )


@app.post("/interview-prep", tags=["AI"], status_code=status.HTTP_200_OK)
async def interview_prep(file: UploadFile = File(...)):
    try:
        await validate_pdf(file)
        logger.info("Interview Preparation Started")
        resume_text = extract_text_from_pdf(file)
        prompt = INTERVIEW_PROMPT.format(resume=resume_text)
        questions = ask_gemini(prompt)
        logger.info("Interview Preparation Completed")

        return {"success": True, "analysis": questions}

    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Interview Preparation Failed")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )


@app.post("/skills-extraction", tags=["AI"], status_code=status.HTTP_200_OK)
async def skills_extraction(file: UploadFile = File(...)):
    try:
        await validate_pdf(file)
        logger.info("Skills Extraction Started")
        resume_text = extract_text_from_pdf(file)
        prompt = SKILLS_EXTRACTION_PROMPT.format(resume=resume_text)
        response = ask_gemini(prompt)
        logger.info("Skills Extraction Completed")

        return {"success": True, "skills": response}

    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Skills Extraction Failed")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )


@app.post("/job-recommendation", tags=["AI"], status_code=status.HTTP_200_OK)
async def job_recommendation(file: UploadFile = File(...)):
    try:
        await validate_pdf(file)
        logger.info("Job Recommendation Started")
        resume_text = extract_text_from_pdf(file)
        prompt = JOB_RECOMMENDATION_PROMPT.format(resume=resume_text)
        response = ask_gemini(prompt)
        logger.info("Job Recommendation Completed")

        return {"success": True, "recommendation": response}

    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Job Recommendation Failed")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )


@app.post("/resume-improvement", tags=["AI"], status_code=status.HTTP_200_OK)
async def resume_improvement(file: UploadFile = File(...)):
    try:
        await validate_pdf(file)
        logger.info("Resume Improvement Started")
        resume_text = extract_text_from_pdf(file)
        prompt = RESUME_IMPROVEMENT_PROMPT.format(resume=resume_text)
        response = ask_gemini(prompt)
        logger.info("Resume Improvement Completed")

        return {"success": True, "improvements": response}

    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Resume Improvement Failed")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )