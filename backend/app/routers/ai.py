import logging

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form,
    HTTPException,
    status,
    Depends,
)
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.database import get_db
from app.models import User
from app.dependencies.auth_dependencies import get_current_user

from app.services.pdf_service import extract_text_from_pdf
from app.services.gemini_service import ask_gemini
from app.services.history_service import save_history

from app.prompts.resume_prompt import RESUME_ANALYSIS_PROMPT
from app.prompts.ats_prompt import ATS_PROMPT
from app.prompts.interview_prompt import (
    INTERVIEW_PROMPT,
    MOCK_INTERVIEW_PROMPT,
)
from app.prompts.skills_extraction_prompt import (
    SKILLS_EXTRACTION_PROMPT,
)
from app.prompts.job_recommendation_prompt import (
    JOB_RECOMMENDATION_PROMPT,
)
from app.prompts.resume_improvement_prompt import (
    RESUME_IMPROVEMENT_PROMPT,
)
from app.prompts.job_match_prompt import JOB_MATCH_PROMPT
from app.prompts.skill_gap_prompt import SKILL_GAP_PROMPT
from app.prompts.roadmap_prompt import ROADMAP_PROMPT
from app.prompts.cover_letter_prompt import COVER_LETTER_PROMPT
from app.prompts.recruiter_prompt import RECRUITER_PROMPT
from app.prompts.cold_email_prompt import COLD_EMAIL_PROMPT
from app.prompts.linkedin_prompt import LINKEDIN_PROMPT
from app.prompts.career_copilot_prompt import CAREER_COPILOT_PROMPT
from pydantic import BaseModel

logger = logging.getLogger(__name__)

router = APIRouter(
    tags=["AI"]
)
# ============================================================================
# HELPERS
# ============================================================================

async def validate_pdf(file: UploadFile):
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF files are allowed."
        )


# ============================================================================
# RESUME ANALYSIS
# ============================================================================

@router.post("/resume-analysis", status_code=status.HTTP_200_OK)
async def resume_analysis(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        await validate_pdf(file)

        logger.info("Resume Analysis Started")

        resume_text = extract_text_from_pdf(file)

        prompt = RESUME_ANALYSIS_PROMPT.format(
            resume=resume_text
        )

        analysis = ask_gemini(prompt)

        save_history(
            db=db,
            user_id=current_user.id,
            feature_name="resume-analysis",
            file_name=file.filename,
            response=str(analysis),
        )

        logger.info("Resume Analysis Completed")

        return {
            "success": True,
            "analysis": analysis,
            "resume_text": resume_text,
        }

    except HTTPException:
        raise

    except Exception as e:
        logger.exception("Resume Analysis Failed")

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )


# ============================================================================
# ATS ANALYSIS
# ============================================================================

@router.post("/ats-analysis", status_code=status.HTTP_200_OK)
async def ats_analysis(
    file: UploadFile = File(...),
    job_description: str = Form(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
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

        save_history(
            db=db,
            user_id=current_user.id,
            feature_name="ats-analysis",
            file_name=file.filename,
            response=str(analysis),
        )

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


# ============================================================================
# INTERVIEW PREP
# ============================================================================

@router.post("/interview-prep", status_code=status.HTTP_200_OK)
async def interview_prep(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        await validate_pdf(file)

        logger.info("Interview Preparation Started")

        resume_text = extract_text_from_pdf(file)

        prompt = INTERVIEW_PROMPT.format(
            resume=resume_text
        )

        questions = ask_gemini(prompt)

        save_history(
            db=db,
            user_id=current_user.id,
            feature_name="interview-prep",
            file_name=file.filename,
            response=str(questions),
        )

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


# ============================================================================
# SKILLS EXTRACTION
# ============================================================================

@router.post("/skills-extraction", status_code=status.HTTP_200_OK)
async def skills_extraction(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        await validate_pdf(file)

        logger.info("Skills Extraction Started")

        resume_text = extract_text_from_pdf(file)

        prompt = SKILLS_EXTRACTION_PROMPT.format(
            resume=resume_text
        )

        response = ask_gemini(prompt)

        save_history(
            db=db,
            user_id=current_user.id,
            feature_name="skill-extraction",
            file_name=file.filename,
            response=str(response),
        )

        logger.info("Skills Extraction Completed")

        return {
            "success": True,
            "skills": response,
        }

    except HTTPException:
        raise

    except Exception as e:
        logger.exception("Skills Extraction Failed")

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )
    # ============================================================================
# JOB RECOMMENDATION
# ============================================================================

@router.post("/job-recommendation", status_code=status.HTTP_200_OK)
async def job_recommendation(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        await validate_pdf(file)

        logger.info("Job Recommendation Started")

        resume_text = extract_text_from_pdf(file)

        prompt = JOB_RECOMMENDATION_PROMPT.format(
            resume=resume_text
        )

        response = ask_gemini(prompt)

        save_history(
            db=db,
            user_id=current_user.id,
            feature_name="job-recommendation",
            file_name=file.filename,
            response=str(response),
        )

        logger.info("Job Recommendation Completed")

        return {
            "success": True,
            "recommendation": response,
        }

    except HTTPException:
        raise

    except Exception as e:
        logger.exception("Job Recommendation Failed")

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )


# ============================================================================
# RESUME IMPROVEMENT
# ============================================================================

@router.post("/resume-improvement", status_code=status.HTTP_200_OK)
async def resume_improvement(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        await validate_pdf(file)

        logger.info("Resume Improvement Started")

        resume_text = extract_text_from_pdf(file)

        prompt = RESUME_IMPROVEMENT_PROMPT.format(
            resume=resume_text
        )

        response = ask_gemini(prompt)

        save_history(
            db=db,
            user_id=current_user.id,
            feature_name="resume-improvement",
            file_name=file.filename,
            response=str(response),
        )

        logger.info("Resume Improvement Completed")

        return {
            "success": True,
            "improvements": response,
        }

    except HTTPException:
        raise

    except Exception as e:
        logger.exception("Resume Improvement Failed")

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )


# ============================================================================
# RESUME JOB MATCH
# ============================================================================

@router.post("/resume-job-match", status_code=status.HTTP_200_OK)
async def resume_job_match(
    job_description: str = Form(...),
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        await validate_pdf(file)

        logger.info("Resume Job Match Started")

        resume_text = extract_text_from_pdf(file)

        prompt = f"""
{JOB_MATCH_PROMPT}

Resume Text:
{resume_text}

Job Description:
{job_description}
"""

        result = ask_gemini(prompt)

        save_history(
            db=db,
            user_id=current_user.id,
            feature_name="resume-job-match",
            file_name=file.filename,
            response=str(result),
        )

        logger.info("Resume Job Match Completed")

        return {
            "success": True,
            "message": "Resume analyzed successfully.",
            "data": result,
        }

    except HTTPException:
        raise

    except Exception as e:
        logger.exception("Resume Job Match Failed")

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )


# ============================================================================
# SKILL GAP ANALYSIS
# ============================================================================

class SkillGapRequest(BaseModel):
    resume_text: str
    target_role: str
    company: str


@router.post("/skill-gap-analysis", status_code=status.HTTP_200_OK)
async def skill_gap_analysis(
    request: SkillGapRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        logger.info("Skill Gap Analysis Started")

        # Read request data FIRST
        resume_text = request.resume_text
        target_role = request.target_role
        company = request.company

        prompt = f"""
{SKILL_GAP_PROMPT}

Target Role:
{target_role}

Target Company:
{company}

Resume:
{resume_text}
"""

        result = ask_gemini(prompt)

        save_history(
            db=db,
            user_id=current_user.id,
            feature_name="skill-gap-analysis",
            file_name="Stored Resume",
            response=str(result),
        )

        logger.info("Skill Gap Analysis Completed")

        return {
            "success": True,
            "message": "Skill gap analysis completed successfully.",
            "data": result,
        }

    except HTTPException:
        raise

    except Exception as e:
        logger.exception("Skill Gap Analysis Failed")

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )
    # ============================================================================
# LEARNING ROADMAP
# ============================================================================
class LearningRoadmapRequest(BaseModel):
    resume_text: str
    job_description: str

@router.post("/learning-roadmap", status_code=status.HTTP_200_OK)
async def learning_roadmap(
    request: LearningRoadmapRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        logger.info("Learning Roadmap Started")

        prompt = f"""
{ROADMAP_PROMPT}

Resume Text:
{request.resume_text}

Job Description:
{request.job_description}
"""

        result = ask_gemini(prompt)

        save_history(
            db=db,
            user_id=current_user.id,
            feature_name="learning-roadmap",
            file_name="Stored Resume",
            response=str(result),
        )

        logger.info("Learning Roadmap Completed")

        return {
            "success": True,
            "message": "Learning roadmap generated successfully.",
            "data": result,
        }

    except HTTPException:
        raise

    except Exception as e:
        logger.exception("Learning Roadmap Failed")

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )


# ============================================================================
# COVER LETTER
# ============================================================================

@router.post("/cover-letter", status_code=status.HTTP_200_OK)
async def generate_cover_letter(
    company_name: str = Form(...),
    job_description: str = Form(...),
    hiring_manager: str = Form(""),
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        await validate_pdf(file)

        logger.info("Cover Letter Generation Started")

        resume_text = extract_text_from_pdf(file)

        prompt = f"""
{COVER_LETTER_PROMPT}

Resume Text:
{resume_text}

Company Name:
{company_name}

Hiring Manager:
{hiring_manager}

Job Description:
{job_description}
"""

        result = ask_gemini(prompt)

        save_history(
            db=db,
            user_id=current_user.id,
            feature_name="cover-letter-generator",
            file_name=file.filename,
            response=str(result),
        )

        logger.info("Cover Letter Generation Completed")

        return {
            "success": True,
            "message": "Cover letter generated successfully.",
            "data": result,
        }

    except HTTPException:
        raise

    except Exception as e:
        logger.exception("Cover Letter Generation Failed")

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )


# ============================================================================
# RECRUITER SUMMARY
# ============================================================================

@router.post("/recruiter-summary", status_code=status.HTTP_200_OK)
async def recruiter_summary(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        await validate_pdf(file)

        logger.info("Recruiter Summary Started")

        resume_text = extract_text_from_pdf(file)

        prompt = f"""
{RECRUITER_PROMPT}

Resume Text:
{resume_text}
"""

        result = ask_gemini(prompt)

        save_history(
            db=db,
            user_id=current_user.id,
            feature_name="recruiter-summary",
            file_name=file.filename,
            response=str(result),
        )

        logger.info("Recruiter Summary Completed")

        return {
            "success": True,
            "message": "Recruiter summary generated successfully.",
            "data": result,
        }

    except HTTPException:
        raise

    except Exception as e:
        logger.exception("Recruiter Summary Failed")

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )


# ============================================================================
# COLD EMAIL
# ============================================================================

@router.post("/cold-email", status_code=status.HTTP_200_OK)
async def cold_email(
    company_name: str = Form(...),
    job_title: str = Form(...),
    recruiter_name: str = Form(""),
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        await validate_pdf(file)

        logger.info("Cold Email Generation Started")

        resume_text = extract_text_from_pdf(file)

        prompt = f"""
{COLD_EMAIL_PROMPT}

Resume Text:
{resume_text}

Company Name:
{company_name}

Job Title:
{job_title}

Recruiter Name:
{recruiter_name}
"""

        result = ask_gemini(prompt)

        save_history(
            db=db,
            user_id=current_user.id,
            feature_name="cold-email-generator",
            file_name=file.filename,
            response=str(result),
        )

        logger.info("Cold Email Generation Completed")

        return {
            "success": True,
            "message": "Cold email generated successfully.",
            "data": result,
        }

    except HTTPException:
        raise

    except Exception as e:
        logger.exception("Cold Email Generation Failed")

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )
    # ============================================================================
# LINKEDIN OPTIMIZER
# ============================================================================

@router.post("/linkedin-optimizer", status_code=status.HTTP_200_OK)
async def linkedin_optimizer(
    target_role: str = Form(""),
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        await validate_pdf(file)

        logger.info("LinkedIn Optimizer Started")

        resume_text = extract_text_from_pdf(file)

        prompt = f"""
{LINKEDIN_PROMPT}

Resume Text:
{resume_text}

Target Job Role:
{target_role}
"""

        result = ask_gemini(prompt)

        save_history(
            db=db,
            user_id=current_user.id,
            feature_name="linkedin-optimizer",
            file_name=file.filename,
            response=str(result),
        )

        logger.info("LinkedIn Optimizer Completed")

        return {
            "success": True,
            "message": "LinkedIn profile optimized successfully.",
            "data": result,
        }

    except HTTPException:
        raise

    except Exception as e:
        logger.exception("LinkedIn Optimizer Failed")

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )


# ============================================================================
# MOCK INTERVIEW
# ============================================================================

@router.post("/mock-interview", status_code=status.HTTP_200_OK)
async def mock_interview(
    difficulty: str = Form(...),
    job_description: str = Form(...),
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        await validate_pdf(file)

        logger.info("Mock Interview Started")

        resume_text = extract_text_from_pdf(file)

        prompt = f"""
{MOCK_INTERVIEW_PROMPT}

Resume Text:
{resume_text}

Job Description:
{job_description}

Difficulty:
{difficulty}
"""

        result = ask_gemini(prompt)

        save_history(
            db=db,
            user_id=current_user.id,
            feature_name="mock-interview",
            file_name=file.filename,
            response=str(result),
        )

        logger.info("Mock Interview Completed")

        return {
            "success": True,
            "message": "Mock interview generated successfully.",
            "data": result,
        }

    except HTTPException:
        raise

    except Exception as e:
        logger.exception("Mock Interview Failed")

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )


# ============================================================================
# CAREER COPILOT
# ============================================================================

@router.post("/career-copilot", status_code=status.HTTP_200_OK)
async def career_copilot(
    career_goal: str = Form(...),
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        await validate_pdf(file)

        logger.info("Career Copilot Started")

        resume_text = extract_text_from_pdf(file)

        prompt = f"""
{CAREER_COPILOT_PROMPT}

Resume Text:
{resume_text}

Career Goal:
{career_goal}
"""

        result = ask_gemini(prompt)

        save_history(
            db=db,
            user_id=current_user.id,
            feature_name="career-copilot",
            file_name=file.filename,
            response=str(result),
        )

        logger.info("Career Copilot Completed")

        return {
            "success": True,
            "message": "Career guidance generated successfully.",
            "data": result,
        }

    except HTTPException:
        raise

    except Exception as e:
        logger.exception("Career Copilot Failed")

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )