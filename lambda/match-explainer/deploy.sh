#!/bin/bash

# Flight School Match Explainer Lambda - Deployment Script
# This script deploys the Lambda function and sets up API Gateway

set -e  # Exit on error

echo "🚀 Starting deployment of Flight School Match Explainer Lambda..."

# Step 1: Install dependencies
echo "📦 Installing dependencies..."
cd "$(dirname "$0")"
npm install

# Step 2: Create deployment package
echo "📦 Creating deployment package..."
zip -r function.zip index.mjs node_modules/

# Step 3: Create IAM role (if it doesn't exist)
echo "🔐 Setting up IAM role..."
ROLE_NAME="FlightSchoolMatchExplainerRole"
ROLE_ARN=$(aws iam get-role --role-name $ROLE_NAME --query 'Role.Arn' --output text 2>/dev/null || echo "")

if [ -z "$ROLE_ARN" ]; then
  echo "Creating IAM role..."
  aws iam create-role \
    --role-name $ROLE_NAME \
    --assume-role-policy-document file://lambda-trust-policy.json

  aws iam put-role-policy \
    --role-name $ROLE_NAME \
    --policy-name BedrockAndLogsPolicy \
    --policy-document file://lambda-permissions.json

  ROLE_ARN=$(aws iam get-role --role-name $ROLE_NAME --query 'Role.Arn' --output text)
  echo "✅ Created IAM role: $ROLE_ARN"
  echo "⏳ Waiting 10 seconds for role to propagate..."
  sleep 10
else
  echo "✅ IAM role already exists: $ROLE_ARN"
fi

# Step 4: Create or update Lambda function
echo "⚡ Deploying Lambda function..."
FUNCTION_NAME="FlightSchoolMatchExplainer"

if aws lambda get-function --function-name $FUNCTION_NAME --region us-east-1 2>/dev/null; then
  echo "Updating existing function..."
  aws lambda update-function-code \
    --function-name $FUNCTION_NAME \
    --zip-file fileb://function.zip \
    --region us-east-1
else
  echo "Creating new function..."
  aws lambda create-function \
    --function-name $FUNCTION_NAME \
    --runtime nodejs18.x \
    --role $ROLE_ARN \
    --handler index.handler \
    --zip-file fileb://function.zip \
    --timeout 30 \
    --memory-size 512 \
    --region us-east-1
fi

echo "✅ Lambda function deployed successfully!"

# Step 5: Get function ARN
LAMBDA_ARN=$(aws lambda get-function --function-name $FUNCTION_NAME --region us-east-1 --query 'Configuration.FunctionArn' --output text)
echo "Lambda ARN: $LAMBDA_ARN"

# Step 6: Setup API Gateway
echo "🌐 Setting up API Gateway..."

# Check if API already exists
API_ID=$(aws apigateway get-rest-apis --region us-east-1 --query "items[?name=='FlightSchoolMatchAPI'].id" --output text)

if [ -z "$API_ID" ]; then
  echo "Creating new API Gateway..."

  # Create API
  API_ID=$(aws apigateway create-rest-api \
    --name "FlightSchoolMatchAPI" \
    --description "API for AI-powered flight school matching" \
    --endpoint-configuration types=REGIONAL \
    --region us-east-1 \
    --query 'id' \
    --output text)

  echo "Created API: $API_ID"

  # Get root resource
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

  # Grant API Gateway permission to invoke Lambda
  aws lambda add-permission \
    --function-name $FUNCTION_NAME \
    --statement-id apigateway-invoke-$(date +%s) \
    --action lambda:InvokeFunction \
    --principal apigateway.amazonaws.com \
    --source-arn "arn:aws:execute-api:us-east-1:${ACCOUNT_ID}:${API_ID}/*/*/explain-match" \
    --region us-east-1 || echo "Permission may already exist"

  # Deploy API
  aws apigateway create-deployment \
    --rest-api-id $API_ID \
    --stage-name prod \
    --region us-east-1

  echo "✅ API Gateway created!"
else
  echo "✅ API Gateway already exists: $API_ID"
fi

# Step 7: Display endpoint
API_ENDPOINT="https://${API_ID}.execute-api.us-east-1.amazonaws.com/prod/explain-match"
echo ""
echo "✅ Deployment Complete!"
echo ""
echo "📋 Summary:"
echo "  - Lambda Function: $FUNCTION_NAME"
echo "  - Lambda ARN: $LAMBDA_ARN"
echo "  - API Gateway ID: $API_ID"
echo "  - API Endpoint: $API_ENDPOINT"
echo ""
echo "🔗 Add this to your Vercel environment variables:"
echo "  VITE_MATCH_API_URL=https://${API_ID}.execute-api.us-east-1.amazonaws.com/prod"
echo ""
echo "🧪 Test the endpoint:"
echo "  curl -X POST $API_ENDPOINT \\"
echo "    -H \"Content-Type: application/json\" \\"
echo "    -d '{\"student\":{\"trainingGoal\":\"PPL\",\"maxBudget\":50000,\"location\":{\"city\":\"Denver\",\"state\":\"CO\",\"lat\":39.7392,\"lon\":-104.9903},\"trainingTypePreference\":\"Part141\",\"priorExperience\":\"None\"},\"school\":{\"name\":\"Test Aviation\",\"location\":{\"city\":\"Aurora\",\"state\":\"CO\",\"lat\":39.7294,\"lon\":-104.8319},\"costBand\":{\"min\":45000,\"max\":60000},\"primaryProgram\":\"PPL\",\"trainingType\":\"Part141\",\"instructorCount\":12},\"matchScore\":87}'"
echo ""
