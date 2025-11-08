# AWS Administrator Setup Guide

This user (`tylerpohn@gmail.com`) needs an IAM role created to deploy the Lambda function.

## For AWS Administrators

### Step 1: Create IAM Role

Run these commands as an AWS administrator:

```bash
cd /path/to/lambda/match-explainer

# Create the role
aws iam create-role \
  --role-name FlightSchoolMatchExplainerRole \
  --assume-role-policy-document file://lambda-trust-policy.json

# Attach permissions
aws iam put-role-policy \
  --role-name FlightSchoolMatchExplainerRole \
  --policy-name BedrockAndLogsPolicy \
  --policy-document file://lambda-permissions.json

# Get the role ARN
aws iam get-role \
  --role-name FlightSchoolMatchExplainerRole \
  --query 'Role.Arn' \
  --output text
```

**Save the Role ARN** - user will need this.

### Step 2: Grant User Lambda Deployment Permissions

Create a policy for the user to deploy Lambda functions:

**File: `user-lambda-policy.json`:**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "lambda:CreateFunction",
        "lambda:UpdateFunctionCode",
        "lambda:UpdateFunctionConfiguration",
        "lambda:GetFunction",
        "lambda:AddPermission",
        "lambda:InvokeFunction"
      ],
      "Resource": "arn:aws:lambda:us-east-1:*:function:FlightSchoolMatchExplainer"
    },
    {
      "Effect": "Allow",
      "Action": [
        "iam:PassRole"
      ],
      "Resource": "arn:aws:iam::*:role/FlightSchoolMatchExplainerRole"
    },
    {
      "Effect": "Allow",
      "Action": [
        "apigateway:*"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "sts:GetCallerIdentity"
      ],
      "Resource": "*"
    }
  ]
}
```

Attach to user:

```bash
aws iam put-user-policy \
  --user-name tylerpohn@gmail.com \
  --policy-name LambdaDeploymentPolicy \
  --policy-document file://user-lambda-policy.json
```

### Step 3: Enable Bedrock Model Access

1. Go to [Amazon Bedrock Console](https://console.aws.amazon.com/bedrock/)
2. Click "Model access" in left sidebar
3. Click "Enable specific models"
4. Select **Anthropic - Claude 3 Sonnet**
5. Click "Request model access"
6. Wait for approval

## Alternative: Deploy for the User

If you prefer to deploy everything yourself:

```bash
cd /path/to/lambda/match-explainer

# Install dependencies
npm install

# Create deployment package
zip -r function.zip index.mjs node_modules/

# Create function (use the role ARN from Step 1)
aws lambda create-function \
  --function-name FlightSchoolMatchExplainer \
  --runtime nodejs18.x \
  --role arn:aws:iam::ACCOUNT_ID:role/FlightSchoolMatchExplainerRole \
  --handler index.handler \
  --zip-file fileb://function.zip \
  --timeout 30 \
  --memory-size 512 \
  --region us-east-1

# Create API Gateway
# Follow steps in /frontend/docs/LLM_INTEGRATION_PLAN.md Section 2.4
# Or run: ./deploy-api-gateway.sh (if provided)
```

Then provide the user with:
- Lambda function ARN
- API Gateway endpoint URL

## What This Does

- **Lambda Function**: Calls Amazon Bedrock (Claude AI) to generate personalized flight school match explanations
- **IAM Role**: Allows Lambda to invoke Bedrock and write logs to CloudWatch
- **API Gateway**: REST API endpoint for the frontend to call

## Cost Estimate

~$154/month for 10,000 matches:
- Lambda: ~$0.20
- API Gateway: ~$3.50
- Bedrock: ~$150
- CloudWatch: ~$0.50

---

**Contact**: Tyler (tylerpohn@gmail.com)
**Project**: Find A Flight School - AI Matching System
