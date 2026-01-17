from typing import Dict, List
from ai_lab.shared.embeddings import EmbeddingService


class SkillExtractor:
    def __init__(self):
        self.embedding_service = EmbeddingService()
        # Target job roles and their required skills
        self.job_requirements = {
            "AI Engineer": [
                "machine learning", "deep learning", "python", "tensorflow", "pytorch", 
                "nlp", "computer vision", "data science", "llm", "transformers", 
                "prompt engineering", "rag", "next.js", "react", "api development"
            ],
            "ML Engineer": [
                "machine learning", "python", "tensorflow", "pytorch", "data science", 
                "scikit-learn", "pandas", "numpy", "mlops", "model deployment", 
                "computer vision", "nlp", "aws", "docker", "kubernetes"
            ],
            "Full Stack Developer": [
                "javascript", "react", "node.js", "python", "next.js", "typescript", 
                "html", "css", "sql", "mongodb", "postgresql", "api development", 
                "rest", "graphql", "git", "agile"
            ]
        }
    
    def extract_skills_from_text(self, text: str, resume_skills: Dict[str, List[str]]) -> Dict:
        """Analyze skills in the context of target job roles."""
        all_resume_skills = []
        for skill_list in resume_skills.values():
            all_resume_skills.extend(skill_list)
        
        analysis = {}
        for job_role, required_skills in self.job_requirements.items():
            matching_skills = []
            missing_skills = []
            
            for skill in required_skills:
                if any(skill.lower() in rs.lower() or rs.lower() in skill.lower() 
                      for rs in all_resume_skills):
                    matching_skills.append(skill)
                else:
                    missing_skills.append(skill)
            
            analysis[job_role] = {
                "matching_skills": matching_skills,
                "missing_skills": missing_skills,
                "match_percentage": len(matching_skills) / len(required_skills) * 100
            }
        
        return analysis
    
    def suggest_improvements(self, analysis: Dict) -> List[Dict]:
        """Generate improvement suggestions based on skill gaps."""
        suggestions = []
        
        for job_role, data in analysis.items():
            if data["match_percentage"] < 70:  # Less than 70% match
                suggestions.append({
                    "job_role": job_role,
                    "missing_count": len(data["missing_skills"]),
                    "top_missing_skills": data["missing_skills"][:5],  # Top 5 missing skills
                    "suggestion": f"Focus on acquiring {len(data['missing_skills'])} key skills for {job_role} role"
                })
        
        return suggestions