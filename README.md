# Flight School Marketplace

A comprehensive platform for discovering and comparing flight schools across the United States. Features an AI-powered matching system that helps prospective pilots find the best flight school based on their preferences, budget, location, and training goals.

## Features

### 🎯 AI-Powered Matching System
- **Intelligent Quiz**: 4-step questionnaire capturing training goals, budget, location, and preferences
- **Advanced Scoring Algorithm**: Multi-factor scoring system using:
  - Program compatibility (PPL, IR, CPL, ATPL)
  - Budget fit with continuous scoring
  - Geographic proximity with distance-based decay
  - Training type preferences (Part 141, Part 61)
  - Aircraft preference matching with availability
  - School quality metrics (ratings, reviews, longevity)
  - Efficiency indicators (hours to PPL, FSP signals)
  - Instructor-to-aircraft ratios
- **AI Explanations**: Personalized match explanations powered by Claude 3.5 Sonnet via AWS Bedrock
- **Score Differentiation**: Decimal precision scoring (60.00-95.00 range) ensures unique rankings

### 🏫 School Directory
- Browse all flight schools with detailed profiles
- Advanced filtering and sorting capabilities
- Real-time data from DynamoDB
- Compare multiple schools side-by-side

### 📊 Detailed School Profiles
- Comprehensive school information
- Fleet details with aircraft availability
- Instructor profiles and certifications
- Program costs and duration
- Student reviews and ratings
- Verification status (Verified FSP, Community-Verified, Unverified)

### 🔍 School Comparison Tool
- **Multi-School Comparison**: Compare up to 3 schools side-by-side
- **Visual Comparison**: Side-by-side tables comparing:
  - Location and contact information
  - Training programs offered
  - Cost bands and pricing
  - Fleet details and aircraft types
  - Instructor counts and qualifications
  - Training type (Part 141 vs Part 61)
  - Reviews and ratings
  - Trust tier verification status
- **Persistent State**: Comparison selections saved in React Context
- **Quick Actions**: Add schools to comparison from directory or profile pages
- **Export-Ready**: Clean comparison view for decision making

### 💰 Financing Information
- **Comprehensive Financing Guide**: Overview of aviation training financing options
- **Financing Options Covered**:
  - Federal Student Loans (if school is Title IV eligible)
  - Private Student Loans (aviation-specific lenders)
  - Personal Loans from banks and credit unions
  - VA Benefits (GI Bill, Post-9/11 GI Bill)
  - Pilot Finance Companies (AOPA, Stratus Financial, etc.)
  - Credit Cards (for smaller expenses)
  - Income Share Agreements (ISAs)
  - School Payment Plans
  - Employer Sponsorships
- **Loan Calculators**: Tools to estimate monthly payments
- **Eligibility Requirements**: Clear breakdown of what's needed for each option
- **Comparison Tables**: Side-by-side comparison of interest rates, terms, and requirements
- **Application Tips**: Guidance on improving approval chances

## Application Pages & Navigation

### Main Pages
- **Home Page** (`/`)
  - Hero section with call-to-action
  - Featured schools showcase
  - Quick links to matching quiz and school directory

- **AI Matching Quiz** (`/find-my-school`)
  - Step 1: Training Goals & Programs (goal, training type, aircraft preference)
  - Step 2: Budget & Financing (max budget, financing interest, military benefits)
  - Step 3: Location & Housing (location, search radius, housing needs)
  - Step 4: Preferences & Experience (intensity, priorities, prior experience)
  - Results: Top 5 matched schools with AI-generated explanations

- **School Directory** (`/schools`)
  - Searchable/filterable list of all schools
  - Sort by name, location, cost, rating
  - Filter by state, programs, training type, trust tier
  - Quick actions: view profile, add to comparison
  - Pagination for large datasets

- **School Profile** (`/schools/:id`)
  - Detailed school information
  - Interactive tabs: Overview, Programs, Fleet, Instructors, Reviews
  - Cost breakdown by program
  - Contact information and actions
  - Add to comparison button

- **School Comparison** (`/compare`)
  - Side-by-side comparison of selected schools (up to 3)
  - Comparison table with key metrics
  - Add/remove schools from comparison
  - Clear all comparison option

- **Financing Guide** (`/financing`)
  - Comprehensive financing options overview
  - Loan calculators and estimators
  - Eligibility requirements
  - Comparison of financing methods
  - External resources and links

### Navigation Structure
- **Top Navigation Bar**:
  - Schools (directory link)
  - Find My School (matching quiz)
  - Financing (guide)
  - Compare (comparison tool with badge showing count)
- **Responsive Design**: Mobile-friendly hamburger menu on small screens
- **Breadcrumbs**: Context-aware navigation on detail pages

## Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI) v6
- **Routing**: React Router v6
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Context API
  - `ComparisonContext` - Manages school comparison selections across the app
  - Persistent comparison state throughout navigation
- **Styling**: Material-UI emotion-based styling with theme customization

### Backend (AWS)
- **Infrastructure**: AWS CDK (TypeScript)
- **Database**: DynamoDB
  - `FlightSchools` table - school data with GSI for filtering
- **API**: API Gateway REST API
  - `GET /schools` - List all schools
  - `GET /schools/{id}` - Get school details
  - `POST /match/explain` - Generate AI match explanations
- **AI**: AWS Bedrock with Claude 3.5 Sonnet
  - Model: `anthropic.claude-3-5-sonnet-20240620-v1:0`
  - ~5K invocations/month, ~$40/month estimated cost
- **Compute**: Lambda functions (Node.js 20.x)

## Project Structure

```
flight-school-marketplace/
├── cdk/                          # AWS CDK infrastructure
│   ├── lib/
│   │   └── cdk-stack.ts         # Main stack definition (DynamoDB, API Gateway, Lambda)
│   ├── bin/
│   │   └── cdk.ts               # CDK app entry point
│   └── package.json
│
├── frontend/                     # React application
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── matching/        # AI matching quiz components
│   │   │   │   ├── StepOne.tsx  # Training goals & programs
│   │   │   │   ├── StepTwo.tsx  # Budget & financing
│   │   │   │   ├── StepThree.tsx # Location & housing
│   │   │   │   ├── StepFour.tsx # Preferences & experience
│   │   │   │   └── MatchResults.tsx # Results display
│   │   │   ├── comparison/      # School comparison features
│   │   │   │   └── ComparisonTable.tsx
│   │   │   └── layout/          # Layout components
│   │   │       ├── Layout.tsx   # Main layout wrapper
│   │   │       └── Navbar.tsx   # Navigation bar
│   │   │
│   │   ├── pages/               # Page components
│   │   │   ├── HomePage.tsx     # Landing page
│   │   │   ├── AIMatchingPage.tsx # Matching quiz
│   │   │   ├── SchoolDirectory.tsx # School directory
│   │   │   ├── SchoolProfilePage.tsx # School details
│   │   │   ├── ComparisonPage.tsx # Comparison tool
│   │   │   └── FinancingPage.tsx # Financing guide
│   │   │
│   │   ├── context/             # React Context providers
│   │   │   └── ComparisonContext.tsx # School comparison state
│   │   │
│   │   ├── services/            # API service layer
│   │   │   ├── matchApi.ts      # AI explanation API
│   │   │   └── schoolsApi.ts    # Schools data API
│   │   │
│   │   ├── hooks/               # Custom React hooks
│   │   │   └── useMatchingWizard.ts # Matching quiz logic
│   │   │
│   │   ├── utils/               # Utilities
│   │   │   └── mockAIMatching.ts # Scoring algorithm (14-factor system)
│   │   │
│   │   ├── types/               # TypeScript types
│   │   │   ├── matchProfile.ts  # Matching types (MatchProfile, MockSchool, RankedSchool)
│   │   │   └── trustTier.ts     # Trust tier types
│   │   │
│   │   ├── schemas/             # Zod validation schemas
│   │   │   └── matchingSchema.ts # Form validation
│   │   │
│   │   ├── mock/                # Mock/seed data
│   │   │   ├── detailedSchools.ts # DetailedSchool type definition
│   │   │   └── mockSchools.ts   # Legacy mock data
│   │   │
│   │   └── config/              # Configuration
│   │       └── api.ts           # API base URL
│   │
│   ├── addFinalSchools.cjs      # Script to populate DynamoDB
│   └── package.json
│
├── lambda/                       # Lambda function code
│   ├── get-schools/             # List all schools endpoint
│   │   └── index.mjs            # GET /schools handler
│   ├── get-school-by-id/        # Get school details endpoint
│   │   └── index.mjs            # GET /schools/{id} handler
│   └── match-explainer/         # AI explanation endpoint
│       ├── index.mjs            # POST /match/explain handler
│       └── README.md            # Lambda documentation
│
├── scripts/                      # Utility scripts
└── README.md                     # This file

```

## Matching Algorithm

The matching algorithm uses a sophisticated multi-factor scoring system:

### Scoring Components (Total: ~71 points)

1. **Base Score**: 30 points
2. **Program Match** (0-15): Exact program match vs. availability
3. **Budget Match** (0-15): Continuous scoring based on fit quality
4. **Location Match** (0-12): Distance-based decay function
5. **Training Type** (0-6): Part 141/61 preference
6. **Preferences** (0-8): User priorities (cost, instructors, fleet, etc.)
7. **Experience Bonus** (0-4): Prior flight experience alignment
8. **Financing** (0-2): If needed and available
9. **Housing** (0-2): If needed and available
10. **Quality Metrics** (0-8):
    - Rating quality (0-3)
    - Review credibility (0-2)
    - Instructor ratio (0-1.5)
    - Years in operation (0-1.5)
11. **Efficiency** (0-4):
    - Hours to PPL (0-2)
    - FSP signals (0-2)
12. **Aircraft Preference** (0-3): Preferred aircraft availability
13. **Random Variation** (-1.5 to +1.5): Prevents identical scores
14. **Tie-breaker** (0-1): Micro-adjustments for uniqueness

### Score Range
- **Minimum**: 60 (schools that pass basic filters)
- **Maximum**: 95 (never shows 100%)
- **Precision**: 2 decimal places (internally)
- **Display**: Rounded to whole numbers in UI

## Getting Started

### Prerequisites
- Node.js 20.x or later
- AWS Account with credentials configured
- AWS CDK CLI installed globally: `npm install -g aws-cdk`

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd flight-school-marketplace
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install CDK Dependencies**
   ```bash
   cd ../cdk
   npm install
   ```

### Development

1. **Run Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   # Opens on http://localhost:5173
   ```

2. **Deploy Backend Infrastructure**
   ```bash
   cd cdk
   npm run build
   cdk deploy
   ```

   After deployment, update `frontend/src/config/api.ts` with your API Gateway URL.

3. **Populate DynamoDB with School Data**
   ```bash
   cd frontend
   node addFinalSchools.cjs
   ```

### Building for Production

```bash
cd frontend
npm run build
# Output in frontend/dist/
```

### Troubleshooting

If you encounter any issues during setup or development, please refer to our comprehensive [Troubleshooting Guide](docs/TROUBLESHOOTING.md) which covers:

- Environment setup issues
- Build and compilation errors
- AWS and CDK deployment problems
- API integration issues
- Database connectivity
- Performance optimization

## API Documentation

### GET /schools
Returns list of all flight schools.

**Response:**
```json
[
  {
    "schoolId": "school-001",
    "name": "SkyHigh Academy",
    "location": {
      "city": "San Diego",
      "state": "CA",
      "coordinates": { "lat": 32.7157, "lng": -117.1611 }
    },
    "programs": ["PPL", "IR", "CPL"],
    "costBand": { "min": 12000, "max": 16000 },
    "trainingType": "Part141",
    "trustTier": "Verified FSP",
    "avgRating": 4.5,
    "reviewCount": 127,
    "yearsInOperation": 15
  }
]
```

### GET /schools/{id}
Returns detailed information for a specific school.

### POST /match/explain
Generates AI-powered match explanation.

**Request Body:**
```json
{
  "student": {
    "trainingGoal": "PPL",
    "maxBudget": 15000,
    "location": { "city": "San Diego", "state": "CA", "lat": 32.7157, "lon": -117.1611 },
    "trainingTypePreference": "Part141",
    "priorExperience": "None"
  },
  "school": {
    "name": "SkyHigh Academy",
    "location": { "city": "San Diego", "state": "CA", "lat": 32.7157, "lon": -117.1611 },
    "costBand": { "min": 12000, "max": 16000 },
    "primaryProgram": "PPL",
    "instructorCount": 12,
    "trainingType": "Part141"
  },
  "matchScore": 89.43
}
```

**Response:**
```json
{
  "explanation": "SkyHigh Academy is an excellent match for your PPL training journey..."
}
```

## Environment Variables

Create `.env` file in `frontend/`:
```env
VITE_API_BASE_URL=https://your-api-gateway-url.amazonaws.com/prod
```

## Cost Estimates

### AWS Monthly Costs (Estimated)
- **DynamoDB**: ~$5/month (on-demand pricing, low traffic)
- **Lambda**: ~$1/month (first 1M requests free)
- **API Gateway**: ~$4/month (first 1M requests $3.50)
- **Bedrock (Claude 3.5 Sonnet)**: ~$40/month (5K invocations)
  - Input: $3 per million tokens
  - Output: $15 per million tokens

**Total**: ~$50/month

## Data Schema

### FlightSchools Table
- **Partition Key**: `schoolId` (String)
- **GSI**: `StateIndex` - partition key: `location.state`
- **Attributes**: See `DetailedSchool` interface in `/frontend/src/mock/detailedSchools.ts`

## Documentation

- **[Troubleshooting Guide](docs/TROUBLESHOOTING.md)**: Solutions for common issues (environment setup, build errors, AWS issues, API integration)
- **[Contributing Guidelines](CONTRIBUTING.md)**: How to contribute (PR process, code standards, branch naming)
- **[Operational Runbook](docs/RUNBOOK.md)**: Deployment procedures, monitoring, maintenance, and incident response
- **[Implementation Plan](docs/IMPLEMENTATION_PLAN.md)**: Structured plan for bringing the project to production readiness
- **[Repository Analysis](docs/REPOSITORY_ANALYSIS.md)**: Comprehensive analysis of code quality and production readiness

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on:

- Development workflow and setup
- Code standards and best practices
- Pull request process
- Branch naming conventions
- Commit message guidelines

Quick start:
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes following our [code standards](CONTRIBUTING.md#code-standards)
4. Test thoroughly (matching algorithm, API endpoints, UI)
5. Submit a pull request using our [PR template](CONTRIBUTING.md#pr-template)

## Key Features Implemented

### Core Functionality
- ✅ **DynamoDB Integration**: Real-time school data from AWS DynamoDB
- ✅ **AI-Powered Matching**: Personalized match explanations via AWS Bedrock (Claude 3.5 Sonnet)
- ✅ **Advanced Scoring Algorithm**: 14-factor scoring with quality metrics
- ✅ **School Comparison Tool**: Side-by-side comparison of up to 3 schools with persistent state
- ✅ **Financing Guide**: Comprehensive financing information and resources
- ✅ **School Directory**: Full-featured directory with search, filter, and sort
- ✅ **Detailed School Profiles**: Multi-tab interface with programs, fleet, instructors, and reviews

### Technical Implementation
- ✅ **Responsive Design**: Mobile-first Material-UI design
- ✅ **Type Safety**: Full TypeScript coverage across frontend and backend
- ✅ **Form Validation**: React Hook Form with Zod schema validation
- ✅ **Continuous Scoring**: Decimal precision scoring (60-95 range) for better differentiation
- ✅ **Aircraft Preference Matching**: Matches user aircraft preferences with fleet availability
- ✅ **FSP Signal Integration**: Efficiency metrics for verified schools
- ✅ **Context-Based State**: Comparison selections persist across navigation
- ✅ **API Gateway Integration**: RESTful API with Lambda backend
- ✅ **Infrastructure as Code**: AWS CDK for reproducible deployments

## Known Issues & Future Enhancements

### Future Enhancements
- Add user accounts and saved searches
- Implement school claiming/verification workflow
- Add more detailed fleet information
- Integrate real-time availability calendars
- Add messaging system between students and schools
- Implement ML-based recommendation refinement
- Add more filters (reviews, part-time options, etc.)

## Screenshots

### Home Directory
![Home Directory](frontend/screenshots/1-home-directory.png)
Browse and discover flight schools with an intuitive directory interface featuring filtering, sorting, and detailed school cards with trust tier badges.

### School Profile
![School Profile](frontend/screenshots/2-school-profile.png)
Comprehensive school profiles with detailed information including programs, fleet, instructors, reviews, and FSP performance metrics.

### AI-Powered Matching
![AI Matching](frontend/screenshots/3-ai-matching.png)
Intelligent matching quiz that helps prospective pilots find the best flight school based on their preferences, budget, location, and training goals.

### School Comparison
![School Comparison](frontend/screenshots/4-comparison.png)
Side-by-side comparison tool allowing users to compare up to 3 schools across key metrics including costs, programs, fleet, and verification status.

### Financing Guide
![Financing Guide](frontend/screenshots/5-financing.png)
Comprehensive financing information covering federal loans, private loans, VA benefits, payment plans, and other funding options for flight training.

## License

MIT License

Copyright (c) 2024 Flight School Marketplace

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Contact

tylerpohn@gmail.com
