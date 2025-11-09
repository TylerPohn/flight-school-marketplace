# DynamoDB Setup and Migration Guide

## Overview

Your flight school marketplace now has AWS infrastructure set up with:
- **DynamoDB table** (`flight-schools`) for storing school data
- **Lambda functions** for reading school data via API
- **API Gateway** endpoints for frontend access

## Infrastructure Components

### 1. DynamoDB Table
- **Table Name**: `flight-schools`
- **Partition Key**: `schoolId` (String)
- **GSI**: `StateIndex` - Query schools by state, sorted by rating
- **Billing**: Pay-per-request (on-demand)
- **Point-in-time recovery**: Enabled

### 2. Lambda Functions

#### Get All Schools (`get-schools`)
- **Endpoint**: `GET /schools`
- **Query Parameters**:
  - `state` - Filter by state (uses GSI)
  - `trainingType` - Filter by Part61/Part141
  - `programs` - Comma-separated list of programs (PPL,IR,CPL,ATPL)
  - `maxBudget` - Filter by maximum budget
  - `sortBy` - Sort results (name-asc, name-desc, price-asc, price-desc, rating-desc, rating-asc)

#### Get School by ID (`get-school-by-id`)
- **Endpoint**: `GET /schools/{schoolId}`
- Returns full detailed school object

## Deployment Steps

### 1. Deploy the Infrastructure

```bash
cd cdk
npm install
cdk deploy
```

This will create:
- DynamoDB table
- Lambda functions
- API Gateway endpoints
- Output the API URL

### 2. Migrate School Data

The school data needs to be migrated from the TypeScript mock files to DynamoDB.

**Option A: Manual Migration (Recommended for now)**

1. Export school data to JSON:
   ```bash
   cd frontend
   # Manually copy the school objects from src/mock/detailedSchools.ts
   # Remove the TypeScript-specific code (imports, type annotations)
   # Save as ../scripts/schools-data.json
   ```

2. Update the migration script to read from the JSON file:
   ```javascript
   // In scripts/migrate-to-dynamo.js
   const schools = require('./schools-data.json');
   ```

3. Run the migration:
   ```bash
   cd scripts
   npm install  # If not already done
   TABLE_NAME=flight-schools AWS_REGION=us-east-1 node migrate-to-dynamo.js
   ```

**Option B: Programmatic Export (Future Enhancement)**

Create a build script that compiles the TypeScript and exports JSON.

### 3. Update Frontend to Use API

Once data is in DynamoDB, update the frontend:

1. Add API URL to environment variables:
   ```bash
   # In frontend/.env
   VITE_API_URL=<your-api-gateway-url>
   ```

2. Create an API client:
   ```typescript
   // frontend/src/services/api.ts
   const API_URL = import.meta.env.VITE_API_URL;

   export async function getSchools(params?) {
     const queryString = new URLSearchParams(params).toString();
     const response = await fetch(`${API_URL}/schools?${queryString}`);
     return response.json();
   }

   export async function getSchoolById(schoolId: string) {
     const response = await fetch(`${API_URL}/schools/${schoolId}`);
     return response.json();
   }
   ```

3. Update components to use API instead of mock data:
   ```typescript
   // Replace imports like:
   // import { detailedMockSchools } from '../mock/detailedSchools';

   // With API calls:
   const schools = await getSchools();
   ```

## Current Status

✅ **Completed:**
- DynamoDB table defined in CDK stack
- Lambda functions created with full CRUD operations
- API Gateway endpoints configured with CORS
- Migration scripts created

⏳ **Next Steps:**
1. Fix TypeScript compilation errors in detailedSchools.ts (or export data as-is)
2. Deploy CDK stack: `cd cdk && cdk deploy`
3. Export school data to JSON format
4. Run migration script to populate DynamoDB
5. Update frontend to call APIs instead of using mock data
6. Test the full flow

## API Examples

Once deployed, you can test the API:

```bash
# Get all schools
curl https://your-api.execute-api.us-east-1.amazonaws.com/prod/schools

# Get schools in Florida
curl "https://your-api.execute-api.us-east-1.amazonaws.com/prod/schools?state=FL"

# Get schools sorted by rating
curl "https://your-api.execute-api.us-east-1.amazonaws.com/prod/schools?sortBy=rating-desc"

# Get specific school
curl https://your-api.execute-api.us-east-1.amazonaws.com/prod/schools/school-001
```

## Environment Variables

Add these to your Vercel/frontend deployment:

```
VITE_API_URL=<API Gateway URL from CDK output>
```

## Cost Estimate

- **DynamoDB**: $0 for first 25GB storage, then $0.25/GB
- **Lambda**: First 1M requests free, then $0.20 per 1M requests
- **API Gateway**: First 1M requests free, then $3.50 per million

For a marketplace with 1000 schools and 10,000 monthly users:
- Estimated cost: **< $5/month**

## Troubleshooting

### Migration fails
- Check AWS credentials: `aws sts get-caller-identity`
- Verify table exists: `aws dynamodb describe-table --table-name flight-schools`
- Check permissions on your IAM user/role

### API returns CORS errors
- CORS is configured in API Gateway
- Verify Origin header in request
- Check browser console for specific error

### Data not showing in frontend
- Verify API URL in environment variables
- Check browser Network tab for API calls
- Verify data exists in DynamoDB table

## Data Schema

Each school object in DynamoDB:

```json
{
  "schoolId": "school-001",
  "name": "Sky High Flight Academy",
  "state": "FL",
  "city": "Miami",
  "zipCode": "33101",
  "coordinates": { "lat": 25.7617, "lng": -80.1918 },
  "programs": ["PPL", "IR", "CPL", "ATPL"],
  "costBand": { "min": 8500, "max": 65000 },
  "trainingType": "Part141",
  "trustTier": "Premier",
  "description": "...",
  "yearsInOperation": 25,
  "facilities": [...],
  "instructorCount": 15,
  "reviewCount": 127,
  "avgRating": 4.8,
  "heroImageUrl": "https://...",
  "fleetDetails": [...],
  "instructors": [...],
  "programDetails": [...],
  "reviews": [...],
  "verificationDetails": {...},
  "contactInfo": {...},
  "createdAt": "2025-11-08T...",
  "updatedAt": "2025-11-08T..."
}
```

## Next: Deploying to Production

See `cdk/MANUAL_DEPLOYMENT_GUIDE.md` for detailed CDK deployment instructions.
