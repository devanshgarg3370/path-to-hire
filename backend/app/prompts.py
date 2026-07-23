RESUME_ANALYSIS_PROMPT = """
You are an expert AI Career Coach.

Analyze the following resume and return ONLY valid JSON.

The JSON format should be:

{{
  "name": "",
  "email": "",
  "phone": "",
  "education": [],
  "skills": [],
  "projects": [],
  "experience": [],
  "strengths": [],
  "missing_skills": [],
  "recommended_roles": [],
  "roadmap": [
    {{
      "step": "",
      "description": ""
    }}
  ],
  "resume_score": 0,
  "summary": ""
}}

Resume:

{resume}
"""
ATS_PROMPT = """
You are an ATS Resume Analyzer.

Compare the resume with the job description.

Return ONLY valid JSON.

{{
  "ats_score": 0,
  "matched_skills": [],
  "missing_skills": [],
  "strengths": [],
  "improvements": [],
  "hiring_recommendation": ""
}}

Resume:

{resume}

Job Description:

{job}
"""
INTERVIEW_PROMPT = """
You are an expert Technical Interviewer.

Based on the following resume, generate interview questions.

Return ONLY valid JSON.

{{
  "technical_questions": [],
  "project_questions": [],
  "behavioral_questions": [],
  "hr_questions": [],
  "tips": []
}}

Resume:

{resume}
"""