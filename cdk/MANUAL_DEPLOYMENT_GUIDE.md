# Manual CloudFormation Deployment Guide

Since CDK deployment is blocked, you can deploy manually via the AWS Console.

## Files Ready for Deployment

1. **CloudFormation Template**: `/cdk/cloudformation-template.yaml`
2. **Lambda Code ZIP**: `/lambda/match-explainer-code.zip` (2.9 MB)

## Step-by-Step Deployment

### Step 1: Upload Lambda Code to S3

The CloudFormation template has a placeholder Lambda code. You need to either:

**Option A: Upload to S3 (Recommended)**
```bash
# Create S3 bucket for Lambda code
aws s3 mb s3://flight-school-lambda-code-$(date +%s) --region us-east-1

# Upload ZIP file
aws s3 cp /lambda/match-explainer-code.zip s3://YOUR-BUCKET-NAME/match-explainer-code.zip
```

Then update the CloudFormation template Lambda code section:
```yaml
Code:
  S3Bucket: YOUR-BUCKET-NAME
  S3Key: match-explainer-code.zip
```

**Option B: Deploy Lambda First, Then Update Stack**

1. Deploy the CloudFormation stack as-is (with placeholder code)
2. Upload the actual code via AWS Console or CLI:
```bash
aws lambda update-function-code \
  --function-name FlightSchoolMatchExplainer \
  --zip-file fileb:///Users/tyler/Desktop/Gauntlet/flight-school-marketplace/lambda/match-explainer-code.zip \
  --region us-east-1
```

### Step 2: Deploy CloudFormation Stack

#### Via AWS Console:

1. Go to [CloudFormation Console](https://console.aws.amazon.com/cloudformation/) in **us-east-1** region
2. Click **Create stack** → **With new resources**
3. Choose **Upload a template file**
4. Upload: `/Users/tyler/Desktop/Gauntlet/flight-school-marketplace/cdk/cloudformation-template.yaml`
5. Click **Next**
6. **Stack name**: `FlightSchoolMatchExplainerStack`
7. Click **Next** through Parameters (none required)
8. Click **Next** through Configure options
9. ✅ Check **"I acknowledge that AWS CloudFormation might create IAM resources"**
10. Click **Submit**

#### Via AWS CLI:

```bash
# If using Option A (S3):
aws cloudformation create-stack \
  --stack-name FlightSchoolMatchExplainerStack \
  --template-body file:///Users/tyler/Desktop/Gauntlet/flight-school-marketplace/cdk/cloudformation-template.yaml \
  --capabilities CAPABILITY_NAMED_IAM \
  --region us-east-1

# Wait for completion
aws cloudformation wait stack-create-complete \
  --stack-name FlightSchoolMatchExplainerStack \
  --region us-east-1

# Get outputs
aws cloudformation describe-stacks \
  --stack-name FlightSchoolMatchExplainerStack \
  --region us-east-1 \
  --query 'Stacks[0].Outputs'
```

### Step 3: Update Lambda Code (if using Option B)

After the stack is created:

```bash
aws lambda update-function-code \
  --function-name FlightSchoolMatchExplainer \
  --zip-file fileb:///Users/tyler/Desktop/Gauntlet/flight-school-marketplace/lambda/match-explainer-code.zip \
  --region us-east-1
```

### Step 4: Test the API

Get the API endpoint from CloudFormation outputs:

```bash
aws cloudformation describe-stacks \
  --stack-name FlightSchoolMatchExplainerStack \
  --region us-east-1 \
  --query 'Stacks[0].Outputs[?OutputKey==`ApiUrl`].OutputValue' \
  --output text
```

Test it:

```bash
curl -X POST YOUR_API_URL \
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

### Step 5: Add to Vercel

Get the Vercel environment variable value:

```bash
aws cloudformation describe-stacks \
  --stack-name FlightSchoolMatchExplainerStack \
  --region us-east-1 \
  --query 'Stacks[0].Outputs[?OutputKey==`VercelEnvVar`].OutputValue' \
  --output text
```

Add to Vercel:
```bash
vercel env add VITE_MATCH_API_URL production
# Paste the API URL (without the VITE_MATCH_API_URL= prefix)
```

Or via Vercel Dashboard:
- Settings → Environment Variables
- Add: `VITE_MATCH_API_URL` = `https://xxxxx.execute-api.us-east-1.amazonaws.com/prod`

## Prerequisites

Before deploying, ensure:

1. ✅ **Bedrock Model Access Enabled** in us-east-1
   - Go to [Bedrock Console](https://console.aws.amazon.com/bedrock/)
   - Enable "Anthropic - Claude 3 Sonnet" model

2. ✅ **IAM Permissions** to create:
   - Lambda functions
   - IAM roles
   - API Gateway
   - CloudFormation stacks

## Troubleshooting

### Stack Creation Fails

Check CloudFormation events:
```bash
aws cloudformation describe-stack-events \
  --stack-name FlightSchoolMatchExplainerStack \
  --region us-east-1 \
  --max-items 20
```

### Bedrock Access Denied

Enable model access in Bedrock console (us-east-1 only).

### Lambda Timeout

Increase timeout in CloudFormation template or via console:
```yaml
Timeout: 60  # Increase from 30
```

## Cost Estimate

~$154/month for 10,000 matches:
- Lambda: $0.20
- API Gateway: $3.50
- Bedrock (Claude Sonnet): $150
- CloudWatch: $0.50

---

**Quick Deploy Summary:**

1. Upload `/cdk/cloudformation-template.yaml` to CloudFormation Console
2. Deploy stack (check IAM acknowledgment)
3. Update Lambda code with `/lambda/match-explainer-code.zip`
4. Get API URL from stack outputs
5. Add to Vercel environment variables
6. Test and deploy!
