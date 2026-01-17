import fitz  # PyMuPDF
import re
from typing import Dict, List


class ResumeParser:
    def __init__(self):
        # Common skill keywords organized by category
        self.skill_keywords = {
            "programming": [
                "python", "javascript", "java", "typescript", "react", "node.js", 
                "angular", "vue.js", "html", "css", "sql", "mongodb", "postgresql",
                "aws", "docker", "kubernetes", "git", "tensorflow", "pytorch", "next.js"
            ],
            "ai_ml": [
                "machine learning", "deep learning", "nlp", "computer vision", 
                "neural networks", "data science", "pandas", "numpy", "scikit-learn",
                "llm", "transformers", "gpt", "chatgpt", "prompt engineering", "rag"
            ],
            "soft": [
                "leadership", "communication", "problem solving", "teamwork", 
                "project management", "agile", "scrum", "analytical thinking"
            ]
        }
    
    def extract_text_from_pdf(self, pdf_path: str) -> str:
        """Extract text from a PDF file."""
        try:
            doc = fitz.open(pdf_path)
            text = ""
            for page in doc:
                text += page.get_text()
            doc.close()
            return text
        except Exception as e:
            raise Exception(f"Error reading PDF: {str(e)}")
    
    def extract_skills(self, text: str) -> Dict[str, List[str]]:
        """Extract skills from the resume text."""
        text_lower = text.lower()
        extracted_skills = {}
        
        for category, keywords in self.skill_keywords.items():
            found_skills = []
            for keyword in keywords:
                if keyword in text_lower:
                    # Add the original case from the resume text
                    pattern = r'\b' + re.escape(keyword) + r'\b'
                    matches = re.findall(pattern, text, re.IGNORECASE)
                    for match in matches:
                        if match not in found_skills:
                            found_skills.append(match)
            extracted_skills[category] = found_skills
        
        return extracted_skills
    
    def extract_experience_info(self, text: str) -> Dict[str, str]:
        """Extract basic experience information from the resume."""
        # Look for years of experience patterns
        patterns = [
            r'(\d+)\+?\s+years?\s+of\s+experience',
            r'(\d+)\s+years?\s+experience',
            r'(\d+)\s+years?\s+in',
            r'experience\s+of\s+(\d+)\s+years?'
        ]
        
        for pattern in patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                return {"years_experience": match.group(1)}
        
        return {"years_experience": "Not specified"}
    
    def parse_resume(self, pdf_path: str) -> Dict:
        """Complete resume parsing pipeline."""
        text = self.extract_text_from_pdf(pdf_path)
        skills = self.extract_skills(text)
        experience = self.extract_experience_info(text)
        
        return {
            "text": text,
            "skills": skills,
            "experience": experience,
            "total_skills": sum(len(skill_list) for skill_list in skills.values())
        }