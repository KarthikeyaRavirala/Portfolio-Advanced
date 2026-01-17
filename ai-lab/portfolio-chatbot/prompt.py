from typing import List, Dict


class PromptEngineer:
    @staticmethod
    def create_rag_prompt(query: str, context_chunks: List[Dict]) -> str:
        """Create a RAG prompt with context."""
        context_text = "\n\n".join([chunk["text"] for chunk in context_chunks])
        
        prompt = f"""
You are an AI assistant that answers questions about Karthikeya Ravirala's portfolio, skills, projects, and experience. 
Use the provided context to answer the user's question accurately. If the context doesn't contain the information needed, 
say "I don't have enough information to answer that question based on the portfolio data."

Be concise but informative in your responses. If mentioning specific projects or experiences, 
cite the relevant information from the context.

Context:
{context_text}

Question: {query}

Answer:"""
        
        return prompt.strip()
    
    @staticmethod
    def create_follow_up_prompt(previous_query: str, previous_response: str, follow_up: str) -> str:
        """Create a follow-up prompt that considers conversation history."""
        prompt = f"""
Previous question: {previous_query}
Previous answer: {previous_response}

Follow-up question: {follow_up}

Based on the previous conversation and the context provided earlier, please answer the follow-up question."""
        
        return prompt.strip()
    
    @staticmethod
    def validate_response(response: str, query: str) -> bool:
        """Basic validation to ensure response is relevant to the query."""
        # Simple validation - check if response isn't too generic
        generic_responses = [
            "i don't know", "no information", "not mentioned", 
            "not specified", "not provided"
        ]
        
        response_lower = response.lower()
        for generic in generic_responses:
            if generic in response_lower and len(response) < 100:
                return False
        
        return True