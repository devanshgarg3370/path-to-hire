SKILLS_EXTRACTION_PROMPT = """
You are an expert resume skill extraction system.

Analyze the provided resume and extract skills that are actually supported by its contents.

IMPORTANT OUTPUT RULES:

Return ONLY valid JSON.
Do NOT return Markdown.
Do NOT use code fences.
Do NOT include explanations outside the JSON.
Do NOT return null.
Do NOT invent skills.

Return EXACTLY this structure:

{
    "technical_skills": [],
    "soft_skills": [],
    "tools": [],
    "frameworks": [],
    "languages": []
}

FIELD RULES:

"technical_skills":
- Technical concepts and professional competencies demonstrated by the resume.

"soft_skills":
- Soft skills that are reasonably supported by experience, projects, or achievements.

"tools":
- Development, cloud, database, design, analytics, or other professional tools explicitly mentioned.

"frameworks":
- Frameworks and libraries explicitly mentioned or clearly demonstrated.

"languages":
- Programming languages explicitly mentioned or demonstrated.

Every field MUST be a JSON array of strings.

If no supported skills exist for a category, return an empty array.

Do not infer technologies merely because they are commonly associated with another technology.
"""
