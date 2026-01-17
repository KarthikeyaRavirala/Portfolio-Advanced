import json
import os
from typing import List, Dict
from pathlib import Path

from ai_lab.shared.embeddings import EmbeddingService


class PortfolioIngestor:
    def __init__(self):
        self.embedding_service = EmbeddingService()
        self.data_dir = Path(__file__).parent.parent.parent / "data"
    
    def load_portfolio_data(self) -> Dict:
        """Load portfolio data from data files."""
        portfolio_data = {}
        
        # Load projects data
        projects_path = self.data_dir / "projects.ts"
        if projects_path.exists():
            # Read the file content
            with open(projects_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Simple extraction of project data from TypeScript file
            import re
            import json
            
            # Extract the projects array from the export
            # We'll use a simple regex to extract the content between the brackets
            pattern = r'export const projects = \[(.*?)\];'
            match = re.search(pattern, content, re.DOTALL)
            
            if match:
                # Extract the projects portion
                projects_str = match.group(1)
                
                # Clean up the string to make it JSON-compatible
                # This is a simplified approach for demonstration
                # In a real scenario, you'd want a more robust TS/JS parser
                cleaned_str = self._clean_ts_to_json(projects_str)
                
                try:
                    # Attempt to parse the cleaned content
                    projects_data = json.loads(f"[{cleaned_str}]" if cleaned_str.strip() else "[]")
                    
                    # Transform the data to our expected format
                    transformed_projects = []
                    for proj in projects_data:
                        transformed_proj = {
                            "id": proj.get('id', 0),
                            "title": proj.get('title', ''),
                            "description": proj.get('description', ''),
                            "technologies": proj.get('tech', []),
                            "category": self._categorize_project(proj.get('tech', []))
                        }
                        transformed_projects.append(transformed_proj)
                    
                    portfolio_data["projects"] = transformed_projects
                except json.JSONDecodeError:
                    print("Failed to parse projects data, using fallback")
                    portfolio_data["projects"] = self._get_fallback_projects()
            else:
                print("Could not find projects array, using fallback")
                portfolio_data["projects"] = self._get_fallback_projects()
        else:
            print("Projects file not found, using fallback")
            portfolio_data["projects"] = self._get_fallback_projects()
        
        # Load experience data
        experience_path = self.data_dir / "experience.ts"
        if experience_path.exists():
            with open(experience_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Extract the experience array from the export
            pattern = r'export const experience = \[(.*?)\];'
            match = re.search(pattern, content, re.DOTALL)
            
            if match:
                experience_str = match.group(1)
                cleaned_str = self._clean_ts_to_json(experience_str)
                
                try:
                    experience_data = json.loads(f"[{cleaned_str}]" if cleaned_str.strip() else "[]")
                    
                    # Transform the data to our expected format
                    transformed_experience = []
                    for exp in experience_data:
                        transformed_exp = {
                            "id": exp.get('id', 0),
                            "title": exp.get('company', ''),
                            "subtitle": exp.get('role', ''),
                            "period": exp.get('period', ''),
                            "achievements": exp.get('achievements', [])
                        }
                        transformed_experience.append(transformed_exp)
                    
                    portfolio_data["experience"] = transformed_experience
                except json.JSONDecodeError:
                    print("Failed to parse experience data, using fallback")
                    portfolio_data["experience"] = self._get_fallback_experience()
            else:
                print("Could not find experience array, using fallback")
                portfolio_data["experience"] = self._get_fallback_experience()
        else:
            print("Experience file not found, using fallback")
            portfolio_data["experience"] = self._get_fallback_experience()
        
        # Add general portfolio information
        portfolio_data["general"] = [
            {
                "section": "About",
                "content": "Innovative AI Engineer & Tech Creator specializing in transforming complex technological concepts into practical, real-world solutions. Expertise in machine learning, computer vision, and natural language processing."
            },
            {
                "section": "Skills",
                "content": "Python, TensorFlow, PyTorch, React, Next.js, TypeScript, AWS, Docker, NLP, Computer Vision, RAG Systems, LLM Integration, API Development, MLOps"
            },
            {
                "section": "Education",
                "content": "B.Tech in Artificial Intelligence from Anurag University, Hyderabad (2022-2026), CGPA: 8.56 / 10"
            }
        ]
        
        return portfolio_data
    
    def _clean_ts_to_json(self, ts_str):
        """Clean TypeScript syntax to make it JSON-compatible"""
        import re
        
        # Replace single-line comments
        cleaned = re.sub(r'//.*?\n', '', ts_str)
        # Replace multi-line comments
        cleaned = re.sub(r'/\*(.|\n)*?\*/', '', cleaned)
        
        # Replace single quotes with double quotes (carefully)
        # This is a simplified approach - a full parser would be more robust
        parts = []
        i = 0
        while i < len(cleaned):
            if cleaned[i] == "'":
                # Find the matching quote
                j = i + 1
                while j < len(cleaned) and cleaned[j] != "'":
                    if cleaned[j] == '\\':
                        j += 2  # Skip escaped characters
                    else:
                        j += 1
                if j < len(cleaned):
                    parts.append('\"' + cleaned[i+1:j] + '\"')
                    i = j + 1
                else:
                    parts.append(cleaned[i])
                    i += 1
            else:
                parts.append(cleaned[i])
                i += 1
        
        cleaned = ''.join(parts)
        
        # Convert ES6 object shorthand to full form
        # e.g., { id, name } -> { id: id, name: name }
        cleaned = re.sub(r'([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=[,}])', r'\1"\2": \2', cleaned)
        
        # Add quotes to unquoted keys
        cleaned = re.sub(r'([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:', r'\1"\2":', cleaned)
        
        return cleaned
    
    def _categorize_project(self, technologies):
        """Categorize a project based on its technologies"""
        if any(t in ['AI', 'LLM', 'NLP', 'Machine Learning', 'Computer Vision', 'TensorFlow', 'PyTorch', 'LSTM', 'OpenAI', 'LangChain'] for t in technologies):
            return "AI"
        elif any(t in ['React', 'Next.js', 'TypeScript', 'JavaScript', 'CSS', 'Tailwind CSS', 'Node.js', 'HTML'] for t in technologies):
            return "Web Dev"
        elif any(t in ['React Native', 'Mobile', 'iOS', 'Android'] for t in technologies):
            return "Mobile"
        elif any(t in ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'MySQL', 'REST API', 'API', 'Spring Boot', 'Java'] for t in technologies):
            return "Backend"
        elif any(t in ['Python', 'Pandas', 'NumPy', 'Data Science', 'SQL', 'Analytics'] for t in technologies):
            return "Data Science"
        else:
            return "Other"
    
    def _get_fallback_projects(self):
        """Fallback method to return default projects if parsing fails"""
        return [
            {
                "id": 1,
                "title": "Anurag-GPT",
                "description": "AI-powered chatbot for university students, leveraging LangChain and LLMs with a RAG pipeline over 50+ academic documents. Achieves 90%+ relevance accuracy for student queries.",
                "technologies": ["LangChain", "LLMs", "Streamlit", "RAG", "Python", "AI", "NLP"],
                "category": "AI"
            },
            {
                "id": 2,
                "title": "Real-Time Sign Language Translation",
                "description": "Indian Sign Language translation system using MediaPipe and LSTM models for real-time communication assistance.",
                "technologies": ["MediaPipe", "TensorFlow", "LSTM", "Python", "Computer Vision", "AI"],
                "category": "AI"
            },
            {
                "id": 3,
                "title": "AU Connect",
                "description": "Comprehensive platform for Anurag University students and alumni to connect, share resources, and network professionally.",
                "technologies": ["React", "Node.js", "MongoDB", "Express", "JavaScript"],
                "category": "Web Dev"
            },
            {
                "id": 4,
                "title": "Pharmacy Management System",
                "description": "Digital solution for managing pharmacy inventory, prescriptions, and customer data with automated tracking capabilities.",
                "technologies": ["Java", "Spring Boot", "MySQL", "Hibernate", "REST API"],
                "category": "Backend"
            },
            {
                "id": 5,
                "title": "Child Assistant",
                "description": "AI-powered educational and safety assistant for children with age-appropriate content and parental controls.",
                "technologies": ["AI", "Python", "TensorFlow", "Flask", "Computer Vision"],
                "category": "AI"
            },
            {
                "id": 6,
                "title": "AlumniConnect",
                "description": "Platform connecting university alumni for networking, mentorship, and career opportunities with event management features.",
                "technologies": ["React", "Node.js", "MongoDB", "Socket.io", "JavaScript"],
                "category": "Web Dev"
            },
            {
                "id": 7,
                "title": "First Line Of Care Hackz",
                "description": "Healthcare solution developed during hackathon to provide immediate medical assistance and triage information.",
                "technologies": ["React Native", "Firebase", "Node.js", "Express", "Healthcare"],
                "category": "Mobile"
            },
            {
                "id": 8,
                "title": "Career Launchpad",
                "description": "Career guidance platform offering resources, mentorship matching, and skill development for students and professionals.",
                "technologies": ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
                "category": "Web Dev"
            },
            {
                "id": 9,
                "title": "Email Intelligence Agent",
                "description": "AI-powered email assistant that categorizes, prioritizes, and responds to emails with intelligent automation.",
                "technologies": ["Python", "NLP", "AI", "Email Automation", "OpenAI"],
                "category": "AI"
            },
            {
                "id": 10,
                "title": "Pianoweb",
                "description": "Interactive piano learning platform with sheet music, tutorials, and practice tools for music education.",
                "technologies": ["React", "Web Audio API", "JavaScript", "CSS", "Music"],
                "category": "Web Dev"
            },
            {
                "id": 11,
                "title": "SQL Query Generator",
                "description": "Natural language to SQL converter that translates user queries into database commands with intelligent suggestions.",
                "technologies": ["Python", "NLP", "SQL", "Flask", "AI"],
                "category": "AI"
            },
            {
                "id": 12,
                "title": "AI Academic Content Generator",
                "description": "AI-powered tool for generating educational content, research summaries, and academic materials with citation support.",
                "technologies": ["Python", "LLMs", "LangChain", "AI", "NLP"],
                "category": "AI"
            }
        ]
    
    def _get_fallback_experience(self):
        """Fallback method to return default experience if parsing fails"""
        return [
            {
                "id": 1,
                "title": "AI Systems & LLM Engineering",
                "subtitle": "AI / ML Engineer (Open Source & Projects)",
                "period": "2022 – Present",
                "achievements": [
                    "Designed and shipped AI-powered applications leveraging LLMs, ML pipelines, and modular system architectures",
                    "Built domain-specific AI assistants, focusing on prompt engineering, contextual retrieval, and response reliability"
                ]
            }
        ]
    
    def create_chunks(self, data: Dict, chunk_size: int = 500) -> List[Dict]:
        """Create text chunks from portfolio data for the RAG system."""
        chunks = []
        chunk_id = 0
        
        # Process projects
        for project in data.get("projects", []):
            content = f"Project: {project['title']}\nDescription: {project['description']}\nTechnologies: {', '.join(project['technologies'])}\nCategory: {project['category']}"
            chunks.extend(self._split_content(content, chunk_id, "project"))
            chunk_id += len(self._split_content(content, 0, "project"))
        
        # Process experience
        for exp in data.get("experience", []):
            content = f"Experience: {exp['title']}\nRole: {exp['subtitle']}\nPeriod: {exp['period']}\nAchievements: {'; '.join(exp['achievements'])}"
            chunks.extend(self._split_content(content, chunk_id, "experience"))
            chunk_id += len(self._split_content(content, 0, "experience"))
        
        # Process general info
        for item in data.get("general", []):
            content = f"Section: {item['section']}\nContent: {item['content']}"
            chunks.extend(self._split_content(content, chunk_id, "general"))
            chunk_id += len(self._split_content(content, 0, "general"))
        
        return chunks
    
    def _split_content(self, content: str, start_id: int, source_type: str) -> List[Dict]:
        """Split content into smaller chunks."""
        chunks = []
        words = content.split()
        
        for i in range(0, len(words), 100):  # 100 words per chunk
            chunk_text = ' '.join(words[i:i+100])
            chunks.append({
                "id": start_id + len(chunks),
                "text": chunk_text,
                "source_type": source_type,
                "source_id": start_id
            })
        
        return chunks
    
    def embed_chunks(self, chunks: List[Dict]) -> List[Dict]:
        """Add embeddings to chunks."""
        for chunk in chunks:
            chunk["embedding"] = self.embedding_service.encode_text(chunk["text"]).tolist()
        return chunks
    
    def ingest(self) -> List[Dict]:
        """Complete ingestion pipeline."""
        data = self.load_portfolio_data()
        chunks = self.create_chunks(data)
        embedded_chunks = self.embed_chunks(chunks)
        
        # Save to a JSON file for now (in a real implementation, this would go to a vector DB)
        output_path = Path(__file__).parent / "portfolio_chunks.json"
        with open(output_path, 'w') as f:
            json.dump(embedded_chunks, f)
        
        return embedded_chunks