from sentence_transformers import SentenceTransformer
import numpy as np
from typing import List


class EmbeddingService:
    def __init__(self):
        # Using a lightweight model for embeddings
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
    
    def encode_text(self, text: str) -> np.ndarray:
        """Encode a single text string into an embedding vector."""
        return self.model.encode([text])[0]
    
    def encode_texts(self, texts: List[str]) -> np.ndarray:
        """Encode multiple text strings into embedding vectors."""
        return self.model.encode(texts)
    
    def cosine_similarity(self, vec1: np.ndarray, vec2: np.ndarray) -> float:
        """Calculate cosine similarity between two vectors."""
        dot_product = np.dot(vec1, vec2)
        norm_vec1 = np.linalg.norm(vec1)
        norm_vec2 = np.linalg.norm(vec2)
        if norm_vec1 == 0 or norm_vec2 == 0:
            return 0.0
        return dot_product / (norm_vec1 * norm_vec2)