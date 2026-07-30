from contextlib import asynccontextmanager
import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

from app.routers.auth import router as auth_router
from app.routers.ai import router as ai_router
from app.routers.history import router as history_router
from app.routers.dashboard import router as dashboard_router
from app.routers.career_intelligence import router as career_intelligence_router

# ==========================================================
# Logging
# ==========================================================

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)

logger = logging.getLogger(__name__)


# ==========================================================
# Database
# ==========================================================

@asynccontextmanager
async def lifespan(_app: FastAPI):
    logger.info("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    logger.info("Application Started")
    yield
    logger.info("Application Shutdown")


# ==========================================================
# FastAPI App
# ==========================================================

app = FastAPI(
    title="PATH TO HIRE API",
    version="1.0.0",
    lifespan=lifespan,
)


# ==========================================================
# CORS
# ==========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================================
# Routers
# ==========================================================

app.include_router(auth_router)
app.include_router(ai_router)
app.include_router(history_router)
app.include_router(dashboard_router)
app.include_router(career_intelligence_router)

# ==========================================================
# Root Endpoint
# ==========================================================

@app.get("/")
def root():
    return {
        "success": True,
        "message": "PATH TO HIRE Backend Running 🚀"
    }


# ==========================================================
# Health Check
# ==========================================================

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }