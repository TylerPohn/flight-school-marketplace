/**
 * API Service for Match Explanations
 * Calls AWS Lambda + Bedrock for AI-generated explanations
 */

const API_BASE_URL = import.meta.env.VITE_MATCH_API_URL || '';

export interface ExplainMatchRequest {
  student: {
    trainingGoal: string;
    maxBudget: number;
    location: {
      city: string;
      state: string;
      lat?: number;
      lon?: number;
    };
    trainingTypePreference: string;
    priorExperience: string;
  };
  school: {
    name: string;
    location: {
      city: string;
      state: string;
      lat?: number;
      lon?: number;
    };
    costBand: { min: number; max: number };
    primaryProgram: string;
    instructorCount: number;
    trainingType: string;
  };
  matchScore: number;
}

export interface ExplainMatchResponse {
  explanation: string;
  cached?: boolean;
}

/**
 * Call Lambda API to get AI-generated match explanation
 * Falls back to null if API unavailable (caller should use template)
 */
export async function getAIExplanation(request: ExplainMatchRequest): Promise<string | null> {
  // If no API URL configured, return null (use template fallback)
  if (!API_BASE_URL) {
    console.warn('VITE_MATCH_API_URL not configured - using template explanations');
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/explain-match`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      console.error('Match API error:', response.status, response.statusText);
      return null;
    }

    const data: ExplainMatchResponse = await response.json();
    return data.explanation;
  } catch (error) {
    console.error('Failed to get AI explanation:', error);
    return null; // Fall back to template
  }
}
