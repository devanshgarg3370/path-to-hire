@echo off
echo Starting Path To Hire Backend...
cd backend
python -m uvicorn app.main:app --reload
pause