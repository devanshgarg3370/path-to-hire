<div align="center">

# 🚀 Path to Hire

### Your AI-Powered Career Companion — From Resume to Ready.

Path to Hire analyzes resumes, scores them against real job descriptions, closes skill gaps, and runs mock interviews — all powered by Google Gemini — so students and early-career candidates can walk into interviews prepared, not hopeful.

[![Python](https://img.shields.io/badge/Python-3.11%2B-3776AB?style=flat-square&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Gemini API](https://img.shields.io/badge/Google-Gemini%20AI-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev/)
[![SQLite](https://img.shields.io/badge/Database-SQLite-07405E?style=flat-square&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](#-license)
[![Build](https://img.shields.io/badge/Build-Passing-brightgreen?style=flat-square)](#)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-ff69b4?style=flat-square)](#-contributing)

</div>

---

## 📚 Table of Contents

1. [About the Project](#-about-the-project)
2. [Key Features](#-key-features)
3. [Tech Stack](#-tech-stack)
4. [Project Architecture & Directory Structure](#-project-architecture--directory-structure)
5. [Getting Started](#-getting-started)
6. [API Documentation](#-api-documentation)
7. [Testing](#-testing)
8. [Roadmap](#-roadmap)
9. [Team](#-team)
10. [Contributing](#-contributing)
11. [License](#-license)

---

## 🎯 About the Project

Every year, thousands of students submit resumes into black-box Applicant Tracking Systems with no idea why they're getting rejected, no way to measure their skill gaps against the roles they actually want, and no low-pressure space to practice interviewing before the one that counts.

**Path to Hire** closes that feedback loop. It's a full-stack web application that combines:

- **Automated PDF resume parsing** (via PyMuPDF) to pull raw text out of any uploaded resume, and
- **Google Gemini AI** to reason over that text and turn it into structured, actionable feedback — an ATS compatibility score, missing keywords, targeted improvement suggestions, extracted skills, personalized job/internship recommendations, and AI-generated mock interview questions.

Everything is served through a **FastAPI** backend with token-based authentication and a lightweight **SQLite** database for user accounts, and consumed by a plain **HTML/CSS/JavaScript** frontend — no heavy frontend framework required to run it locally.

The goal: turn "did my resume even get looked at?" into a concrete, actionable checklist.

---

## ✨ Key Features

- 🔐 **Authentication** — Secure signup/login with `bcrypt` password hashing and JWT access tokens (`python-jose`).
- 📄 **AI Resume Analysis** — Upload a PDF resume and get a structured breakdown: skills, experience, strengths, missing skills, recommended roles, and an overall resume score.
- 🎯 **ATS Score Analysis** — Compare a resume directly against a job description to get an ATS-style compatibility score and gap report.
- 🧠 **Skill Gap Detection** — Automatic extraction of current skills, benchmarked against what a target role actually requires.
- 🎤 **AI Mock Interview Prep** — Gemini-generated technical and behavioral interview questions tailored to the candidate's resume.
- 💼 **Job & Internship Recommendations** — AI-suggested roles based on parsed resume content.
- ✍️ **Resume Improvement Suggestions** — Actionable, line-level rewrite guidance instead of generic tips.
- 🗄️ **Persistent User Data** — SQLAlchemy ORM models backed by SQLite, auto-created on startup.
- 📖 **Documented API Contract** — Full request/response spec in [`docs/api_spec.md`](docs/api_spec.md) to keep frontend, backend, and AI work in sync.
- 🖥️ **Zero-build Frontend** — 20+ static HTML pages (dashboard, resume upload, roadmap, blog, career tips, and more) that run with nothing but a browser or a live server.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Backend Framework** | [FastAPI](https://fastapi.tiangolo.com/) + [Uvicorn](https://www.uvicorn.org/) (ASGI server) |
| **Language** | Python 3.11+ |
| **AI / LLM** | [Google Gemini API](https://ai.google.dev/) via `google-genai` |
| **Database** | SQLite + [SQLAlchemy](https://www.sqlalchemy.org/) ORM |
| **Auth** | `bcrypt` (password hashing) + `python-jose` (JWT tokens) |
| **PDF Parsing** | [PyMuPDF](https://pymupdf.readthedocs.io/) (`fitz`) |
| **Data Validation** | [Pydantic](https://docs.pydantic.dev/) v2 (+ `email-validator`) |
| **Config Management** | `python-dotenv` |
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Testing** | `pytest` (framework available), plus manual Gemini connectivity scripts |

Full pinned dependency list: [`backend/requirements.txt`](backend/requirements.txt).

---

## 🏗 Project Architecture & Directory Structure

```
path-to-hire/
│
├── ai/                          # AI experimentation space
│   ├── prompt/                  # Standalone prompt scripts/scratchpad
│   │   └── hello.py
│   └── services/                # Reserved for future standalone AI services
│
├── assets/                      # Shared project-level visual assets
│   ├── icons/
│   ├── images/
│   └── logo/
│
├── backend/                     # Core FastAPI application
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # App entrypoint, routes, CORS, lifespan events
│   │   ├── auth.py              # Password hashing + JWT token creation
│   │   ├── database.py          # SQLAlchemy engine/session config (SQLite)
│   │   ├── models.py            # ORM models (User)
│   │   ├── schemas.py           # Pydantic request/response schemas
│   │   ├── pdf_parser.py        # PDF → raw text extraction (PyMuPDF)
│   │   ├── gemini_service.py    # Gemini client wrapper (ask_gemini)
│   │   └── prompts.py           # All Gemini prompt templates
│   ├── tests/                   # Reserved for pytest test suite
│   ├── requirements.txt         # Pinned backend dependencies
│   ├── resume_ai.db             # SQLite database file (auto-generated)
│   ├── test_gemini.py           # Manual Gemini API connectivity check
│   └── test_model.py            # Lists available Gemini models for your API key
│
├── frontend/                    # Static multi-page frontend
│   ├── html/                    # landing, dashboard, resume-upload, roadmap, etc.
│   ├── css/                     # One stylesheet per page
│   ├── js/                      # One script per page
│   └── assets/                  # Frontend-local images/logo
│
├── docs/                        # Project documentation
│   ├── api_spec.md              # Full REST API contract
│   ├── architecture/            # System architecture diagrams (WIP)
│   ├── presentation/            # Pitch deck (ppt.pdf)
│   └── screenshots/             # App screenshots
│
├── start_app.bat                # One-click backend launcher (Windows)
├── .gitignore
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- **Python 3.11+**
- **pip** (comes with Python)
- **Google Gemini API key** — [get one here](https://ai.google.dev/)
- A modern web browser (or the **VS Code Live Server** extension, for the frontend)

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/path-to-hire.git
cd path-to-hire
```

### 2. Set Up a Virtual Environment

```bash
cd backend
python -m venv venv

# Activate it
# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

> ⚠️ **Windows PowerShell tip:** if `requirements.txt` was regenerated via `pip freeze > requirements.txt` in PowerShell, it may save as UTF-16 and fail to install. Re-save it as UTF-8 if you hit encoding errors during install.

### 4. Configure Environment Variables

Create a `.env` file inside `backend/`:

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

The app will refuse to start without a valid `GEMINI_API_KEY` — this is enforced in `gemini_service.py`.

### 5. Run the Backend

From the `backend/` directory:

```bash
uvicorn app.main:app --reload
```

Or on Windows, from the project root, just double-click / run:

```bash
start_app.bat
```

The API will be live at:

```
http://localhost:8000
```

Interactive Swagger docs:

```
http://localhost:8000/docs
```

### 6. Run the Frontend

The frontend is plain static HTML/CSS/JS — no build step required. Open it with the **VS Code Live Server** extension (recommended, so `fetch()` calls to the backend behave correctly):

```
frontend/html/landing.html
```

By default, CORS is pre-configured in `main.py` for Live Server's default origin (`http://127.0.0.1:5500`).

---

## 📡 API Documentation

The full contract — including request/response schemas, error formats, and field-level notes for every planned endpoint — lives in [`docs/api_spec.md`](docs/api_spec.md).

**Currently implemented endpoints** (see `backend/app/main.py`):

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check |
| `POST` | `/register` | Create a new user account |
| `POST` | `/login` | Authenticate and receive a JWT access token |
| `POST` | `/resume-analysis` | Full AI resume breakdown (skills, strengths, score, roadmap) |
| `POST` | `/ats-analysis` | Score a resume against a specific job description |
| `POST` | `/interview-prep` | Generate mock interview questions from a resume |
| `POST` | `/skills-extraction` | Extract structured skills from a resume |
| `POST` | `/job-recommendation` | AI-suggested job/internship matches |
| `POST` | `/resume-improvement` | Actionable resume rewrite suggestions |
| `GET` | `/api/dashboard` | Dashboard summary data |

All file-accepting endpoints expect `multipart/form-data` with a `file` field containing a **PDF under 10 MB**. Every response follows a consistent `{"success": bool, ...}` shape.

> 💡 For the request/response bodies, status codes, and error cases, browse the live interactive docs at `/docs` once the server is running.

---

## 🧪 Testing

A `pytest`-ready `backend/tests/` directory is scaffolded for the project's future automated test suite.

In the meantime, two manual scripts are included to verify your Gemini setup before running the full app:

```bash
cd backend

# Confirms your GEMINI_API_KEY is loaded and the model responds
python test_gemini.py

# Lists every Gemini model available to your API key
python test_model.py
```

Run these first if the backend fails on startup with a `GEMINI_API_KEY not found` error — they're the fastest way to isolate an API key/config issue from an application bug.

---

## 🗺 Roadmap

- [ ] Formal `pytest` suite for backend routes and services
- [ ] AI-generated, phase-based learning roadmaps (spec already defined in `docs/api_spec.md`)
- [ ] Recruiter-facing dashboard
- [ ] Resume version history
- [ ] Company-specific interview prep tracks

---

## 👥 Team

- Devansh Garg
- Rashi Gupta
- Piyushi Tikoo
- Saransh

---

## 🤝 Contributing

Contributions are what make the open-source community a great place to learn and build. Any contributions are **greatly appreciated**.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please keep PRs focused and include a clear description of what changed and why. If you're adding a new AI endpoint, update `docs/api_spec.md` alongside your code.

---

## 📄 License

This project does not yet include a `LICENSE` file. It is intended to be released under the **MIT License** — a permissive license that allows reuse with attribution. To finalize licensing, add a `LICENSE` file to the repository root ([generate one here](https://choosealicense.com/licenses/mit/)).

---

## 🙏 Acknowledgements

- [Google Gemini API](https://ai.google.dev/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [PyMuPDF](https://pymupdf.readthedocs.io/)
- The open-source community

<div align="center">

**Built with ❤️ to help students get placement-ready.**

</div>
