import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Check if this is a development environment
    // In production, you'd want to connect to your actual backend service
    if (process.env.NODE_ENV === 'development' || !process.env.AI_API_URL) {
      // Return mock response for development or when no backend is configured
      console.log('Using mock response for chatbot');
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const body = await req.json();
      const { query } = body;
      
      // Mock response based on user input
      let botResponse = "I'm your portfolio assistant. I can help you learn more about Karthikeya's projects, skills, and experience. What would you like to know?";
      
      if (query.toLowerCase().includes('project') || query.toLowerCase().includes('anurag')) {
        botResponse = "One of my key projects is Anurag-GPT, a university-specific AI chatbot using LangChain and integrated LLMs. It achieved over 90% accuracy in query relevance and includes a Streamlit-based UI with a knowledge base from 50+ academic documents.";
      } else if (query.toLowerCase().includes('skill') || query.toLowerCase().includes('technology')) {
        botResponse = "I have expertise in Python, TensorFlow, PyTorch, React, Next.js, TypeScript, and more. My focus is on AI/ML development, particularly in LLMs, NLP, and computer vision.";
      } else if (query.toLowerCase().includes('experience') || query.toLowerCase().includes('role')) {
        botResponse = "I have experience as an AI/ML Engineer working on open source projects and building AI-powered applications. My focus is on LLMs, ML pipelines, and modular system architectures.";
      } else if (query.toLowerCase().includes('education') || query.toLowerCase().includes('degree')) {
        botResponse = "I'm pursuing a B.Tech in Artificial Intelligence from Anurag University, Hyderabad (2022-2026) with a CGPA of 8.56/10.";
      }
      
      return new Response(
        JSON.stringify({
          response: botResponse,
          sources: [],
          confidence: 0.8
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // In production, forward the request to the actual backend service
    const body = await req.json();
    const response = await fetch(`${process.env.AI_API_URL}/chatbot/chat/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in chatbot API:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process chat message' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}