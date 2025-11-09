# LLM Integration Plan for Find A Flight School

## Overview

This document outlines the plan to replace template-based match explanations with AI-generated explanations using Amazon Bedrock (Claude). The current system uses a deterministic scoring algorithm with templated explanations. We'll keep the scoring algorithm but enhance it with LLM-generated natural language explanations.

---

## Architecture

```
Frontend (React/Vercel)
    ↓
API Gateway (AWS)
    ↓
Lambda Function (Node.js)
    ↓
Amazon Bedrock (Claude 3.5 Sonnet)
    ↓
Returns personalized explanation
    ↓
Display in MatchResults component
```

---

## Prerequisites

Before starting, ensure you have:

- [ ] AWS Account with access to Amazon Bedrock
- [ ] AWS CLI configured locally
- [ ] IAM permissions to create Lambda functions, API Gateway, and invoke Bedrock
- [ ] Node.js 18+ installed
- [ ] Existing frontend deployed to Vercel (or ready to deploy)

---

## Phase 1: Deploy Current Frontend to Vercel

### Step 1.1: Prepare Frontend for Deployment

**Create `vercel.json`:**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Update `package.json` scripts (if needed):**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

### Step 1.2: Deploy to Vercel

**Option A: Using Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to project directory
cd /Users/tyler/Desktop/Gauntlet/flight-school-marketplace/frontend

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name? find-a-flight-school
# - Directory? ./
# - Override settings? No

# Deploy to production
vercel --prod
```

**Option B: Using Vercel Dashboard**

1. Go to https://vercel.com/new
2. Import Git Repository or upload project
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click "Deploy"
5. Note your deployment URL (e.g., `https://find-a-flight-school.vercel.app`)

### Step 1.3: Verify Deployment

- [ ] Visit your Vercel URL
- [ ] Test navigation between pages
- [ ] Complete the AI matching quiz
- [ ] Verify template explanations are showing
- [ ] Test comparison and financing features

**Expected Result:** Fully functional site with current template-based explanations

---

## Phase 2: AWS Backend Setup

### Step 2.1: Enable Amazon Bedrock Access

**Via AWS Console:**

1. Go to AWS Console → Amazon Bedrock
2. Click "Model access" in left sidebar
3. Click "Enable specific models"
4. Select: **Anthropic - Claude 3.5 Sonnet**
5. Click "Request model access"
6. Wait for approval (~2 minutes)

**Via AWS CLI:**

```bash
aws bedrock put-model-invocation-logging-configuration \
  --region us-east-1
```

### Step 2.2: Create IAM Role for Lambda

**Create trust policy file `lambda-trust-policy.json`:**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

**Create permissions policy file `lambda-permissions.json`:**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel"
      ],
      "Resource": "arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0"
    },
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    }
  ]
}
```

**Create the IAM role:**

```bash
# Create role
aws iam create-role \
  --role-name FlightSchoolMatchExplainerRole \
  --assume-role-policy-document file://lambda-trust-policy.json

# Attach permissions
aws iam put-role-policy \
  --role-name FlightSchoolMatchExplainerRole \
  --policy-name BedrockAndLogsPolicy \
  --policy-document file://lambda-permissions.json

# Get role ARN (save this for later)
aws iam get-role \
  --role-name FlightSchoolMatchExplainerRole \
  --query 'Role.Arn' \
  --output text
```

**Save the ARN:** `arn:aws:iam::ACCOUNT_ID:role/FlightSchoolMatchExplainerRole`

### Step 2.3: Create Lambda Function

**Create directory structure:**

```bash
mkdir -p lambda/match-explainer
cd lambda/match-explainer
```

**Create `package.json`:**

```json
{
  "name": "match-explainer",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "@aws-sdk/client-bedrock-runtime": "^3.485.0"
  }
}
```

**Create `index.mjs`:**

```javascript
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
      modelId: 'anthropic.claude-3-sonnet-20240229-v1:0',
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
```

**Install dependencies and package:**

```bash
npm install

# Create deployment package
zip -r function.zip index.mjs node_modules/
```

**Deploy Lambda function:**

```bash
# Create function (replace ROLE_ARN with your actual ARN)
aws lambda create-function \
  --function-name FlightSchoolMatchExplainer \
  --runtime nodejs18.x \
  --role arn:aws:iam::ACCOUNT_ID:role/FlightSchoolMatchExplainerRole \
  --handler index.handler \
  --zip-file fileb://function.zip \
  --timeout 30 \
  --memory-size 512 \
  --region us-east-1

# Test function
aws lambda invoke \
  --function-name FlightSchoolMatchExplainer \
  --payload '{"body": "{\"student\": {\"trainingGoal\": \"PPL\", \"maxBudget\": 50000, \"location\": {\"city\": \"Denver\", \"state\": \"CO\", \"lat\": 39.7392, \"lon\": -104.9903}, \"trainingTypePreference\": \"Part141\", \"priorExperience\": \"None\"}, \"school\": {\"name\": \"Test Aviation\", \"location\": {\"city\": \"Aurora\", \"state\": \"CO\", \"lat\": 39.7294, \"lon\": -104.8319}, \"costBand\": {\"min\": 45000, \"max\": 60000}, \"primaryProgram\": \"PPL\", \"trainingType\": \"Part141\", \"instructorCount\": 12}, \"matchScore\": 87}"}' \
  --region us-east-1 \
  response.json

cat response.json
```

### Step 2.4: Create API Gateway

**Create REST API:**

```bash
# Create API
API_ID=$(aws apigateway create-rest-api \
  --name "FlightSchoolMatchAPI" \
  --description "API for AI-powered flight school matching" \
  --endpoint-configuration types=REGIONAL \
  --region us-east-1 \
  --query 'id' \
  --output text)

echo "API ID: $API_ID"

# Get root resource ID
ROOT_ID=$(aws apigateway get-resources \
  --rest-api-id $API_ID \
  --region us-east-1 \
  --query 'items[0].id' \
  --output text)

# Create /explain-match resource
RESOURCE_ID=$(aws apigateway create-resource \
  --rest-api-id $API_ID \
  --parent-id $ROOT_ID \
  --path-part "explain-match" \
  --region us-east-1 \
  --query 'id' \
  --output text)

# Create POST method
aws apigateway put-method \
  --rest-api-id $API_ID \
  --resource-id $RESOURCE_ID \
  --http-method POST \
  --authorization-type NONE \
  --region us-east-1

# Create OPTIONS method for CORS
aws apigateway put-method \
  --rest-api-id $API_ID \
  --resource-id $RESOURCE_ID \
  --http-method OPTIONS \
  --authorization-type NONE \
  --region us-east-1

# Get Lambda ARN
LAMBDA_ARN=$(aws lambda get-function \
  --function-name FlightSchoolMatchExplainer \
  --region us-east-1 \
  --query 'Configuration.FunctionArn' \
  --output text)

# Get AWS Account ID
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

# Integrate POST with Lambda
aws apigateway put-integration \
  --rest-api-id $API_ID \
  --resource-id $RESOURCE_ID \
  --http-method POST \
  --type AWS_PROXY \
  --integration-http-method POST \
  --uri "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/${LAMBDA_ARN}/invocations" \
  --region us-east-1

# Set up OPTIONS method response for CORS
aws apigateway put-method-response \
  --rest-api-id $API_ID \
  --resource-id $RESOURCE_ID \
  --http-method OPTIONS \
  --status-code 200 \
  --response-parameters \
    method.response.header.Access-Control-Allow-Headers=true,\
method.response.header.Access-Control-Allow-Methods=true,\
method.response.header.Access-Control-Allow-Origin=true \
  --region us-east-1

aws apigateway put-integration \
  --rest-api-id $API_ID \
  --resource-id $RESOURCE_ID \
  --http-method OPTIONS \
  --type MOCK \
  --request-templates '{"application/json": "{\"statusCode\": 200}"}' \
  --region us-east-1

aws apigateway put-integration-response \
  --rest-api-id $API_ID \
  --resource-id $RESOURCE_ID \
  --http-method OPTIONS \
  --status-code 200 \
  --response-parameters \
    method.response.header.Access-Control-Allow-Headers="'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",\
method.response.header.Access-Control-Allow-Methods="'POST,OPTIONS'",\
method.response.header.Access-Control-Allow-Origin="'*'" \
  --region us-east-1

# Grant API Gateway permission to invoke Lambda
aws lambda add-permission \
  --function-name FlightSchoolMatchExplainer \
  --statement-id apigateway-invoke \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:us-east-1:${ACCOUNT_ID}:${API_ID}/*/*/explain-match" \
  --region us-east-1

# Deploy API
aws apigateway create-deployment \
  --rest-api-id $API_ID \
  --stage-name prod \
  --region us-east-1

# Get API endpoint
echo "API Endpoint: https://${API_ID}.execute-api.us-east-1.amazonaws.com/prod/explain-match"
```

**Save your API endpoint URL!**

### Step 2.5: Test API Endpoint

```bash
# Test with curl
curl -X POST https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/prod/explain-match \
  -H "Content-Type: application/json" \
  -d '{
    "student": {
      "trainingGoal": "PPL",
      "maxBudget": 50000,
      "location": {"city": "Denver", "state": "CO", "lat": 39.7392, "lon": -104.9903},
      "trainingTypePreference": "Part141",
      "priorExperience": "None"
    },
    "school": {
      "name": "SkyWay Aviation",
      "location": {"city": "Aurora", "state": "CO", "lat": 39.7294, "lon": -104.8319},
      "costBand": {"min": 45000, "max": 60000},
      "primaryProgram": "PPL",
      "trainingType": "Part141",
      "instructorCount": 12
    },
    "matchScore": 87
  }'
```

**Expected response:**

```json
{
  "explanation": "SkyWay Aviation is an excellent 87% match for your goals. Located just 6 miles from Denver, their $45K-60K Part 141 PPL program aligns perfectly with your $50K budget. With 12 experienced instructors and structured curriculum, this school offers the professional training environment ideal for students starting their aviation journey."
}
```

---

## Phase 3: Frontend Integration

### Step 3.1: Add Environment Variable to Vercel

**Via Vercel Dashboard:**

1. Go to your project in Vercel
2. Settings → Environment Variables
3. Add new variable:
   - **Name**: `VITE_MATCH_API_URL`
   - **Value**: `https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/prod`
   - **Environments**: Production, Preview, Development
4. Save

**Via Vercel CLI:**

```bash
vercel env add VITE_MATCH_API_URL production
# Paste: https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/prod

vercel env add VITE_MATCH_API_URL preview
vercel env add VITE_MATCH_API_URL development
```

### Step 3.2: Create `.env.local` for Local Development

```bash
# In frontend directory
echo "VITE_MATCH_API_URL=https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/prod" > .env.local
```

### Step 3.3: Create API Service

**Create `/src/services/matchApi.ts`:**

```typescript
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
    id: string;
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
  fallback?: boolean;
  cached?: boolean;
}

export async function explainMatch(request: ExplainMatchRequest): Promise<string> {
  if (!API_BASE_URL) {
    throw new Error('VITE_MATCH_API_URL environment variable not set');
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
      const error = await response.json().catch(() => ({}));
      throw new Error(`API error: ${response.status} - ${error.message || 'Unknown error'}`);
    }

    const data: ExplainMatchResponse = await response.json();
    return data.explanation;
  } catch (error) {
    console.error('Failed to get LLM explanation:', error);
    throw error;
  }
}
```

### Step 3.4: Update Matching Logic

**Modify `/src/utils/mockAIMatching.ts`:**

```typescript
import type { MatchProfile, MockSchool, RankedSchool, Location } from '../types/matchProfile';
import { explainMatch } from '../services/matchApi';

// Keep existing calculateDistance function...
// Keep existing calculateMatchScore function...

/**
 * Rank all schools based on match score
 * Now with async LLM explanations
 */
export async function rankSchools(profile: MatchProfile, schools: MockSchool[]): Promise<RankedSchool[]> {
  const rankedSchools: RankedSchool[] = schools
    .map((school) => {
      const matchScore = calculateMatchScore(profile, school);
      const distance = calculateDistance(profile.location, school.location);

      return {
        school,
        matchScore,
        explanation: '', // Will be filled by LLM
        ranking: 0,
        distance,
      };
    })
    .filter((rankedSchool) => {
      const maxDistance = profile.searchRadius * 1.5;
      return rankedSchool.distance <= maxDistance;
    });

  // Sort by score descending
  rankedSchools.sort((a, b) => b.matchScore - a.matchScore);

  // Limit to top 10
  const topSchools = rankedSchools.slice(0, 10);

  // Assign rankings
  topSchools.forEach((rankedSchool, index) => {
    rankedSchool.ranking = index + 1;
  });

  // Generate LLM explanations in parallel
  await generateExplanations(topSchools, profile);

  return topSchools;
}

/**
 * Generate AI explanations for all ranked schools
 * Calls LLM API with fallback to templates
 */
async function generateExplanations(rankedSchools: RankedSchool[], profile: MatchProfile): Promise<void> {
  const explanationPromises = rankedSchools.map(async (rankedSchool) => {
    try {
      const explanation = await explainMatch({
        student: {
          trainingGoal: profile.trainingGoal,
          maxBudget: profile.maxBudget,
          location: profile.location,
          trainingTypePreference: profile.trainingTypePreference,
          priorExperience: profile.priorExperience,
        },
        school: {
          id: rankedSchool.school.id,
          name: rankedSchool.school.name,
          location: rankedSchool.school.location,
          costBand: rankedSchool.school.costBand,
          primaryProgram: rankedSchool.school.primaryProgram,
          instructorCount: rankedSchool.school.instructorCount,
          trainingType: rankedSchool.school.trainingType,
        },
        matchScore: rankedSchool.matchScore,
      });

      rankedSchool.explanation = explanation;
    } catch (error) {
      // Fallback to template if LLM fails
      console.warn(`LLM failed for ${rankedSchool.school.name}, using fallback template`);
      rankedSchool.explanation = generateMatchExplanation(
        rankedSchool.school,
        profile,
        rankedSchool.matchScore
      );
    }
  });

  await Promise.all(explanationPromises);
}

// Keep existing generateMatchExplanation function as fallback...
```

### Step 3.5: Update Hook to Handle Async

**Modify `/src/hooks/useMatchingWizard.ts`:**

```typescript
import { useState } from 'react';
import type { MatchProfile, RankedSchool } from '../types/matchProfile';
import { rankSchools } from '../utils/mockAIMatching';
import { MOCK_SCHOOLS } from '../mock/mockSchools';

export function useMatchingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<MatchProfile>>({});
  const [results, setResults] = useState<RankedSchool[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const updateFormData = (data: Partial<MatchProfile>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const submitQuestionnaire = async (finalData: MatchProfile) => {
    setFormData(finalData);
    setIsLoading(true);
    setError(null);

    try {
      // Now async - calls LLM for explanations
      const rankedResults = await rankSchools(finalData, MOCK_SCHOOLS);
      setResults(rankedResults);
      return rankedResults;
    } catch (err) {
      console.error('Error ranking schools:', err);
      setError('Failed to generate match results. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setFormData({});
    setResults(null);
    setError(null);
  };

  return {
    currentStep,
    formData,
    results,
    isLoading,
    error,
    nextStep,
    prevStep,
    updateFormData,
    submitQuestionnaire,
    reset,
  };
}
```

### Step 3.6: Update AIMatchingPage

**Modify `/src/pages/AIMatchingPage.tsx`:**

Add error handling to the `handleSubmit` function (around line 129):

```typescript
const handleSubmit = async () => {
  const isValid = await stepFourForm.trigger();
  if (!isValid) return;

  setIsSubmitting(true);

  const finalData: MatchProfile = {
    ...formData,
    ...stepOneForm.getValues(),
    ...stepTwoForm.getValues(),
    ...stepThreeForm.getValues(),
    ...stepFourForm.getValues(),
  } as MatchProfile;

  try {
    // Submit and wait for LLM explanations
    await submitQuestionnaire(finalData);

    // Show loading animation for 3 seconds
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/find-my-school/results');
    }, 3000);
  } catch (error) {
    console.error('Matching failed:', error);
    setIsSubmitting(false);
    // Error will be shown in results page via error state
    navigate('/find-my-school/results');
  }
};
```

### Step 3.7: Add Error Display in Results

**Update `/src/components/matching/MatchResults.tsx`:**

Add error handling at the top of the component (after line 28):

```typescript
export function MatchResults({ results, onRefine }: MatchResultsProps) {
  const getScoreColor = (score: number): string => {
    // ... existing code ...
  };

  const getTrustTierColor = (tier: string): 'success' | 'info' | 'default' => {
    // ... existing code ...
  };

  // Add error display if no results
  if (!results || results.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="body1">
            We couldn't find any matching schools. This might be due to:
          </Typography>
          <ul>
            <li>Very restrictive search criteria</li>
            <li>Limited schools in your selected location</li>
          </ul>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Try adjusting your preferences or expanding your search radius.
          </Typography>
        </Alert>
        {onRefine && (
          <Button variant="contained" onClick={onRefine}>
            Refine Search
          </Button>
        )}
      </Container>
    );
  }

  return (
    // ... existing return JSX ...
  );
}
```

### Step 3.8: Deploy Updated Frontend

```bash
# Test locally first
npm run dev
# Visit http://localhost:5173 and test the matching flow

# Commit changes
git add .
git commit -m "Add LLM-powered match explanations"

# Deploy to Vercel
vercel --prod

# Or if using Git integration, just push:
git push origin main
```

---

## Phase 4: Testing & Verification

### Step 4.1: Test Complete Flow

**Checklist:**

- [ ] Visit your Vercel production URL
- [ ] Start the matching quiz
- [ ] Fill out all 4 steps with realistic data:
  - Goal: PPL
  - Budget: $50,000
  - Location: Denver, CO (or a city with nearby schools)
  - Preferences: Select some options
- [ ] Submit the quiz
- [ ] Verify the 3-second loading animation shows
- [ ] On results page, verify:
  - Match scores are showing (65-94% range)
  - Schools are sorted by score (descending)
  - Top 10 schools maximum
  - **Explanations are unique and contextual** (not templated)
  - Each explanation references specific details about the student and school

### Step 4.2: Verify LLM Explanations

**Signs it's working:**

✅ **Good (LLM-generated):**
- "SkyWay Aviation is an excellent 87% match. Located just 6 miles from your location in Denver, their $45K-60K Part 141 program fits perfectly within your $50K budget..."
- Unique for each school
- Natural, conversational language
- References specific numbers (distance, costs)

❌ **Bad (Template fallback):**
- "SkyWay Aviation is your top match. It checks all the boxes: located in Aurora, CO (6 miles away), priced at $45,000-$60,000..."
- Same structure for multiple schools
- More rigid, formulaic language

### Step 4.3: Monitor AWS Costs

**Set up billing alerts:**

```bash
# Create SNS topic for billing alerts
aws sns create-topic --name BillingAlerts

# Subscribe your email
aws sns subscribe \
  --topic-arn arn:aws:sns:us-east-1:ACCOUNT_ID:BillingAlerts \
  --protocol email \
  --notification-endpoint your-email@example.com

# Create CloudWatch alarm (in us-east-1)
aws cloudwatch put-metric-alarm \
  --alarm-name "HighBedrockCosts" \
  --alarm-description "Alert when Bedrock costs exceed $50" \
  --metric-name EstimatedCharges \
  --namespace AWS/Billing \
  --statistic Maximum \
  --period 21600 \
  --evaluation-periods 1 \
  --threshold 50 \
  --comparison-operator GreaterThanThreshold \
  --alarm-actions arn:aws:sns:us-east-1:ACCOUNT_ID:BillingAlerts \
  --dimensions Name=ServiceName,Value=AmazonBedrock
```

### Step 4.4: Check Lambda Logs

```bash
# View recent Lambda logs
aws logs tail /aws/lambda/FlightSchoolMatchExplainer --follow --region us-east-1

# Check for errors
aws logs filter-log-events \
  --log-group-name /aws/lambda/FlightSchoolMatchExplainer \
  --filter-pattern "ERROR" \
  --region us-east-1
```

### Step 4.5: Performance Testing

**Test response times:**

```bash
# Time API response
time curl -X POST https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/prod/explain-match \
  -H "Content-Type: application/json" \
  -d @test-payload.json

# Expected: 800ms - 2s for first call (cold start)
# Expected: 200ms - 800ms for warm calls
```

---

## Phase 5: Optimization (Optional)

### Step 5.1: Add Response Caching

**Update Lambda to use in-memory cache:**

```javascript
// At top of index.mjs
const cache = new Map();
const CACHE_TTL = 3600000; // 1 hour in ms

export const handler = async (event) => {
  const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
  const { student, school, matchScore } = body;

  // Generate cache key
  const cacheKey = `${school.id}-${student.trainingGoal}-${student.maxBudget}-${matchScore}`;

  // Check cache
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    console.log('Returning cached explanation');
    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: JSON.stringify({
        explanation: cached.explanation,
        cached: true
      })
    };
  }

  // ... rest of function ...

  // Store in cache before returning
  cache.set(cacheKey, {
    explanation,
    timestamp: Date.now()
  });

  return response;
};
```

### Step 5.2: Add CloudWatch Dashboard

Monitor your matching system with a dashboard:

1. Go to CloudWatch → Dashboards
2. Create new dashboard: "FlightSchoolMatching"
3. Add widgets:
   - Lambda invocations (FlightSchoolMatchExplainer)
   - Lambda errors
   - Lambda duration
   - API Gateway 4XX/5XX errors
   - Bedrock model invocations

---

## Troubleshooting

### Issue: "Access Denied" when calling Bedrock

**Solution:**
```bash
# Verify model access
aws bedrock list-foundation-models --region us-east-1

# Check IAM permissions
aws iam get-role-policy \
  --role-name FlightSchoolMatchExplainerRole \
  --policy-name BedrockAndLogsPolicy
```

### Issue: CORS errors in browser console

**Solution:**
- Verify OPTIONS method is set up on API Gateway
- Check CORS headers are being returned from Lambda
- Test with `curl -v` to see actual headers

### Issue: Explanations are still templated

**Solution:**
```bash
# Check environment variable is set
vercel env ls

# Test API directly
curl -X POST https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/prod/explain-match \
  -H "Content-Type: application/json" \
  -d @test-payload.json

# Check browser network tab to see if API is being called
```

### Issue: Lambda timeout

**Solution:**
```bash
# Increase Lambda timeout to 30 seconds
aws lambda update-function-configuration \
  --function-name FlightSchoolMatchExplainer \
  --timeout 30 \
  --region us-east-1
```

### Issue: High costs

**Check usage:**
```bash
# View Bedrock invocations
aws cloudwatch get-metric-statistics \
  --namespace AWS/Bedrock \
  --metric-name Invocations \
  --dimensions Name=ModelId,Value=anthropic.claude-3-sonnet-20240229-v1:0 \
  --start-time 2024-01-01T00:00:00Z \
  --end-time 2024-01-31T23:59:59Z \
  --period 86400 \
  --statistics Sum \
  --region us-east-1
```

**Solutions:**
- Add caching (Step 5.1)
- Rate limit requests
- Use cheaper model (Claude Haiku instead of Sonnet)

---

## Cost Breakdown

### Expected Monthly Costs (10,000 matches)

| Service | Usage | Cost |
|---------|-------|------|
| Lambda | 10K invocations × 1s avg | $0.20 |
| API Gateway | 10K requests | $3.50 |
| CloudWatch Logs | ~1GB logs | $0.50 |
| Bedrock (Claude Sonnet) | 10K × 250 tokens output | ~$150 |
| **Total** | | **~$154/month** |

### Cost Optimization Options

**Option 1: Use Claude Haiku (faster, cheaper)**
- Cost: ~$25/month (instead of $150)
- Trade-off: Slightly less sophisticated explanations

**Option 2: Add aggressive caching**
- Estimated savings: 60-80% (cache hit rate dependent)
- Cost: ~$30-60/month

**Option 3: Batch explanations**
- Generate explanations only for top 5 schools
- Cost: ~$75/month

---

## Next Steps After Deployment

1. **Collect User Feedback**
   - Add thumbs up/down on explanations
   - Track which explanations users engage with

2. **A/B Testing**
   - Show 50% users LLM explanations
   - Show 50% users template explanations
   - Measure engagement and conversion

3. **Analytics**
   - Track API response times
   - Monitor error rates
   - Measure user satisfaction

4. **Iterate Prompts**
   - Refine prompt based on feedback
   - Test different explanation styles
   - Optimize for conversion

---

## Rollback Plan

If issues arise, you can quickly revert:

```bash
# Option 1: Disable LLM, use templates
vercel env rm VITE_MATCH_API_URL production

# Redeploy frontend
vercel --prod

# Option 2: Keep both, add feature flag
# Add to .env:
# VITE_ENABLE_LLM_EXPLANATIONS=false
```

---

## Appendix

### A. Useful AWS CLI Commands

```bash
# Update Lambda code
aws lambda update-function-code \
  --function-name FlightSchoolMatchExplainer \
  --zip-file fileb://function.zip \
  --region us-east-1

# View Lambda logs
aws logs tail /aws/lambda/FlightSchoolMatchExplainer --follow

# Test API Gateway
aws apigateway test-invoke-method \
  --rest-api-id YOUR_API_ID \
  --resource-id YOUR_RESOURCE_ID \
  --http-method POST \
  --body '{"student": {...}, "school": {...}, "matchScore": 87}'

# Get API Gateway URL
aws apigateway get-rest-api \
  --rest-api-id YOUR_API_ID \
  --query 'name,id'
```

### B. Example Test Payloads

**`test-payload.json`:**

```json
{
  "student": {
    "trainingGoal": "PPL",
    "maxBudget": 50000,
    "location": {
      "city": "Denver",
      "state": "CO",
      "lat": 39.7392,
      "lon": -104.9903
    },
    "trainingTypePreference": "Part141",
    "priorExperience": "None"
  },
  "school": {
    "id": "school-001",
    "name": "SkyWay Aviation Academy",
    "location": {
      "city": "Aurora",
      "state": "CO",
      "lat": 39.7294,
      "lon": -104.8319
    },
    "costBand": {
      "min": 45000,
      "max": 60000
    },
    "primaryProgram": "PPL",
    "trainingType": "Part141",
    "instructorCount": 12
  },
  "matchScore": 87
}
```

### C. Environment Variables Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_MATCH_API_URL` | API Gateway base URL | `https://abc123.execute-api.us-east-1.amazonaws.com/prod` |

---

## Support

For issues or questions:
- Check CloudWatch Logs for Lambda errors
- Review API Gateway execution logs
- Test endpoints directly with curl
- Verify IAM permissions
- Check Bedrock model access

---

**Document Version:** 1.0
**Last Updated:** 2024-01-XX
**Author:** Development Team
**Status:** Ready for Implementation
