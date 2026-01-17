from typing import Dict, List
from ai_lab.shared.embeddings import EmbeddingService


class ResumeScorer:
    def __init__(self):
        self.embedding_service = EmbeddingService()
    
    def score_resume_for_job(self, resume_text: str, job_description: str) -> Dict:
        """Score how well a resume matches a job description."""
        # Calculate semantic similarity between resume and job description
        resume_embedding = self.embedding_service.encode_text(resume_text)
        job_embedding = self.embedding_service.encode_text(job_description)
        
        similarity_score = self.embedding_service.cosine_similarity(
            resume_embedding, job_embedding
        )
        
        # Calculate keyword matching
        resume_lower = resume_text.lower()
        job_lower = job_description.lower()
        
        # Extract keywords from job description (simple approach)
        job_keywords = set(job_lower.split())
        resume_words = set(resume_lower.split())
        
        keyword_match_count = len(job_keywords.intersection(resume_words))
        keyword_match_percentage = (
            keyword_match_count / len(job_keywords) * 100 if job_keywords else 0
        )
        
        # Calculate a composite score
        composite_score = (similarity_score * 0.7 + keyword_match_percentage * 0.003) * 100
        
        return {
            "semantic_similarity": float(similarity_score),
            "keyword_match_percentage": keyword_match_percentage,
            "composite_score": min(composite_score, 100),  # Cap at 100
            "keyword_matches": keyword_match_count,
            "total_job_keywords": len(job_keywords)
        }
    
    def generate_improvement_tips(self, resume_analysis: Dict, job_analysis: Dict) -> List[str]:
        """Generate specific improvement tips based on resume analysis."""
        tips = []
        
        # If composite score is low, suggest general improvements
        if resume_analysis.get("composite_score", 0) < 50:
            tips.append("Consider reformatting your resume to better align with the job description")
            tips.append("Include more keywords from the job description in your resume")
            tips.append("Highlight relevant experience that matches the job requirements")
        
        # Add specific skill-based tips
        for job_role, data in job_analysis.items():
            if data["match_percentage"] < 70:
                tips.append(f"For {job_role} role: Focus on developing {len(data['missing_skills'])} key skills")
                if data["missing_skills"]:
                    tips.append(f"Key missing skills for {job_role}: {', '.join(data['missing_skills'][:3])}")
        
        return tips