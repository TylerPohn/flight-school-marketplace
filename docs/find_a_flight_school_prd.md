# 🚉️ Product Requirements Document (PRD)  
## Find-a-Flight-School Marketplace

---

## 1. Project Summary

### **Vision**
Become the authoritative, student-first marketplace for flight training by indexing all flight schools, standardizing opaque data, and leveraging Flight Schedule Pro (FSP) integrations to establish trusted verification tiers.

### **Problem**
Prospective pilots face fragmented, inconsistent, and outdated information when evaluating schools. Schools lack effective ways to demonstrate reliability, outcomes, and trustworthiness beyond price competition.

### **Solution**
A universal flight school directory offering standardized comparisons, guided enrollment, verified data, and incentives for schools to claim and connect via FSP.

---

## 2. Core Product Objectives

| **Pillar** | **Objective** |
|-------------|----------------|
| **Complete Coverage** | Index all flight schools via crawling and school-claimed profiles. |
| **Normalized Data** | Standardize opaque info like costs, training durations, and financing. |
| **Build Trust** | Introduce “Trust Tiers” based on verified FSP operational data. |
| **Smart Matching** | Implement AI-driven matching for personalized recommendations. |
| **Drive Conversion** | Enable inquiries, tours, discovery flights, and financing directly. |

---

## 3. Core Product Pillars & Features

### **A. Search & Compare**
- Filters: Program (PPL, IR, CPL), budget, financing, training type (Part 61/141), fleet/sim availability.  
- Comparison cards: Standardized view of cost, duration, and trust tier.

### **B. School Profiles**
- Detailed overview with transparent pricing, timeline, fleet, instructor count, and reviews.  
- “Evidence Panel” showing verification timestamp, data source, and Trust Tier badge.

### **C. Guided Journey**
- AI-driven matching questionnaire → ranked schools by fit.  
- Plain-English debrief explaining differences and tradeoffs.

### **D. Financing & Funding Hub**
- Soft-pull lender marketplace, VA benefit eligibility, affordability calculator.

---

## 4. Data Integrity & Trust Tiers

| **Tier** | **Verification Method** | **FSP Data Used** |
|-----------|---------------------------|-------------------|
| 🥇 **Premier** | Meets/exceeds composite benchmarks | Training velocity, reliability, utilization, satisfaction |
| ✅ **Verified FSP** | Cross-checked against aggregated data | Typical hours, rate consistency, instructor coverage |
| 🤝 **Community-Verified** | Claimed + verified docs | None |
| ⚠️ **Unverified** | Crawled data only | None |

---

## 5. Architecture Overview

### **Frontend Stack**
- **Vite + React + MUI**
- **TanStack Query** for data synchronization and caching.
- **React Hook Form + Zod** for validation.
- **React Router v6** for navigation.
- **Theme:** MUI dark theme with accessibility focus.

### **Backend Stack**
| Layer | Technology | Purpose |
|-------|-------------|----------|
| **API** | Node.js (Fastify or Express on AWS Lambda) | Lightweight REST endpoints |
| **Database** | DynamoDB | Flexible schema and fast iteration |
| **File Storage** | S3 | Photos, documents |
| **Auth** | Cognito or Clerk | User management |
| **AI Matching** | OpenAI API | Match and summarize comparisons |
| **Hosting/CDN** | AWS CloudFront | Asset delivery and edge caching |

---

## 6. Environment Mode Design

### **MODE Variable**
| **Name** | **Values** | **Purpose** |
|-----------|-------------|-------------|
| `MODE` | `DEMO` \| `PROD` | Toggles between demo-only and live environments |

### **Behavior**
#### `MODE=DEMO`
- No external API calls, crawlers, or DB connections.  
- Uses hardcoded mock data (in `/src/mock/`) for:
  - Schools list
  - Profiles
  - AI match output
  - FSP badges and signals  
- Deterministic pseudo-random AI responses for demo variety.
- Enables “Demo” watermark banner in the UI.

#### `MODE=PROD`
- Connects to:
  - DynamoDB (primary data)
  - S3 (file uploads)
  - OpenAI / FSP API (verification & matching)
- Enables admin and analytics dashboards.

---

## 7. Example Directory Schema (DynamoDB)

| Table | Partition Key | GSI | Purpose |
|-------|----------------|-----|----------|
| `Schools` | `schoolId` | location+program | Core profiles |
| `Programs` | `programId` | schoolId | Program definitions |
| `Leads` | `leadId` | createdAt | Lead and inquiry tracking |
| `Users` | `userId` | email | Students & school owners |

**Example Record**
```json
{
  "schoolId": "uuid",
  "name": "AeroFlight Academy",
  "location": { "city": "San Diego", "state": "CA" },
  "programs": ["PPL", "IR", "CPL"],
  "costBand": { "min": 11000, "max": 15000 },
  "trainingType": "Part141",
  "trustTier": "VerifiedFSP",
  "fspSignals": { "avgHoursToPPL": 62.5, "cancelRate": 8.5 },
  "updatedAt": "2025-11-07T00:00:00Z"
}
```

---

## 8. AI Match Factors
```json
{
  "studentProfile": {
    "maxBudget": 18000,
    "trainingGoals": ["PPL"],
    "preferredAircraft": ["Cessna 172"],
    "locationRadius": 100
  },
  "weights": {
    "distance": 0.25,
    "cost": 0.30,
    "trainingType": 0.20,
    "fspTrustScore": 0.25
  }
}
```

---

## 9. System Design (ASCII Diagram)

```
                ┌────────────────────────────┐
                │     Vite + React (MUI)      │
                │  TanStack Query / RHF / Zod │
                └────────────────────────┘
                               │
                     HTTPS / REST API
                               │
                   ┌─────────┴─────────┐
                   │  API Gateway (Lambda)  │
                   └─────────┴─────────┘
                               │
           ┌────────────────┼────────────────┐
           │                   │                   │
   ┌──────────────┐   ┌──────────────┐   ┌───────────────┐
   │ DynamoDB (DB) │   │ S3 File Store │   │ OpenAI / FSP   │
   └──────────────┘   └──────────────┘   └───────────────┘
                               │
                   ┌─────────┴─────────┐
                   │ MODE=DEMO ?            │
                   │ if DEMO → Mock Data    │
                   │ else → Live Services   │
                   └───────────────────┘
```

---

## 10. Deployment Strategy

| Stage | Env | Purpose |
|--------|-----|----------|
| **Local** | `.env.local` → MODE=DEMO | Development / Demos |
| **Staging** | MODE=PROD, Test APIs | Pre-launch QA |
| **Production** | MODE=PROD | Live marketplace |

---

## 11. Success Metrics (KPIs)

| **Perspective** | **KPI** |
|-----------------|----------|
| **Students** | Match rate, inquiry rate, financing completions |
| **Schools** | Claim rate, data freshness, lead conversion |
| **Marketplace** | Coverage %, Verified %, CAC/LTV |

---

## 12. Phased MVP Rollout

| Phase | Focus | Deliverables |
|-------|--------|--------------|
| **1. Directory MVP** | Basic search + comparison | Hardcoded DEMO mode ready |
| **2. Claim Flow** | School verification & profiles | DynamoDB + Cognito |
| **3. AI Matching** | Personalized recommendations | OpenAI integration |
| **4. Monetization** | Stripe billing + analytics | Lambda webhooks |

---

## 13. Future Enhancements
- Verified student reviews (FAA-linked)
- Geographic insights dashboards
- Instructor marketplace
- Data drift monitoring for schools

