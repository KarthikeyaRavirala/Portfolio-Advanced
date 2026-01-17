import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Check if this is a development environment
    // In production, you'd want to connect to your actual backend service
    if (process.env.NODE_ENV === 'development' || !process.env.AI_API_URL) {
      // Return mock response for development or when no backend is configured
      console.log('Using mock response for resume analysis');
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return new Response(
        JSON.stringify({
          resume_info: {
            total_skills_found: 24,
            skills_by_category: {
              programming: ['Python', 'JavaScript', 'React', 'Next.js', 'TypeScript', 'SQL'],
              ai_ml: ['Machine Learning', 'NLP', 'Computer Vision', 'TensorFlow', 'PyTorch'],
              soft: ['Leadership', 'Communication', 'Problem Solving']
            },
            experience_info: { years_experience: '2' }
          },
          skill_analysis: {
            'AI Engineer': {
              matching_skills: ['Machine Learning', 'Python', 'TensorFlow', 'PyTorch', 'NLP', 'Computer Vision'],
              missing_skills: ['LLM', 'Transformers', 'Prompt Engineering', 'RAG'],
              match_percentage: 60
            },
            'ML Engineer': {
              matching_skills: ['Machine Learning', 'Python', 'TensorFlow', 'PyTorch', 'Data Science'],
              missing_skills: ['MLOps', 'Model Deployment', 'AWS', 'Docker', 'Kubernetes'],
              match_percentage: 55
            }
          },
          suggestions: [
            {
              job_role: 'AI Engineer',
              missing_count: 4,
              top_missing_skills: ['LLM', 'Transformers', 'Prompt Engineering', 'RAG'],
              suggestion: 'Focus on acquiring 4 key skills for AI Engineer role'
            }
          ],
          scoring_result: {
            semantic_similarity: 0.72,
            keyword_match_percentage: 68,
            composite_score: 70,
            keyword_matches: 42,
            total_job_keywords: 62
          },
          improvement_tips: [
            'Include more keywords from the job description in your resume',
            'Highlight relevant experience that matches the job requirements',
            'For AI Engineer role: Focus on developing 4 key skills',
            'Key missing skills for AI Engineer: LLM, Transformers, Prompt Engineering'
          ]
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
    const formData = await req.formData();
    const response = await fetch(`${process.env.AI_API_URL}/resume/analyze-resume/`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in resume analysis API:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to analyze resume' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}