from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tempfile
import os
from typing import Dict, Any

from ai_lab.resume_analyzer.parser import ResumeParser
from ai_lab.resume_analyzer.skills import SkillExtractor
from ai_lab.resume_analyzer.scorer import ResumeScorer

app = FastAPI(title="AI Resume Analyzer API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize components
parser = ResumeParser()
skill_extractor = SkillExtractor()
scorer = ResumeScorer()


@app.post("/analyze-resume/")
async def analyze_resume(file: UploadFile = File(...)):
    """Analyze a resume and provide skill gap analysis."""
    try:
        # Validate file type
        if not file.filename.lower().endswith('.pdf'):
            raise HTTPException(status_code=400, detail="Only PDF files are allowed")
        
        # Create a temporary file to save the uploaded PDF
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(await file.read())
            temp_path = temp_file.name
        
        try:
            # Parse the resume
            parsed_resume = parser.parse_resume(temp_path)
            
            # Extract and analyze skills
            skill_analysis = skill_extractor.extract_skills_from_text(
                parsed_resume["text"], 
                parsed_resume["skills"]
            )
            
            # Generate improvement suggestions
            suggestions = skill_extractor.suggest_improvements(skill_analysis)
            
            # Score against a default job description (could be customizable)
            default_job_desc = """
            AI Engineer position requiring expertise in machine learning, deep learning, 
            Python, TensorFlow, PyTorch, NLP, computer vision, data science, LLMs, 
            transformers, prompt engineering, RAG systems, Next.js, React, and API development.
            Experience with cloud platforms, model deployment, and MLOps practices preferred.
            """
            
            scoring_result = scorer.score_resume_for_job(
                parsed_resume["text"], 
                default_job_desc
            )
            
            # Generate improvement tips
            improvement_tips = scorer.generate_improvement_tips(scoring_result, skill_analysis)
            
            # Prepare response
            result = {
                "resume_info": {
                    "total_skills_found": parsed_resume["total_skills"],
                    "skills_by_category": parsed_resume["skills"],
                    "experience_info": parsed_resume["experience"]
                },
                "skill_analysis": skill_analysis,
                "suggestions": suggestions,
                "scoring_result": scoring_result,
                "improvement_tips": improvement_tips
            }
            
            return result
            
        finally:
            # Clean up temporary file
            os.unlink(temp_path)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing resume: {str(e)}")


@app.get("/")
async def root():
    return {"message": "AI Resume Analyzer API is running!"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)