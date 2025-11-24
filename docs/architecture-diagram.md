# Flight School Marketplace - Architecture Diagram

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  React 18 SPA (TypeScript + Vite)                               │   │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────────────┐    │   │
│  │  │   Pages (7)  │ │  Components  │ │   Context/State      │    │   │
│  │  │              │ │              │ │   - Comparison Cart  │    │   │
│  │  │ - Home       │ │ - Navbar     │ │   - User Preferences │    │   │
│  │  │ - AI Quiz    │ │ - Filters    │ └──────────────────────┘    │   │
│  │  │ - Directory  │ │ - Cards      │                              │   │
│  │  │ - Profile    │ │ - Forms      │ ┌──────────────────────┐    │   │
│  │  │ - Compare    │ │ - Modals     │ │   API Services       │    │   │
│  │  │ - Financing  │ │ - Tables     │ │   - schoolsApi.ts    │    │   │
│  │  │ - Inquiry    │ └──────────────┘ │   - matchApi.ts      │    │   │
│  │  └──────────────┘                  └──────────────────────┘    │   │
│  │                                                                  │   │
│  │  UI: Material-UI v7 + Emotion Styling                          │   │
│  │  Forms: React Hook Form + Zod Validation                       │   │
│  │  Routing: React Router v6                                      │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                           │
│  Deployed on: Vercel (CDN + Edge Network)                               │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ HTTPS
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                            API GATEWAY LAYER                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │  AWS API Gateway (REST API)                                     │    │
│  │  URL: https://24kqwpkihe.execute-api.us-east-1.amazonaws.com  │    │
│  │                                                                  │    │
│  │  Endpoints:                                                     │    │
│  │  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐ │    │
│  │  │ GET /schools     │  │ GET /schools/{id}│  │ POST         │ │    │
│  │  │                  │  │                  │  │ /explain-    │ │    │
│  │  │ List all schools │  │ School details   │  │ match        │ │    │
│  │  └────────┬─────────┘  └────────┬─────────┘  └──────┬───────┘ │    │
│  │           │                     │                    │         │    │
│  │  CORS: Enabled (ALL_ORIGINS, ALL_METHODS)           │         │    │
│  └───────────┼─────────────────────┼────────────────────┼─────────┘    │
│              │                     │                    │               │
└──────────────┼─────────────────────┼────────────────────┼───────────────┘
               │                     │                    │
               ▼                     ▼                    ▼
┌──────────────────────┐  ┌──────────────────────┐  ┌─────────────────────┐
│   Lambda Function    │  │   Lambda Function    │  │  Lambda Function    │
│   GetSchools         │  │   GetSchoolById      │  │  MatchExplainer     │
│                      │  │                      │  │                     │
│   Runtime: Node 18   │  │   Runtime: Node 18   │  │  Runtime: Node 18   │
│   Memory: 256MB      │  │   Memory: 256MB      │  │  Memory: 512MB      │
│   Timeout: 10s       │  │   Timeout: 10s       │  │  Timeout: 30s       │
└──────────┬───────────┘  └──────────┬───────────┘  └──────────┬──────────┘
           │                         │                         │
           │                         │                         │
           ▼                         ▼                         ▼
┌─────────────────────────────────────────────┐    ┌─────────────────────┐
│        DynamoDB (NoSQL Database)            │    │   AWS Bedrock       │
├─────────────────────────────────────────────┤    ├─────────────────────┤
│                                             │    │                     │
│  Table: flight-schools                      │    │  Claude 3.5 Sonnet  │
│  ┌────────────────────────────────────┐    │    │                     │
│  │ Partition Key: schoolId (String)   │    │    │  Model ID:          │
│  │                                     │    │    │  anthropic.claude-  │
│  │ Attributes:                         │    │    │  3-5-sonnet-...     │
│  │ - name, location, programs          │    │    │                     │
│  │ - costBand, trainingType            │    │    │  Generates:         │
│  │ - fleet, instructors, reviews       │    │    │  - Match reasons    │
│  │ - avgRating, trustTier              │    │    │  - Personalized     │
│  │ - yearsInOperation, fspSignals      │    │    │    explanations     │
│  └────────────────────────────────────┘    │    │                     │
│                                             │    │  Input: ~1.5K tok   │
│  GSI: StateIndex                            │    │  Output: ~300 tok   │
│  ┌────────────────────────────────────┐    │    │                     │
│  │ Partition: state                    │    │    │  Cost: $3/M input   │
│  │ Sort: avgRating                     │    │    │        $15/M output │
│  └────────────────────────────────────┘    │    └─────────────────────┘
│                                             │
│  Billing: On-Demand (Pay per request)      │
│  Capacity: ~75 schools                      │
│  Backup: Point-in-time recovery enabled     │
│  Retention: RETAIN (data persists)          │
└─────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────┐
│                        INFRASTRUCTURE LAYER                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  AWS CDK (Infrastructure as Code)                               │   │
│  │                                                                  │   │
│  │  Stack: CdkStack (TypeScript)                                   │   │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────────────┐    │   │
│  │  │  DynamoDB    │ │  Lambda x3   │ │  API Gateway         │    │   │
│  │  │  + GSI       │ │  + IAM Roles │ │  + CORS              │    │   │
│  │  └──────────────┘ └──────────────┘ └──────────────────────┘    │   │
│  │                                                                  │   │
│  │  Region: us-east-1                                              │   │
│  │  Deployment: `cdk deploy`                                       │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  IAM Permissions (Least Privilege)                              │   │
│  │  - Lambda → DynamoDB: Read-only (scan, getItem)                 │   │
│  │  - Lambda → Bedrock: InvokeModel (Claude 3.5 Sonnet only)       │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────┐
│                         ALGORITHM LAYER (Client-Side)                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  14-Factor Scoring Algorithm (frontend/src/utils/mockAIMatching.ts)     │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                                                                  │   │
│  │  Input: User Preferences + School Data                          │   │
│  │  ┌────────────────────┐          ┌─────────────────────────┐    │   │
│  │  │ User Profile       │          │ School Database         │    │   │
│  │  │ - Training goal    │          │ - Programs offered      │    │   │
│  │  │ - Budget           │    +     │ - Location/coordinates  │    │   │
│  │  │ - Location         │          │ - Fleet & instructors   │    │   │
│  │  │ - Preferences      │          │ - Ratings & reviews     │    │   │
│  │  └────────────────────┘          └─────────────────────────┘    │   │
│  │                                                                  │   │
│  │  Scoring Factors:                                               │   │
│  │  ├─ Base Score (30 pts)                                         │   │
│  │  ├─ Program Match (0-15 pts)                                    │   │
│  │  ├─ Budget Fit (0-15 pts) - Continuous scoring                  │   │
│  │  ├─ Distance (0-12 pts) - Decay function                        │   │
│  │  ├─ Training Type (0-6 pts) - Part 141/61                       │   │
│  │  ├─ Aircraft Preference (0-3 pts)                               │   │
│  │  ├─ Quality Metrics (0-8 pts) - Ratings, reviews, ratios        │   │
│  │  ├─ Efficiency (0-4 pts) - Hours to PPL, FSP signals            │   │
│  │  ├─ User Priorities (0-8 pts) - Cost, instructors, fleet        │   │
│  │  ├─ Experience Bonus (0-4 pts)                                  │   │
│  │  ├─ Financing Available (0-2 pts)                               │   │
│  │  ├─ Housing Available (0-2 pts)                                 │   │
│  │  ├─ Random Variation (-1.5 to +1.5 pts)                         │   │
│  │  └─ Tie-breaker (0-1 pts)                                       │   │
│  │                                                                  │   │
│  │  Output: Top 5 Ranked Schools (60-95 score range)               │   │
│  │          + AI-generated explanation for each                     │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

## Data Flow Example (AI Matching)

```
User fills quiz → Algorithm scores all schools → Top 5 selected →
→ Frontend sends 5 API calls to /explain-match → Lambda invokes Bedrock →
→ Claude generates personalized explanation → Response cached →
→ Results displayed with scores + AI explanations
```

## Quick Reference

### Frontend Stack
- **Framework**: React 18 + TypeScript + Vite
- **UI**: Material-UI v7 with Emotion
- **Forms**: React Hook Form + Zod
- **Routing**: React Router v6
- **State**: React Context API
- **Deployment**: Vercel

### Backend Stack
- **API**: AWS API Gateway (REST)
- **Compute**: AWS Lambda (Node.js 18)
- **Database**: DynamoDB (on-demand)
- **AI**: AWS Bedrock (Claude 3.5 Sonnet)
- **Infrastructure**: AWS CDK (TypeScript)
- **Region**: us-east-1

### Cost (~$50/month)
- DynamoDB: ~$5
- Lambda: ~$1
- API Gateway: ~$4
- Bedrock: ~$40 (5K AI calls/month)
- Vercel: Free tier

### Key Metrics
- **Schools**: ~75 across US
- **API Endpoints**: 3
- **Lambda Functions**: 3
- **Pages**: 7
- **Scoring Factors**: 14
- **Match Results**: Top 5 schools
