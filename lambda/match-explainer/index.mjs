import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';

const bedrock = new BedrockRuntimeClient({ region: 'us-east-1' });

export const handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  try {
    // Parse request body
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    const { student, school, matchScore } = body;

    // Validate input
    if (!student || !school || matchScore === undefined) {
      return {
        statusCode: 400,
        headers: corsHeaders(),
        body: JSON.stringify({
          error: 'Missing required fields: student, school, matchScore'
        })
      };
    }

    // Build prompt
    const prompt = buildPrompt(student, school, matchScore);
    console.log('Generated prompt');

    // Call Bedrock
    const command = new InvokeModelCommand({
      modelId: 'anthropic.claude-3-5-sonnet-20240620-v1:0',
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        anthropic_version: 'bedrock-2023-05-31',
        max_tokens: 250,
        temperature: 0.7,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    });

    const response = await bedrock.send(command);
    const result = JSON.parse(new TextDecoder().decode(response.body));
    const explanation = result.content[0].text;

    console.log('Generated explanation:', explanation);

    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: JSON.stringify({
        explanation,
        cached: false
      })
    };

  } catch (error) {
    console.error('Error:', error);

    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({
        error: 'Failed to generate explanation',
        message: error.message,
        fallback: true
      })
    };
  }
};

function buildPrompt(student, school, matchScore) {
  const distance = calculateDistance(
    student.location?.lat,
    student.location?.lon,
    school.location?.lat,
    school.location?.lon
  );

  return `You are an expert flight training advisor. Generate a personalized, conversational explanation for why this school matches this student.

Student Profile:
- Primary Goal: ${student.trainingGoal}
- Budget: $${student.maxBudget?.toLocaleString()}
- Location: ${student.location?.city}, ${student.location?.state}
- Preferred Training Type: ${student.trainingTypePreference}
- Prior Experience: ${student.priorExperience}

School Details:
- Name: ${school.name}
- Location: ${school.location?.city}, ${school.location?.state} (${Math.round(distance)} miles away)
- Cost Range: $${school.costBand?.min?.toLocaleString()} - $${school.costBand?.max?.toLocaleString()}
- Primary Program: ${school.primaryProgram}
- Training Type: ${school.trainingType}
- Instructors: ${school.instructorCount}

Match Score: ${matchScore}%

Write a 2-3 sentence explanation of why this is a ${getMatchQuality(matchScore)} match. Be specific about:
1. How the location/distance fits their needs
2. How the cost aligns with their budget
3. How the program matches their goals

Sound professional but warm and encouraging. Do not use phrases like "I think" or "I believe" - be direct and confident.`;
}

function getMatchQuality(score) {
  if (score >= 90) return 'exceptional';
  if (score >= 85) return 'excellent';
  if (score >= 75) return 'very good';
  if (score >= 65) return 'good';
  return 'decent';
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 999999;

  const R = 3959; // Earth radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function corsHeaders() {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}
