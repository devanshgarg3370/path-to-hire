RESUME_ANALYSIS_PROMPT = """
You are an expert AI Career Coach.

Analyze the following resume and return ONLY valid JSON.

The JSON format should be:

{
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
    {
      "step": "",
      "description": ""
    }
  ],
  "resume_score": 0,
  "summary": ""
}

Resume:

{resume}
"""