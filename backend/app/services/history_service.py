from sqlalchemy.orm import Session
from app.models import AnalysisHistory


def save_history(
    db: Session,
    user_id: int,
    feature_name: str,
    file_name: str | None,
    response: str,
):
    history = AnalysisHistory(
        user_id=user_id,
        feature_name=feature_name,
        file_name=file_name,
        response=response,
    )

    db.add(history)
    db.commit()
    db.refresh(history)

    return history