# Path to Hire API Specification

**Version:** 1.0

---

## Overview

This document defines all API endpoints used in the Path to Hire application.

Its purpose is to ensure the Frontend, Backend, and AI teams follow the same communication standard.

### Base URL

```
http://localhost:8000/api/v1
```

### Content Type

```
application/json
```

---

## Standard Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}
}
```

### Error Response

```json
{
  "success": false,
  "message": "Something went wrong",
  "error": "Error details"
}
```

---

# 1. Upload Resume

## Endpoint

**POST** `/upload-resume`

---

## Description

Uploads a user's resume (PDF or DOCX) to the server for further AI analysis.

---

## Request

### Headers

```http
Content-Type: multipart/form-data
```

### Form Data

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| resume | File | ✅ Yes | Resume in PDF or DOCX format |

---

## Success Response

**Status Code:** `201 Created`

```json
{
  "success": true,
  "message": "Resume uploaded successfully",
  "data": {
    "resume_id": "res_123456",
    "file_name": "resume.pdf"
  }
}
```

---

## Error Responses

### No File Uploaded

**Status Code:** `400 Bad Request`

```json
{
  "success": false,
  "message": "No resume file uploaded"
}
```

### Unsupported File Format

**Status Code:** `415 Unsupported Media Type`

```json
{
  "success": false,
  "message": "Only PDF and DOCX files are supported"
}
```

---

## Notes

- Maximum file size: **5 MB**
- Supported formats: **.pdf**, **.docx**
- Every uploaded resume receives a unique `resume_id`.
- The `resume_id` will be used in future API requests like resume analysis, skill gap analysis, and roadmap generation.
# 2. Analyze Resume

## Endpoint

**POST** `/analyze-resume`

---

## Description

Analyzes an uploaded resume using the Gemini AI model and provides an ATS score, strengths, missing keywords, and improvement suggestions.

---

## Request

### Headers

```http
Content-Type: application/json
```

### Body

```json
{
  "resume_id": "res_123456"
}
```

---

## Success Response

**Status Code:** `200 OK`

```json
{
  "success": true,
  "message": "Resume analyzed successfully",
  "data": {
    "ats_score": 84,
    "strengths": [
      "Python",
      "React",
      "SQL"
    ],
    "missing_keywords": [
      "Docker",
      "Kubernetes",
      "CI/CD"
    ],
    "suggestions": [
      "Add measurable achievements",
      "Improve project descriptions",
      "Include relevant certifications"
    ]
  }
}
```

---

## Error Responses

### Resume Not Found

**Status Code:** `404 Not Found`

```json
{
  "success": false,
  "message": "Resume not found"
}
```

### AI Processing Error

**Status Code:** `500 Internal Server Error`

```json
{
  "success": false,
  "message": "Failed to analyze resume"
}
```

---

## Notes

- The endpoint requires a valid `resume_id`.
- The uploaded resume is processed by the Gemini AI model.
- The ATS score ranges from **0–100**.
- Suggestions are generated dynamically based on the resume content.
# 3. Skill Gap Analysis

## Endpoint

**POST** `/skill-gap`

---

## Description

Compares the user's current skills with the skills required for a target job role and identifies missing skills.

---

## Request

### Headers

```http
Content-Type: application/json
```

### Body

```json
{
  "resume_id": "res_123456",
  "target_role": "AI Engineer"
}
```

---

## Success Response

**Status Code:** `200 OK`

```json
{
  "success": true,
  "message": "Skill gap analysis completed",
  "data": {
    "target_role": "AI Engineer",
    "current_skills": [
      "Python",
      "SQL",
      "Git"
    ],
    "missing_skills": [
      "Docker",
      "Kubernetes",
      "FastAPI",
      "Machine Learning"
    ],
    "recommended_priority": [
      "Docker",
      "FastAPI",
      "Machine Learning",
      "Kubernetes"
    ],
    "match_percentage": 68
  }
}
```

---

## Error Responses

### Resume Not Found

**Status Code:** `404 Not Found`

```json
{
  "success": false,
  "message": "Resume not found"
}
```

### Invalid Target Role

**Status Code:** `400 Bad Request`

```json
{
  "success": false,
  "message": "Invalid target role"
}
```

---

## Notes

- Requires a valid `resume_id`.
- The target role is selected by the user.
- AI compares resume skills with industry-required skills.
- Match percentage ranges from **0–100**.
- Missing skills are ordered based on learning priority.
# 4. Learning Roadmap

## Endpoint

**POST** `/roadmap`

---

## Description

Generates a personalized learning roadmap based on the user's current skills, missing skills, and target job role.

---

## Request

### Headers

```http
Content-Type: application/json
```

### Body

```json
{
  "resume_id": "res_123456",
  "target_role": "AI Engineer"
}
```

---

## Success Response

**Status Code:** `200 OK`

```json
{
  "success": true,
  "message": "Roadmap generated successfully",
  "data": {
    "target_role": "AI Engineer",
    "estimated_duration": "6 Months",
    "phases": [
      {
        "phase": 1,
        "title": "Programming Fundamentals",
        "duration": "4 Weeks",
        "topics": [
          "Python",
          "Git",
          "GitHub"
        ]
      },
      {
        "phase": 2,
        "title": "Backend Development",
        "duration": "6 Weeks",
        "topics": [
          "FastAPI",
          "REST APIs",
          "SQL"
        ]
      },
      {
        "phase": 3,
        "title": "AI & Machine Learning",
        "duration": "8 Weeks",
        "topics": [
          "Machine Learning",
          "LLMs",
          "Prompt Engineering",
          "Vector Databases"
        ]
      },
      {
        "phase": 4,
        "title": "Projects & Interview Preparation",
        "duration": "6 Weeks",
        "topics": [
          "Portfolio Projects",
          "Resume Improvement",
          "Mock Interviews"
        ]
      }
    ]
  }
}
```

---

## Error Responses

### Resume Not Found

**Status Code:** `404 Not Found`

```json
{
  "success": false,
  "message": "Resume not found"
}
```

### Roadmap Generation Failed

**Status Code:** `500 Internal Server Error`

```json
{
  "success": false,
  "message": "Unable to generate roadmap"
}
```

---

## Notes

- Requires a valid `resume_id`.
- The roadmap is personalized for each user.
- The learning phases are generated dynamically using AI.
- Estimated duration may vary depending on the user's current skill level and target role.
# 5. Mock Interview

## Endpoint

**POST** `/mock-interview`

---

## Description

Generates personalized interview questions based on the user's resume and target job role. The AI can also evaluate answers and provide feedback.

---

## Request

### Headers

```http
Content-Type: application/json
```

### Body

```json
{
  "resume_id": "res_123456",
  "target_role": "AI Engineer",
  "difficulty": "Intermediate",
  "number_of_questions": 10
}
```

---

## Success Response

**Status Code:** `200 OK`

```json
{
  "success": true,
  "message": "Interview questions generated successfully",
  "data": {
    "target_role": "AI Engineer",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": 1,
        "question": "Explain the difference between supervised and unsupervised learning.",
        "type": "Technical"
      },
      {
        "id": 2,
        "question": "Tell me about a challenging project you worked on.",
        "type": "Behavioral"
      },
      {
        "id": 3,
        "question": "How would you optimize a machine learning model for production?",
        "type": "Technical"
      }
    ]
  }
}
```

---

## Error Responses

### Resume Not Found

**Status Code:** `404 Not Found`

```json
{
  "success": false,
  "message": "Resume not found"
}
```

### Invalid Difficulty Level

**Status Code:** `400 Bad Request`

```json
{
  "success": false,
  "message": "Invalid difficulty level"
}
```

---

## Notes

- Requires a valid `resume_id`.
- Difficulty levels: `Beginner`, `Intermediate`, `Advanced`.
- Questions are generated dynamically using Gemini AI.
- Supports both technical and behavioral interview questions.
# 6. Internship & Job Recommendations

## Endpoint

**GET** `/recommendations`

---

## Description

Returns personalized internship and job recommendations based on the user's resume, skills, target role, and preferred location.

---

## Request

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| resume_id | String | ✅ Yes | Unique resume identifier |
| target_role | String | ✅ Yes | Desired job role |
| location | String | ❌ No | Preferred location |
| experience | String | ❌ No | Fresher / 1 Year / 2+ Years |

### Example Request

```http
GET /recommendations?resume_id=res_123456&target_role=AI Engineer&location=Delhi
```

---

## Success Response

**Status Code:** `200 OK`

```json
{
  "success": true,
  "message": "Recommendations fetched successfully",
  "data": {
    "recommendations": [
      {
        "company": "Google",
        "role": "AI Engineering Intern",
        "location": "Bangalore",
        "type": "Internship",
        "skills_required": [
          "Python",
          "Machine Learning",
          "SQL"
        ],
        "match_percentage": 87
      },
      {
        "company": "Microsoft",
        "role": "Software Engineer Intern",
        "location": "Hyderabad",
        "type": "Internship",
        "skills_required": [
          "Python",
          "Git",
          "Data Structures"
        ],
        "match_percentage": 82
      }
    ]
  }
}
```

---

## Error Responses

### Resume Not Found

**Status Code:** `404 Not Found`

```json
{
  "success": false,
  "message": "Resume not found"
}
```

### No Recommendations Available

**Status Code:** `200 OK`

```json
{
  "success": true,
  "message": "No matching recommendations found",
  "data": {
    "recommendations": []
  }
}
```

---

## Notes

- Requires a valid `resume_id`.
- Recommendations are personalized based on the user's profile.
- Results can be filtered by location and experience level.
- Match percentage indicates how well the user's profile aligns with the job requirements.