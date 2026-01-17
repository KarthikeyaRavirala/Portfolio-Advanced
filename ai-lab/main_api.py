from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ai_lab.resume_analyzer.api import app as resume_app
from ai_lab.portfolio_chatbot.api import app as chatbot_app

# Create main FastAPI application
main_app = FastAPI(title="AI Lab API", version="1.0.0")

# Add CORS middleware
main_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the sub-applications
main_app.mount("/resume", resume_app)
main_app.mount("/chatbot", chatbot_app)

@main_app.get("/")
async def root():
    return {
        "message": "AI Lab API is running!",
        "endpoints": {
            "resume_analyzer": "/resume/analyze-resume/",
            "portfolio_chatbot": "/chatbot/chat/"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(main_app, host="0.0.0.0", port=8002)