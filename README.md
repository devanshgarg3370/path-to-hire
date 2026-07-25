# 🚀 Path to Hire

> **AI-powered career companion that helps students optimize their resumes, improve ATS scores, identify skill gaps, and prepare for interviews.**

---

## 📌 Overview

Path to Hire is an AI-powered web application designed to bridge the gap between students and recruiters. It provides personalized resume analysis, ATS optimization, interview preparation, and career guidance using Google's Gemini AI.

Our goal is to help students become industry-ready through actionable insights and personalized recommendations.

---

## ✨ Features

- 📄 AI Resume Analysis
- 🎯 ATS Score Analysis
- 💡 Skill Gap Detection
- 🎤 AI Interview Preparation
- 📈 Career Progress Tracking
- 📚 Career Tips & Blogs
- 👤 User Profile Management
- 🔒 Authentication (Login/Signup)
- 📞 Contact & Support Pages

---

## 🛠 Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- FastAPI
- Python

### AI
- Google Gemini API

### Resume Processing
- PDF Parsing

---

## 📂 Project Structure

```
path-to-hire/
│
├── frontend/
│   ├── html/
│   ├── css/
│   ├── js/
│   └── assets/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── gemini_service.py
│   │   ├── pdf_parser.py
│   │   ├── prompts.py
│   │   └── schemas.py
│   └── requirements.txt
│
├── ai/
├── docs/
└── README.md
```

---

# 🚀 Getting Started

## 1. Clone Repository

```bash
git clone https://github.com/YOUR-USERNAME/path-to-hire.git
cd path-to-hire
```

---

## 2. Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt
```

Create a `.env`

```
GEMINI_API_KEY=YOUR_API_KEY
```

Run backend

```bash
uvicorn app.main:app --reload
```

Backend runs at

```
http://localhost:8000
```

Swagger Docs

```
http://localhost:8000/docs
```

---

## 3. Frontend

Open the frontend using **VS Code Live Server**.

```
frontend/html/landing.html
```

---

# 🤖 AI Features

The application uses **Google Gemini** for:

- Resume Review
- ATS Analysis
- Interview Question Generation
- Career Suggestions

---

# 📡 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/resume-analysis` | Resume analysis |
| POST | `/ats-analysis` | ATS score |
| POST | `/interview-prep` | Interview preparation |

---

# 📷 Screenshots

> Add screenshots of:

- Landing Page
- Resume Upload
- Resume Analysis
- ATS Result
- Dashboard

---

# 🌟 Future Enhancements

- AI Career Roadmaps
- Job Recommendation Engine
- Resume Version History
- Company-specific Interview Preparation
- Recruiter Dashboard

---

# 👥 Team

- Devansh Garg
- Rashi Gupta
- Piyushi Tikoo
- Saransh


---

# 🙏 Acknowledgements

- Google Gemini API
- FastAPI
- VS Code
- Open Source Community

---

