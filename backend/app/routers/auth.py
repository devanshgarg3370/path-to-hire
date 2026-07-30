import os
import bcrypt
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone

from jose import JWTError, jwt
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User

load_dotenv()

# ==========================================================
# CONFIG
# ==========================================================

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 1440)
)

print("ACCESS_TOKEN_EXPIRE_MINUTES =", ACCESS_TOKEN_EXPIRE_MINUTES)

# ==========================================================
# ROUTER
# ==========================================================

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

# ==========================================================
# REQUEST MODELS
# ==========================================================

class UserRegister(BaseModel):
    name: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


# ==========================================================
# AUTH FUNCTIONS
# ==========================================================

def hash_password(password: str) -> str:
    password_bytes = password.encode("utf-8")[:72]
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password_bytes, salt).decode("utf-8")


def verify_password(
    plain_password: str,
    hashed_password: str
) -> bool:
    return bcrypt.checkpw(
        plain_password.encode("utf-8")[:72],
        hashed_password.encode("utf-8")
    )


def create_access_token(
    data: dict,
    expires_delta: timedelta | None = None,
):
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + (
        expires_delta
        if expires_delta
        else timedelta(
            minutes=ACCESS_TOKEN_EXPIRE_MINUTES
        )
    )

    to_encode.update(
        {
            "exp": expire
        }
    )

    return jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


def verify_access_token(token: str):
    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        email = payload.get("sub")

        if email is None:
            return None

        return payload

    except JWTError as e:
     print("JWT ERROR:", e)
    return None

# ==========================================================
# ROUTES
# ==========================================================

@router.post(
    "/register",
    status_code=status.HTTP_201_CREATED,
)
def register(
    user: UserRegister,
    db: Session = Depends(get_db),
):
    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

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


@router.post(
    "/login",
    status_code=status.HTTP_200_OK,
)
def login(
    user_credentials: UserLogin,
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(User.email == user_credentials.email)
        .first()
    )

    if not user or not verify_password(
        user_credentials.password,
        user.password,
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    access_token = create_access_token(
        data={
            "sub": user.email
        }
    )

    return {
        "success": True,
        "message": "Login successful.",
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
        },
    }