from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User, AnalysisHistory
from app.dependencies.auth_dependencies import get_current_user

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get("/")
def dashboard(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    analyses = (
        db.query(AnalysisHistory)
        .filter(AnalysisHistory.user_id == current_user.id)
        .order_by(AnalysisHistory.created_at.desc())
        .all()
    )

    return {
        "success": True,
        "user": {
            "id": current_user.id,
            "name": current_user.name,
            "email": current_user.email,
        },
        "total_analyses": len(analyses),
        "recent": [
            {
                "id": item.id,
                "feature_name": item.feature_name,
                "file_name": item.file_name,
                "created_at": item.created_at,
            }
            for item in analyses[:5]
        ],
    }


@router.get("/stats")
def get_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    analyses = (
        db.query(AnalysisHistory)
        .filter(AnalysisHistory.user_id == current_user.id)
        .all()
    )

    feature_breakdown = {}

    for item in analyses:
        feature_breakdown[item.feature_name] = (
            feature_breakdown.get(item.feature_name, 0) + 1
        )

    return {
        "success": True,
        "total_analyses": len(analyses),
        "feature_breakdown": feature_breakdown,
    }