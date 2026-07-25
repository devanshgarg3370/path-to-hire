RESUME_ANALYSIS_PROMPT = """
You are an expert AI Career Coach and Resume Reviewer.

Analyze the following resume.

Return ONLY valid JSON.

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

Compare the resume against the provided job description.

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

Generate interview questions based on the candidate's resume.

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


SKILLS_EXTRACTION_PROMPT = """
You are an expert Resume Parser.

Extract ALL skills from the resume.

Rules:
- Return ONLY valid JSON.
- No markdown.
- No explanation.
- Remove duplicate skills.
- Categorize skills.

Return this JSON exactly:

{{
  "technical_skills": [],
  "programming_languages": [],
  "frameworks": [],
  "databases": [],
  "tools": [],
  "soft_skills": [],
  "certifications": []
}}

Resume:

{resume}
"""

JOB_RECOMMENDATION_PROMPT = """
You are an expert Career Advisor.

Analyze the resume and recommend the best career paths.

Return ONLY valid JSON.

{{
  "recommended_jobs": [
    {{
      "role": "",
      "match_percentage": 0,
      "reason": "",
      "average_salary": "",
      "next_step": ""
    }}
  ]
}}

Resume:

{resume}
"""

RESUME_IMPROVEMENT_PROMPT = """
You are an expert Resume Reviewer.

Suggest improvements for the given resume.

Return ONLY valid JSON.

{{
  "overall_score": 0,
  "critical_issues": [],
  "grammar_improvements": [],
  "formatting_improvements": [],
  "content_improvements": [],
  "final_advice": ""
}}

Resume:

{resume}
"""