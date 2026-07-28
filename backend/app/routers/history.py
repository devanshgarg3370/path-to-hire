from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User, AnalysisHistory
from app.dependencies.auth_dependencies import get_current_user

router = APIRouter(
    prefix="/history",
    tags=["History"]
)


@router.get("/")
def get_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    history = (
        db.query(AnalysisHistory)
        .filter(AnalysisHistory.user_id == current_user.id)
        .order_by(AnalysisHistory.created_at.desc())
        .all()
    )

    return {
        "success": True,
        "count": len(history),
        "history": [
            {
                "id": item.id,
                "feature_name": item.feature_name,
                "file_name": item.file_name,
                "response": item.response,
                "created_at": item.created_at,
            }
            for item in history
        ],
    }


@router.get("/{history_id}")
def get_history_by_id(
    history_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    history = (
        db.query(AnalysisHistory)
        .filter(
            AnalysisHistory.id == history_id,
            AnalysisHistory.user_id == current_user.id,
        )
        .first()
    )

    if history is None:
        raise HTTPException(
            status_code=404,
            detail="History not found.",
        )

    return {
        "success": True,
        "data": {
            "id": history.id,
            "feature_name": history.feature_name,
            "file_name": history.file_name,
            "response": history.response,
            "created_at": history.created_at,
        },
    }


@router.delete("/{history_id}")
def delete_history(
    history_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    history = (
        db.query(AnalysisHistory)
        .filter(
            AnalysisHistory.id == history_id,
            AnalysisHistory.user_id == current_user.id,
        )
        .first()
    )

    if history is None:
        raise HTTPException(
            status_code=404,
            detail="History not found.",
        )

    db.delete(history)
    db.commit()

    return {
        "success": True,
        "message": "History deleted successfully.",
    }