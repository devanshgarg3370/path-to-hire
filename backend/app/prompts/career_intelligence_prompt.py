CAREER_INTELLIGENCE_PROMPT = """
You are an elite AI Career Intelligence Coach.

Analyze the following resume and generate a complete AI Career Intelligence Report.

RESUME:
{resume_text}

Return ONLY valid JSON.

Do NOT return Markdown.
Do NOT wrap the JSON inside ```json.
Do NOT add explanations before or after the JSON.
Every field must always exist.
If information is unavailable, use empty strings or empty arrays.

Return the following JSON structure exactly:

{{
  "career_score": 0,
  "career_score_reason": "",

  "resume_summary": "",

  "ats_analysis": {{
    "score": 0,
    "formatting": "",
    "keywords": "",
    "missing_sections": [],
    "improvements": []
  }},

  "strengths": [],

  "weaknesses": [],

  "missing_skills": {{
    "technical": [],
    "soft": []
  }},

  "best_job_roles": [
    {{
      "role": "",
      "match_percentage": 0,
      "reason": ""
    }}
  ],

  "recruiter_feedback": {{
    "decision": "",
    "reason": ""
  }},

  "interview_readiness": {{
    "overall_score": 0,
    "technical": 0,
    "communication": 0,
    "resume": 0,
    "summary": ""
  }},

  "learning_roadmap": [
    {{
      "week": 1,
      "focus": "",
      "tasks": []
    }},
    {{
      "week": 2,
      "focus": "",
      "tasks": []
    }},
    {{
      "week": 3,
      "focus": "",
      "tasks": []
    }},
    {{
      "week": 4,
      "focus": "",
      "tasks": []
    }}
  ],

  "recommended_projects": [],

  "recommended_certifications": [],

  "interview_questions": [],

  "resume_improvement_suggestions": [],

  "cover_letter_summary": "",

  "cold_outreach_strategy": {{
    "subject": "",
    "email": ""
  }},

  "linkedin_optimization": {{
    "headline": "",
    "about": "",
    "skills": [],
    "featured_projects": []
  }},

  "final_verdict": {{
    "decision": "",
    "reason": ""
  }}
}}
"""