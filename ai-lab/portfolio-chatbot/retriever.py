import json
from typing import List, Dict
from pathlib import Path

import numpy as np

from ai_lab.shared.embeddings import EmbeddingService


class PortfolioRetriever:
    def __init__(self):
        self.embedding_service = EmbeddingService()
        self.chunks = self._load_chunks()
    
    def _load_chunks(self) -> List[Dict]:
        """Load pre-embedded chunks from JSON file."""
        chunks_path = Path(__file__).parent / "portfolio_chunks.json"
        if chunks_path.exists():
            with open(chunks_path, 'r') as f:
                chunks = json.load(f)
            # Convert embedding lists back to numpy arrays
            for chunk in chunks:
                chunk["embedding"] = np.array(chunk["embedding"])
            return chunks
        else:
            # If no chunks exist, return empty list
            return []
    
    def retrieve_relevant_chunks(self, query: str, top_k: int = 3) -> List[Dict]:
        """Retrieve the most relevant chunks for a query."""
        if not self.chunks:
            return []
        
        # Embed the query
        query_embedding = self.embedding_service.encode_text(query)
        
        # Calculate similarity scores
        similarities = []
        for chunk in self.chunks:
            similarity = self.embedding_service.cosine_similarity(
                query_embedding, chunk["embedding"]
            )
            similarities.append((chunk, similarity))
        
        # Sort by similarity and return top_k
        similarities.sort(key=lambda x: x[1], reverse=True)
        return [chunk for chunk, _ in similarities[:top_k]]
    
    def add_chunk(self, chunk: Dict):
        """Add a new chunk to the collection."""
        chunk["embedding"] = self.embedding_service.encode_text(chunk["text"]).tolist()
        chunk["embedding"] = np.array(chunk["embedding"])
        self.chunks.append(chunk)
    
    def refresh_chunks(self):
        """Reload chunks from file."""
        self.chunks = self._load_chunks()