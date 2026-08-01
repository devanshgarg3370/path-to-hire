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

from app.database import get_db
from app.models import User
from app.dependencies.auth_dependencies import get_current_user

from app.services.pdf_service import extract_text_from_pdf
from app.services.gemini_service import ask_gemini
from app.services.history_service import save_history

from app.prompts.career_intelligence_prompt import CAREER_INTELLIGENCE_PROMPT
from pydantic import BaseModel

logger = logging.getLogger(__name__)
class CareerAnalysisRequest(BaseModel):
    resume_text: str

router = APIRouter(
    prefix="/career-intelligence",
    tags=["Career Intelligence"],
)


@router.post(
    "/",
    status_code=status.HTTP_200_OK,
)
async def generate_career_intelligence(
    request: CareerAnalysisRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:

        resume_text = request.resume_text

        prompt = CAREER_INTELLIGENCE_PROMPT.format(
            resume_text=resume_text,
        )

        response = ask_gemini(prompt)

        save_history(
            db=db,
            user_id=current_user.id,
            feature_name="career-intelligence",
            file_name="Stored Resume",
            response=str(response),
        )

        
        return {
           "success": True,
           "message": "Career Intelligence Report generated successfully.",
            "data": response,
        }

    except Exception as e:
        logger.exception(e)

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate Career Intelligence Report.",
        )