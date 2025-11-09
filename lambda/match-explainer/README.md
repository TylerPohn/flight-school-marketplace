# Flight School Match Explainer Lambda

AI-powered Lambda function that generates personalized explanations for flight school matches using Amazon Bedrock (Claude 3.5 Sonnet).

**Important Notes:**
- Uses Claude 3.5 Sonnet (`anthropic.claude-3-5-sonnet-20240620-v1:0`) - the June 2024 version
- This model works with direct foundation model invocation (no inference profiles required)
- Simple, reliable IAM permissions without marketplace subscriptions

## Prerequisites

- AWS CLI configured with credentials
- AWS account with access to Amazon Bedrock
- Node.js 18+ installed
- Bedrock model access enabled (see below)

## Quick Start

### 1. Enable Bedrock Model Access

**Via AWS Console:**
1. Go to [Amazon Bedrock Console](https://console.aws.amazon.com/bedrock/)
2. Click "Model access" in left sidebar
3. Click "Enable specific models"
4. Select **Anthropic - Claude 3.5 Sonnet**
5. Click "Request model access"
6. Wait for approval (~2 minutes)

**Via AWS CLI:**
```bash
aws bedrock list-foundation-models --region us-east-1
```

### 2. Deploy Everything

Run the automated deployment script:

```bash
./deploy.sh
```

This script will:
- ✅ Install npm dependencies
- ✅ Create deployment package
- ✅ Create IAM role with necessary permissions
- ✅ Deploy Lambda function
- ✅ Set up API Gateway
- ✅ Configure CORS
- ✅ Grant permissions

### 3. Get Your API Endpoint

After deployment, the script will output your API endpoint URL:

```
API Endpoint: https://xxxxx.execute-api.us-east-1.amazonaws.com/prod/explain-match
```

### 4. Add to Vercel

Add the environment variable to your Vercel project:

```bash
vercel env add VITE_MATCH_API_URL production
# Paste: https://xxxxx.execute-api.us-east-1.amazonaws.com/prod
```

Or via Vercel Dashboard:
- Go to Project → Settings → Environment Variables
- Add: `VITE_MATCH_API_URL` = `https://xxxxx.execute-api.us-east-1.amazonaws.com/prod`

## Testing

### Test Lambda Directly

```bash
aws lambda invoke \
  --function-name FlightSchoolMatchExplainer \
  --payload '{"body": "{\"student\": {\"trainingGoal\": \"PPL\", \"maxBudget\": 50000, \"location\": {\"city\": \"Denver\", \"state\": \"CO\", \"lat\": 39.7392, \"lon\": -104.9903}, \"trainingTypePreference\": \"Part141\", \"priorExperience\": \"None\"}, \"school\": {\"name\": \"Test Aviation\", \"location\": {\"city\": \"Aurora\", \"state\": \"CO\", \"lat\": 39.7294, \"lon\": -104.8319}, \"costBand\": {\"min\": 45000, \"max\": 60000}, \"primaryProgram\": \"PPL\", \"trainingType\": \"Part141\", \"instructorCount\": 12}, \"matchScore\": 87}"}' \
  --region us-east-1 \
  response.json

cat response.json
```

### Test API Endpoint

```bash
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

**Expected Response:**

```json
{
  "explanation": "SkyWay Aviation is an excellent 87% match for your goals. Located just 6 miles from Denver, their $45K-60K Part 141 PPL program aligns perfectly with your $50K budget. With 12 experienced instructors and structured curriculum, this school offers the professional training environment ideal for students starting their aviation journey.",
  "cached": false
}
```

## Manual Deployment

If you prefer to deploy manually:

### 1. Install Dependencies

```bash
npm install
```

### 2. Create IAM Role

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
```

### 3. Package and Deploy

```bash
# Create deployment package
zip -r function.zip index.mjs node_modules/

# Deploy
aws lambda create-function \
  --function-name FlightSchoolMatchExplainer \
  --runtime nodejs18.x \
  --role arn:aws:iam::ACCOUNT_ID:role/FlightSchoolMatchExplainerRole \
  --handler index.handler \
  --zip-file fileb://function.zip \
  --timeout 30 \
  --memory-size 512 \
  --region us-east-1
```

### 4. Create API Gateway

Follow the detailed steps in `/frontend/docs/LLM_INTEGRATION_PLAN.md` Section 2.4.

## Monitoring

### View Logs

```bash
# Tail logs in real-time
aws logs tail /aws/lambda/FlightSchoolMatchExplainer --follow --region us-east-1

# Filter for errors
aws logs filter-log-events \
  --log-group-name /aws/lambda/FlightSchoolMatchExplainer \
  --filter-pattern "ERROR" \
  --region us-east-1
```

### Check Costs

```bash
# View Bedrock invocations
aws cloudwatch get-metric-statistics \
  --namespace AWS/Bedrock \
  --metric-name Invocations \
  --dimensions Name=ModelId,Value=anthropic.claude-3-5-sonnet-20240620-v1:0 \
  --start-time 2024-01-01T00:00:00Z \
  --end-time 2024-01-31T23:59:59Z \
  --period 86400 \
  --statistics Sum \
  --region us-east-1
```

## Updating

To update the Lambda function code:

```bash
# Make changes to index.mjs
# Then re-run deployment script
./deploy.sh
```

Or manually:

```bash
zip -r function.zip index.mjs node_modules/

aws lambda update-function-code \
  --function-name FlightSchoolMatchExplainer \
  --zip-file fileb://function.zip \
  --region us-east-1
```

## Cost Breakdown

### Expected Monthly Costs (10,000 matches)

| Service | Usage | Cost |
|---------|-------|------|
| Lambda | 5K invocations × 1s avg | $0.10 |
| API Gateway | 5K requests | $1.75 |
| CloudWatch Logs | ~500MB logs | $0.25 |
| Bedrock (Claude 3.5 Sonnet) | 5K × 250 tokens output | ~$37.50 |
| **Total** | | **~$40/month** |

## Troubleshooting

### "Access Denied" Error

Check Bedrock model access:
```bash
aws bedrock list-foundation-models --region us-east-1
```

Verify IAM permissions:
```bash
aws iam get-role-policy \
  --role-name FlightSchoolMatchExplainerRole \
  --policy-name BedrockAndLogsPolicy
```

### CORS Errors

Verify CORS headers are being returned:
```bash
curl -v -X OPTIONS https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/prod/explain-match
```

### Lambda Timeout

Increase timeout:
```bash
aws lambda update-function-configuration \
  --function-name FlightSchoolMatchExplainer \
  --timeout 30 \
  --region us-east-1
```

## Architecture

```
Frontend (Vercel)
    ↓
API Gateway
    ↓
Lambda Function
    ↓
Amazon Bedrock (Claude 3.5 Sonnet)
    ↓
AI-Generated Explanation
```

## Files

- `index.mjs` - Lambda function handler
- `package.json` - Node.js dependencies
- `deploy.sh` - Automated deployment script
- `lambda-trust-policy.json` - IAM trust policy
- `lambda-permissions.json` - IAM permissions policy

## Support

For issues or questions, check:
- CloudWatch Logs for Lambda errors
- API Gateway execution logs
- AWS Bedrock model access status
- IAM role permissions

---

**Last Updated:** 2024-01-XX
**Version:** 1.0.0
