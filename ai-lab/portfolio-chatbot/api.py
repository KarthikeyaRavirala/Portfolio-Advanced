from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional

from ai_lab.portfolio_chatbot.ingest import PortfolioIngestor
from ai_lab.portfolio_chatbot.retriever import PortfolioRetriever
from ai_lab.portfolio_chatbot.prompt import PromptEngineer

app = FastAPI(title="AI Portfolio Chatbot API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize components
ingestor = PortfolioIngestor()
retriever = PortfolioRetriever()
prompt_engineer = PromptEngineer()

# Ingest portfolio data on startup if chunks don't exist
try:
    if not retriever.chunks:
        print("Ingesting portfolio data...")
        chunks = ingestor.ingest()
        print(f"Ingested {len(chunks)} chunks")
except Exception as e:
    print(f"Error during ingestion: {e}")


class ChatRequest(BaseModel):
    query: str
    history: Optional[List[Dict]] = []


class ChatResponse(BaseModel):
    response: str
    sources: List[Dict]
    confidence: float


@app.post("/chat/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Chat with the portfolio assistant using RAG."""
    try:
        # Retrieve relevant chunks based on the query
        relevant_chunks = retriever.retrieve_relevant_chunks(request.query, top_k=3)
        
        if not relevant_chunks:
            return ChatResponse(
                response="I'm having trouble accessing portfolio information right now. Please try asking about specific projects, skills, or experience.",
                sources=[],
                confidence=0.0
            )
        
        # Create RAG prompt
        prompt = prompt_engineer.create_rag_prompt(request.query, relevant_chunks)
        
        # For now, we'll simulate a response based on the context
        # In a real implementation, you would call an LLM API here
        response = simulate_llm_response(prompt, relevant_chunks)
        
        # Calculate a basic confidence score based on context relevance
        avg_similarity = sum([0.8 for _ in relevant_chunks]) / len(relevant_chunks) if relevant_chunks else 0.0
        
        # Prepare sources
        sources = [
            {
                "id": chunk["id"],
                "text": chunk["text"][:200] + "..." if len(chunk["text"]) > 200 else chunk["text"],
                "source_type": chunk["source_type"]
            }
            for chunk in relevant_chunks
        ]
        
        return ChatResponse(
            response=response,
            sources=sources,
            confidence=round(avg_similarity, 2)
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing chat: {str(e)}")


def simulate_llm_response(prompt: str, context_chunks: List[Dict]) -> str:
    """Simulate an LLM response based on context (in a real implementation, this would call an LLM API)."""
    # Extract key information from context
    projects = []
    skills = []
    experience = []
    
    for chunk in context_chunks:
        text = chunk["text"].lower()
        if "project" in text or "anurag-gpt" in text or "smart cam" in text:
            projects.append(chunk["text"])
        elif "skill" in text or "python" in text or "tensorflow" in text or "pytorch" in text:
            skills.append(chunk["text"])
        elif "experience" in text or "engineer" in text:
            experience.append(chunk["text"])
    
    # Generate a response based on the detected content
    if projects:
        project_info = " and ".join([p[:100] + "..." for p in projects])
        return f"I can tell you about my projects. For example: {project_info} For more details about my projects, feel free to ask specific questions!"
    
    elif skills:
        return "I have expertise in various technologies including Python, TensorFlow, PyTorch, React, Next.js, TypeScript, and more. My focus is on AI/ML development, particularly in LLMs, NLP, and computer vision."
    
    elif experience:
        exp_info = " and ".join([e[:100] + "..." for e in experience])
        return f"Regarding my experience: {exp_info} I specialize in building AI-powered applications and have experience with full-stack development."
    
    else:
        return "I'm Karthikeya Ravirala, an AI Engineer & Tech Creator. I specialize in transforming complex technological concepts into practical, real-world solutions. I have expertise in machine learning, computer vision, and natural language processing. Feel free to ask me about my projects, skills, or experience!"


@app.get("/")
async def root():
    return {"message": "AI Portfolio Chatbot API is running!"}


@app.post("/ingest/")
async def ingest():
    """Manually trigger portfolio data ingestion."""
    try:
        chunks = ingestor.ingest()
        return {"message": f"Successfully ingested {len(chunks)} chunks"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error during ingestion: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)