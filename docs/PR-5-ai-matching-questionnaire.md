# PR-5: AI Matching Questionnaire with Mock Results

---

## 1. Goal

Build a **multi-step questionnaire wizard** that guides prospective pilots through a personalized discovery flow and returns **deterministic mock school recommendations** with AI-generated explanations.

This is a **pure DEMO MODE feature** with no real OpenAI API calls—all results are faked to demonstrate how personalized matching would work in production.

---

## 2. Context

### **DEMO Mode Philosophy**
- No actual AI inference or external API calls.
- Deterministic, repeatable results based on user answers.
- Pre-written "AI explanations" templated with school names and budget amounts.
- Designed to showcase product UX without infrastructure dependencies.

### **Why This Matters**
Students browsing the marketplace need a guided path from "I'm not sure which school" to "These 5 schools are ranked for me." This questionnaire is the conversion funnel's heart.

### **Depends On**
- **PR-1**: Core directory with school data, routing, and mock school database.

---

## 3. Requirements

### **3.1 Route**
- **Path**: `/find-my-school`
- **Component**: `AIMatchingPage.tsx`
- **Entry Points**:
  - Button on homepage: "Find My School"
  - Navigation menu quick link
  - Recommended after browsing schools without filtering

### **3.2 Multi-Step Wizard Form**

#### **Step 1: Training Goals & Programs**
- **Questions**:
  - "What is your primary training goal?"
    - Options: `PPL` (Private Pilot), `IR` (Instrument Rating), `CPL` (Commercial Pilot), `ATPL` (Airline Transport Pilot), `Other`
  - "Do you prefer Part 141 or Part 61 training?"
    - Options: `Part141`, `Part61`, `No Preference`
  - "What aircraft type interests you?" (optional)
    - Options: `Cessna 172`, `Piper Cherokee`, `Diamond DA40`, `Complex`, `No Preference`

#### **Step 2: Budget**
- **Questions**:
  - "What's your maximum budget for training?"
    - Input: Slider from `$5,000` to `$100,000` (default `$30,000`)
  - "Are you interested in financing options?"
    - Options: `Yes`, `No`
  - "Do you have military benefits (GI Bill)?"
    - Options: `Yes`, `No`, `Prefer not to say`

#### **Step 3: Location**
- **Questions**:
  - "Where would you prefer to train?"
    - Input: Text field (city/state or zip code autocomplete)
  - "How far are you willing to travel?" (search radius)
    - Input: Slider from `0 miles` to `500 miles` (default `50 miles`)
  - "Do you need housing assistance?"
    - Options: `Yes`, `No`

#### **Step 4: Training Preferences**
- **Questions**:
  - "How quickly do you want to complete training?"
    - Options: `Intensive (3-6 months)`, `Part-time (6-12 months)`, `Flexible/No preference`
  - "What matters most to you?" (select up to 3)
    - Options: `Low cost`, `Fast completion`, `Best instructors`, `Modern fleet`, `Small class sizes`, `Financing`, `Location`
  - "Do you have any prior flight experience?"
    - Options: `No`, `Discovery flight`, `10-20 hours`, `20+ hours`

### **3.3 Progress Indicator**
- **Visual**: MUI `Stepper` component showing:
  - Step 1/4, 2/4, 3/4, 4/4
  - Linear progression (no skipping)
  - Icons or labels: "Goals", "Budget", "Location", "Preferences"
- **Position**: Top of the form, always visible
- **Mobile**: Responsive; collapse step labels on small screens

### **3.4 Form Navigation**
- **Buttons**:
  - "Back" (disabled on Step 1)
  - "Next" (validates current step, disabled if invalid)
  - "Submit Questionnaire" (on Step 4, navigates to results)
- **Behavior**:
  - Each step validates on "Next" click
  - Show inline error messages if validation fails
  - Preserve form state during back navigation

### **3.5 Results Page**
- **Route**: `/find-my-school/results`
- **Display**:
  - Ranked list of 5-7 schools by match score
  - Each school card shows:
    - School name
    - Location
    - Primary program match
    - **Match Score** (0-100, e.g., "92% Match")
    - AI-generated explanation (e.g., "Based on your $15k budget and PPL goal, we recommend {schoolName}...")
    - "Learn More", "Request Tour", "Quick Message" buttons
  - Summary header: "Your Top Matches Based on Your Profile"
- **Ranking Order**: Deterministic, reproducible (same answers = same order every time)

### **3.6 Form Validation**
- **Tool**: React Hook Form + Zod
- **Validation Rules**:
  - Step 1: At least one program goal selected
  - Step 2: Budget is numeric and in valid range
  - Step 3: Location is not empty (city or zip provided)
  - Step 4: At least one preference selected
- **Error Display**: Inline red text below each field, "Submit" button disabled

---

## 4. Mock Logic & Deterministic Scoring

### **4.1 Scoring Algorithm**

All schools start with a base score of `60`. Points are added/subtracted based on user profile match:

#### **Program Match** (0-20 points)
```
IF student.trainingGoal === school.primaryProgram
  score += 20
ELSE IF student.trainingGoal in school.programs
  score += 10
ELSE
  score += 0
```

#### **Budget Match** (0-25 points)
```
schoolMinCost = school.costBand.min
schoolMaxCost = school.costBand.max
studentBudget = student.maxBudget

IF studentBudget >= schoolMinCost
  IF studentBudget <= schoolMaxCost
    score += 25  // Perfect match
  ELSE
    score += 20  // Within range, above minimum
  END
ELSE IF studentBudget >= (schoolMinCost * 0.9)
  score += 10  // Close enough (90%)
ELSE
  score += 0  // Too far below
END
```

#### **Location Match** (0-20 points)
```
distance = calculateDistance(student.location, school.location)
maxRadius = student.searchRadius

IF distance <= (maxRadius * 0.25)
  score += 20  // Very close
ELSE IF distance <= (maxRadius * 0.75)
  score += 15  // Reasonably close
ELSE IF distance <= maxRadius
  score += 10  // At edge of radius
ELSE IF distance <= (maxRadius * 1.5)
  score += 5  // Slightly outside preferred radius
ELSE
  score += 0  // Too far
END
```

#### **Training Type Match** (0-10 points)
```
IF student.trainingTypePreference === "No Preference"
  score += 10
ELSE IF student.trainingTypePreference === school.trainingType
  score += 10
ELSE
  score += 0
END
```

#### **Preference Bonus** (0-10 points)
```
matches = 0
FOR EACH studentPreference IN student.preferences:
  IF schoolHasPreference(school, studentPreference):
    matches += 1
  END
END

IF matches >= 2:
  score += 10
ELSE IF matches === 1:
  score += 5
ELSE:
  score += 0
END
```

#### **Experience Adjustment** (0-5 bonus/penalty)
```
IF school.hasExperiencedInstructors AND student.priorExperience >= 20:
  score += 5  // Reward advanced students with high-quality schools
ELSE IF school.isIntensiveProgram AND student.preferredIntensity === "Intensive":
  score += 3  // Reward alignment
END
```

### **4.2 Final Score Calculation**
```
finalScore = Math.min(100, baseScore + programMatch + budgetMatch +
             locationMatch + trainingTypeMatch + preferenceBonus +
             experienceAdjustment)

displayScore = Math.round(finalScore)
```

### **4.3 Mock School Database**

**Sample schools in `/src/mock/mockSchools.ts`:**

```json
[
  {
    "id": "school-001",
    "name": "SkyHigh Academy (San Diego, CA)",
    "location": { "city": "San Diego", "state": "CA", "lat": 32.7157, "lon": -117.1611 },
    "programs": ["PPL", "IR", "CPL"],
    "primaryProgram": "PPL",
    "costBand": { "min": 12000, "max": 16000 },
    "trainingType": "Part141",
    "intensityLevel": "Intensive",
    "hasFinancing": true,
    "hasHousing": false,
    "fleetTypes": ["Cessna 172", "Diamond DA40"],
    "instructorCount": 12,
    "averageHoursToPPL": 62,
    "trustTier": "Verified FSP",
    "preferences": ["Low cost", "Modern fleet", "Best instructors"]
  },
  {
    "id": "school-002",
    "name": "AeroFlight Training (Dallas, TX)",
    "location": { "city": "Dallas", "state": "TX", "lat": 32.8975, "lon": -97.0382 },
    "programs": ["PPL", "IR"],
    "primaryProgram": "PPL",
    "costBand": { "min": 14000, "max": 18000 },
    "trainingType": "Part61",
    "intensityLevel": "Part-time",
    "hasFinancing": true,
    "hasHousing": true,
    "fleetTypes": ["Piper Cherokee", "Cessna 172"],
    "instructorCount": 8,
    "averageHoursToPPL": 68,
    "trustTier": "Community-Verified",
    "preferences": ["Housing", "Financing", "Flexible timing"]
  },
  {
    "id": "school-003",
    "name": "Cloudchaser Flight Center (Phoenix, AZ)",
    "location": { "city": "Phoenix", "state": "AZ", "lat": 33.4484, "lon": -112.0742 },
    "programs": ["PPL", "CPL"],
    "primaryProgram": "PPL",
    "costBand": { "min": 11000, "max": 14000 },
    "trainingType": "Part141",
    "intensityLevel": "Intensive",
    "hasFinancing": false,
    "hasHousing": false,
    "fleetTypes": ["Cessna 172"],
    "instructorCount": 6,
    "averageHoursToPPL": 65,
    "trustTier": "Unverified",
    "preferences": ["Low cost", "Fast completion"]
  }
  // ... 4-5 more schools to reach ~7-10 total
]
```

---

## 5. AI Explanation Templates

All explanations are **pre-written templates** with dynamic substitution. This avoids API calls and ensures deterministic, fast results.

### **5.1 Template Engine**

**File**: `/src/utils/mockAIMatching.ts` → `generateMatchExplanation()`

```typescript
interface TemplateContext {
  schoolName: string;
  maxBudget: number;
  trainingGoal: string;
  location: string;
  searchRadius: number;
  matchScore: number;
  schoolLocation: string;
}

function generateMatchExplanation(context: TemplateContext): string {
  // Select template based on top 2-3 matching factors
  // Return templated string with {variable} replaced
}
```

### **5.2 Template Library**

#### **Budget-focused match:**
```
"Based on your budget of ${maxBudget} and {trainingGoal} training goal,
we recommend {schoolName} because it offers competitive pricing
({schoolMinCost}-{schoolMaxCost}) without compromising quality.
Located in {schoolLocation}, it's a practical choice for cost-conscious students."
```

#### **Location-focused match:**
```
"{schoolName} in {schoolLocation} is an excellent fit—it's only
{distance} miles from your preferred area. With {instructorCount}
experienced instructors and a {fleetType} fleet, you'll get personalized
attention close to home."
```

#### **Program-focused match:**
```
"For your {trainingGoal} training, {schoolName} is a top choice.
As a {trustTier} school, it has proven success with
{averageHoursToPPL} hours to PPL. Plus, their instructors
specialize in the {fleetType} aircraft you're interested in."
```

#### **Intensive/Flexible match:**
```
"{schoolName} offers {intensityLevel} training to fit your timeline.
At ${maxBudget} budget, you'll find it competitive, and their
flexible scheduling means you can train at your own pace."
```

#### **Multi-factor match (high score):**
```
"{schoolName} is your top match. It checks all the boxes: it's
{distance} miles away, priced at {schoolMinCost}-{schoolMaxCost}
(within your ${maxBudget} budget), offers {trainingGoal} training,
and has a reputation for {keyStrength}. This school is a standout fit."
```

#### **Lower-score recovery (transparency):**
```
"{schoolName} may not be your absolute top choice, but it deserves
consideration. While it's {distance} miles from your location,
it offers {trainingGoal} at {schoolMinCost}-{schoolMaxCost} and has
a {trustTier} status. Reach out to discuss your specific needs."
```

---

## 6. Files to Create

### **6.1 Page Component**
- **File**: `/frontend/src/pages/AIMatchingPage.tsx`
- **Responsibility**: Root page, renders wizard container or results based on route
- **Props**: None (uses React Router and Context)

### **6.2 Wizard Components**
- **File**: `/frontend/src/components/matching/StepOne.tsx`
  - **Content**: Training goals and program selection
  - **Props**: `form: UseFormReturn`, `onNext: () => void`

- **File**: `/frontend/src/components/matching/StepTwo.tsx`
  - **Content**: Budget slider and financing questions
  - **Props**: `form: UseFormReturn`, `onNext: () => void`, `onBack: () => void`

- **File**: `/frontend/src/components/matching/StepThree.tsx`
  - **Content**: Location input and search radius
  - **Props**: `form: UseFormReturn`, `onNext: () => void`, `onBack: () => void`

- **File**: `/frontend/src/components/matching/StepFour.tsx`
  - **Content**: Training preferences and checkboxes
  - **Props**: `form: UseFormReturn`, `onSubmit: () => void`, `onBack: () => void`

### **6.3 Results Component**
- **File**: `/frontend/src/components/matching/MatchResults.tsx`
- **Responsibility**: Display ranked schools with explanations
- **Props**: `matchProfile: MatchProfile`, `results: RankedSchool[]`

### **6.4 Utility Functions**
- **File**: `/frontend/src/utils/mockAIMatching.ts`
- **Exports**:
  - `calculateMatchScore(profile: MatchProfile, school: MockSchool): number`
  - `rankSchools(profile: MatchProfile, schools: MockSchool[]): RankedSchool[]`
  - `generateMatchExplanation(school: MockSchool, profile: MatchProfile): string`
  - `calculateDistance(point1: LatLon, point2: LatLon): number` (Haversine formula)

### **6.5 Type Definitions**
- **File**: `/frontend/src/types/matchProfile.ts`
- **Types**:
  ```typescript
  export interface MatchProfile {
    trainingGoal: 'PPL' | 'IR' | 'CPL' | 'ATPL' | 'Other';
    trainingTypePreference: 'Part141' | 'Part61' | 'No Preference';
    aircraftPreference: string; // e.g., "Cessna 172"
    maxBudget: number;
    financingInterest: boolean;
    militaryBenefits: boolean;
    location: {
      city: string;
      state: string;
      lat?: number;
      lon?: number;
    };
    searchRadius: number; // miles
    housingNeeded: boolean;
    intensityPreference: 'Intensive' | 'Part-time' | 'Flexible';
    preferences: string[]; // ["Low cost", "Fast completion", ...]
    priorExperience: 'None' | 'Discovery' | '10-20 hours' | '20+ hours';
  }

  export interface RankedSchool {
    school: MockSchool;
    matchScore: number;
    explanation: string;
    ranking: number; // 1-7
  }
  ```

### **6.6 Form Schema**
- **File**: `/frontend/src/schemas/matchingFormSchema.ts`
- **Tool**: Zod
- **Structure**: Separate schemas for each step to enable step-by-step validation

### **6.7 Mock Data**
- **File**: `/frontend/src/mock/mockSchools.ts`
- **Content**: 7-10 realistic mock flight schools with all required fields

### **6.8 Hook for Questionnaire State**
- **File**: `/frontend/src/hooks/useMatchingWizard.ts`
- **Purpose**: Manage wizard state, form submission, navigation between steps
- **State**:
  - `currentStep: number`
  - `formData: MatchProfile`
  - `results: RankedSchool[] | null`
  - Methods: `nextStep()`, `prevStep()`, `submitQuestionnaire()`, `reset()`

---

## 7. Step-by-Step Implementation Guide

### **Phase 1: Setup & Schema**

#### **Step 1.1: Create Type Definitions**
1. Create `/frontend/src/types/matchProfile.ts`
2. Define `MatchProfile`, `RankedSchool`, `MockSchool` interfaces
3. Ensure all fields required for scoring logic

#### **Step 1.2: Create Zod Form Schema**
1. Create `/frontend/src/schemas/matchingFormSchema.ts`
2. Define separate schemas for each step:
   - `stepOneSchema`: training goal, type, aircraft
   - `stepTwoSchema`: budget, financing, military
   - `stepThreeSchema`: location, radius, housing
   - `stepFourSchema`: intensity, preferences, experience
3. All schemas should be reusable by step components

**Example:**
```typescript
import { z } from 'zod';

export const stepOneSchema = z.object({
  trainingGoal: z.enum(['PPL', 'IR', 'CPL', 'ATPL', 'Other']),
  trainingTypePreference: z.enum(['Part141', 'Part61', 'No Preference']),
  aircraftPreference: z.string().optional(),
});

export type StepOneFormData = z.infer<typeof stepOneSchema>;
```

### **Phase 2: Mock Data**

#### **Step 2.1: Create Mock Schools Database**
1. Create `/frontend/src/mock/mockSchools.ts`
2. Hardcode 7-10 realistic schools with:
   - Varied locations across US
   - Different cost bands
   - Mix of Part141/Part61
   - Different trust tiers
   - Varied instructor counts
   - All required fields for scoring
3. Export as `MOCK_SCHOOLS` constant

#### **Step 2.2: Add Geographic Reference Data**
1. Hardcode common city/state coordinates for distance calculation
2. Or use a simple ZIP code database (CSV or JSON)

### **Phase 3: Utility Functions**

#### **Step 3.1: Implement Scoring Logic**
1. Create `/frontend/src/utils/mockAIMatching.ts`
2. Implement `calculateMatchScore()`:
   - Takes `MatchProfile` and `MockSchool`
   - Returns single numeric score (0-100)
   - Follow algorithm from Section 4.1 exactly
3. Test with sample inputs to verify logic

#### **Step 3.2: Implement Ranking**
1. Implement `rankSchools()`:
   - Takes `MatchProfile` and array of `MockSchool`
   - Returns sorted array of `RankedSchool`
   - Calls `calculateMatchScore()` for each
   - Sorts descending by score
   - Adds `ranking` (1-7)

#### **Step 3.3: Implement Explanation Generation**
1. Implement `generateMatchExplanation()`:
   - Takes `MockSchool` and `MatchProfile`
   - Selects appropriate template based on match factors
   - Substitutes variables ({schoolName}, {budget}, etc.)
   - Returns human-readable string

#### **Step 3.4: Implement Distance Calculation**
1. Implement `calculateDistance()` using Haversine formula
   - Input: two lat/lon objects
   - Output: distance in miles
   - Handle missing coordinates gracefully

**Example Haversine:**
```typescript
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959; // Earth radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
```

### **Phase 4: Custom Hook**

#### **Step 4.1: Create useMatchingWizard Hook**
1. Create `/frontend/src/hooks/useMatchingWizard.ts`
2. Manage state:
   - `currentStep` (1-4)
   - `formData` (partial MatchProfile, built up step-by-step)
   - `results` (RankedSchool[] | null)
3. Implement methods:
   - `nextStep()`: Validate current step, move to next
   - `prevStep()`: Move back (no validation needed)
   - `submitQuestionnaire()`: Call `rankSchools()`, store results
   - `updateFormData()`: Merge step data into overall form
   - `reset()`: Clear state

### **Phase 5: Step Components**

#### **Step 5.1: Create StepOne Component**
1. Create `/frontend/src/components/matching/StepOne.tsx`
2. Render:
   - Radio group for training goal (PPL, IR, CPL, ATPL, Other)
   - Radio group for training type preference
   - Optional select for aircraft
3. Use `react-hook-form` to manage form state
4. Validate on "Next" click
5. Show error messages if invalid

#### **Step 5.2: Create StepTwo Component**
1. Create `/frontend/src/components/matching/StepTwo.tsx`
2. Render:
   - MUI Slider for budget ($5k-$100k)
   - Checkbox for financing interest
   - Radio group for military benefits
3. Real-time display of current slider value
4. Validate range

#### **Step 5.3: Create StepThree Component**
1. Create `/frontend/src/components/matching/StepThree.tsx`
2. Render:
   - Text input for city/state or zip
   - MUI Slider for search radius (0-500 miles)
   - Checkbox for housing needed
3. Optional: Geocode input to lat/lon (for now, hardcode common cities)

#### **Step 5.4: Create StepFour Component**
1. Create `/frontend/src/components/matching/StepFour.tsx`
2. Render:
   - Radio group for intensity preference
   - Checkbox group for preferences (select 1-3)
   - Radio group for prior experience
3. Validate at least one preference selected

#### **Step 5.5: Navigation UI (Shared)**
1. Create `/frontend/src/components/matching/WizardNavigation.tsx` (optional helper)
2. Or embed in main `AIMatchingPage`
3. Render:
   - MUI Stepper at top (Steps 1-4 with labels)
   - Current step form
   - "Back", "Next", "Submit" buttons with proper states
   - Progress percentage or step count (e.g., "Step 2 of 4")

### **Phase 6: Results Component**

#### **Step 6.1: Create MatchResults Component**
1. Create `/frontend/src/components/matching/MatchResults.tsx`
2. Render:
   - Header: "Your Top {count} Matches Based on Your Profile"
   - For each ranked school:
     - School name (bold)
     - Location (city, state)
     - Primary program offered
     - **Match Score** (large, bold, e.g., "92%")
     - AI-generated explanation (italics or lighter color)
     - Buttons: "Learn More" (link to school profile), "Request Tour", "Message School"
   - Optional: "Refine Results" button to go back to form
3. Use MUI Card, Grid, and Typography components
4. Responsive grid (1 column on mobile, 2 on desktop if space)

#### **Step 6.2: Add Result Details (Expandable)**
1. Optional: When user clicks a school, expand to show:
   - Cost band breakdown
   - Average hours to certificate
   - Fleet types
   - Instructor count
   - Trust tier badge
   - Match breakdown (program: 20/20, budget: 25/25, location: 15/20, etc.)

### **Phase 7: Routing & Entry Points**

#### **Step 7.1: Update Router**
1. In main router (likely `App.tsx` or routing config):
   - Add route `/find-my-school` → `AIMatchingPage`
   - Add route `/find-my-school/results` → `AIMatchingPage` (same component, shows results)

#### **Step 7.2: Add Navigation Links**
1. Homepage button: "Find My School" → navigate to `/find-my-school`
2. Navigation menu: Quick link to `/find-my-school`
3. After browsing schools: "Still unsure? Let us find your perfect match" CTA

#### **Step 7.3: Handle Page Refresh on Results**
1. Store form data in React Router location state or Context
2. If user refreshes `/find-my-school/results`, either:
   - Show results from sessionStorage/Context, or
   - Redirect back to form with alert "Form expired, please start over"

### **Phase 8: Polish & Testing**

#### **Step 8.1: Test Validation**
1. Try to click "Next" with empty fields → Should show error
2. Try to click "Next" with valid data → Should advance
3. Try to go "Back" → Should preserve form data
4. Refresh mid-form → Data should persist (use Context or sessionStorage)

#### **Step 8.2: Test Scoring Determinism**
1. Submit same answers 3x → Should get identical results every time
2. Try different budget amounts → Scores should change predictably
3. Try different locations → Distance scores should vary

#### **Step 8.3: Test Results Display**
1. Verify all explanations are grammatically correct
2. Verify school names, budgets, locations are swapped in correctly
3. Test on mobile (responsive)
4. Test with long school names (text wrapping)

#### **Step 8.4: Accessibility**
1. All form fields have labels
2. Error messages tied to fields via aria-describedby
3. Stepper steps are labeled
4. Tab order makes sense

---

## 8. Acceptance Criteria

- [ ] Wizard renders on `/find-my-school` with all 4 steps visible
- [ ] Step 1: Can select training goal, training type, and aircraft
- [ ] Step 2: Budget slider works, shows current value, accepts input range $5k-$100k
- [ ] Step 3: Location text input accepts city/state, radius slider works 0-500 miles
- [ ] Step 4: Can select intensity and 1-3 preferences
- [ ] "Next" button advances step only if current step validates
- [ ] "Back" button goes to previous step without losing data
- [ ] Progress stepper updates to show current step (1/4, 2/4, etc.)
- [ ] "Submit Questionnaire" calculates match scores and ranks schools
- [ ] Results page shows 5-7 schools with match scores (0-100) and explanations
- [ ] Explanations are grammatically correct and include school name, budget, location, etc.
- [ ] Scoring is deterministic: submitting identical answers yields identical results
- [ ] Explanations template the school names and budget amounts correctly
- [ ] "Learn More", "Request Tour", "Message" buttons are present on each result card
- [ ] Mobile responsive (1 column results, readable on small screens)
- [ ] Form validates with React Hook Form + Zod
- [ ] No API calls made (all mock data)
- [ ] Demo watermark visible (if applicable)
- [ ] Can refine results (button to go back to form)

---

## 9. Design Notes

### **Component Library & Styling**
- **UI Framework**: Material-UI (MUI) v5+
- **Form**: React Hook Form + Zod validation
- **Components to Use**:
  - `MuiStepper` for progress indicator
  - `Radio` + `RadioGroup` for single-select options
  - `Slider` for budget and distance
  - `TextField` for text inputs
  - `Checkbox` + `FormGroup` for multi-select preferences
  - `Card` for result school cards
  - `Grid` for layout
  - `Button` for navigation
  - `Typography` for labels and explanations
  - `Badge` for match score or trust tier

### **Color Scheme**
- Match score: Green gradient (low scores fade, 100% is vibrant green)
- Error states: Red outline on fields
- Disabled buttons: Gray with 50% opacity
- Trust tier badges: Different colors per tier (Premier: gold, Verified: blue, Community: gray, Unverified: light gray)

### **Layout**
- **Mobile** (< 600px): Single column, large touch targets
- **Tablet** (600-960px): Two columns for results
- **Desktop** (> 960px): Three columns or two with wider cards
- **Stepper**: Horizontal on desktop, collapse labels on mobile

### **Typography**
- Headers (Steps): Bold, large (32px on desktop)
- Labels: Medium (16px), slightly lighter color
- Match Score: Very large, bold (48px, green)
- Explanation: Body (14-16px), italics or lighter color
- Button text: Bold, uppercase or sentence case

---

## 10. Future Hook Points (For OpenAI Integration)

When transitioning from DEMO to PROD mode:

### **10.1 API Call Location**
```typescript
// In mockAIMatching.ts, replace:
function generateMatchExplanation(school: MockSchool, profile: MatchProfile): string {
  if (process.env.MODE === 'PROD') {
    // Call OpenAI API:
    // const explanation = await openaiClient.createChatCompletion({
    //   model: 'gpt-3.5-turbo',
    //   messages: [{
    //     role: 'user',
    //     content: `Generate a 2-sentence explanation for why ${school.name}
    //               is a good fit for a student seeking ${profile.trainingGoal}
    //               with a budget of $${profile.maxBudget}...`
    //   }]
    // });
    // return explanation.choices[0].message.content;
  }

  // Fall back to template (DEMO mode)
  return templateExplanation(school, profile);
}
```

### **10.2 Real School Database**
```typescript
// Replace MOCK_SCHOOLS with database query:
async function getSchoolsForMatching(): Promise<School[]> {
  if (process.env.MODE === 'PROD') {
    return await fetchFromDynamoDB('schools');
  }
  return MOCK_SCHOOLS;
}
```

### **10.3 Geocoding**
```typescript
// Replace hardcoded coordinates with real geocoding:
async function geoCodeLocation(cityState: string): Promise<LatLon> {
  if (process.env.MODE === 'PROD') {
    return await googleMapsClient.geocode(cityState);
  }
  return HARDCODED_COORDINATES[cityState] || { lat: 0, lon: 0 };
}
```

### **10.4 Analytics Hook**
```typescript
// Log user profile and results for analysis:
function submitQuestionnaire(profile: MatchProfile, results: RankedSchool[]): void {
  // ...calculate results...

  if (process.env.MODE === 'PROD') {
    // analytics.track('questionnaire_completed', {
    //   goal: profile.trainingGoal,
    //   budget: profile.maxBudget,
    //   location: profile.location,
    //   topMatch: results[0].school.name,
    //   topScore: results[0].matchScore
    // });
  }

  setResults(results);
}
```

---

## 11. Testing Strategy

### **Unit Tests**
- **Test scoring algorithm** with known inputs and expected outputs
- **Test distance calculation** with known lat/lon pairs
- **Test explanation templates** for variable substitution
- **Test form validation** with valid and invalid data

**Example:**
```typescript
describe('calculateMatchScore', () => {
  it('returns 100 for perfect match (all factors aligned)', () => {
    const profile: MatchProfile = { /* budget-matched, location-matched, etc. */ };
    const school: MockSchool = { /* matches profile perfectly */ };
    expect(calculateMatchScore(profile, school)).toBe(100);
  });

  it('returns lower score when budget is mismatched', () => {
    const profile = { maxBudget: 15000, /* ... */ };
    const school = { costBand: { min: 50000, max: 60000 }, /* ... */ };
    const score = calculateMatchScore(profile, school);
    expect(score).toBeLessThan(70);
  });
});
```

### **Integration Tests**
- **Test full wizard flow**: Step 1 → Step 4 → Results
- **Test form persistence**: Fill form, go back, data should be preserved
- **Test results ranking**: Verify schools are sorted by score descending

### **E2E Tests**
- **Test user journey**: Homepage → "Find My School" → Fill form → See results

### **Manual Testing**
- **Test on mobile**: Use Chrome DevTools, test on real device
- **Test different OS**: Mac, Windows, mobile browsers
- **Test accessibility**: Navigate with keyboard only, use screen reader

---

## 12. Dependencies & Setup

### **Required Libraries (Already Installed per PR-1)**
- `react`: ^19.1.1
- `react-dom`: ^19.1.1
- `@mui/material`: (add if not present)
- `react-hook-form`: (add if not present)
- `zod`: (add if not present)
- `react-router-dom`: ^6+ (for routing)

### **Installation Command** (if needed)
```bash
npm install @mui/material @emotion/react @emotion/styled react-hook-form zod
```

### **Environment Setup**
- Ensure `.env.local` or `process.env.MODE` is set to `'DEMO'` for development
- No external API keys needed (all mock)

---

## 13. Success Metrics

### **Product Metrics**
- Completion rate: % of users who start questionnaire and see results
- Engagement: Avg time on questionnaire (should be 3-5 minutes)
- Result relevance: User clicks "Learn More" on top 3 results (proxy for satisfaction)

### **Technical Metrics**
- Load time: Results page renders in < 1 second (no API calls)
- Determinism: Same inputs always yield same outputs (100% consistency)
- Validation accuracy: Form prevents submission only when invalid

---

## 14. Example User Journey

```
User lands on homepage
  ↓
Clicks "Find My School" button
  ↓
Navigates to /find-my-school
  ↓
Sees Stepper: Step 1/4 - Training Goals
  ↓
Selects "PPL", "Part 141", "Cessna 172"
  ↓
Clicks "Next" → validates → advances to Step 2/4
  ↓
Selects budget $25,000, "Yes" to financing
  ↓
Clicks "Next" → advances to Step 3/4
  ↓
Enters "Denver, CO", sets radius 100 miles
  ↓
Clicks "Next" → advances to Step 4/4
  ↓
Selects "Intensive", checks "Fast completion", "Low cost", "Modern fleet"
  ↓
Clicks "Submit Questionnaire"
  ↓
Scoring algorithm ranks 7 mock schools
  ↓
Navigates to /find-my-school/results
  ↓
Sees:
  - Header: "Your Top 7 Matches Based on Your Profile"
  - Card 1: "SkyHigh Academy (92% Match)" with explanation
  - Card 2: "AeroFlight Training (87% Match)" with explanation
  - ... 5 more cards
  ↓
User clicks "Learn More" on top result
  ↓
Navigates to school profile page (existing feature from PR-1)
```

---

## 15. Deliverables Summary

| Deliverable | File Path | Purpose |
|---|---|---|
| **Page** | `/frontend/src/pages/AIMatchingPage.tsx` | Root page with wizard or results |
| **Step Components** | `/frontend/src/components/matching/StepOne.tsx` ... `StepFour.tsx` | Form inputs for each step |
| **Results** | `/frontend/src/components/matching/MatchResults.tsx` | Display ranked schools |
| **Scoring Logic** | `/frontend/src/utils/mockAIMatching.ts` | Score and rank schools |
| **Type Definitions** | `/frontend/src/types/matchProfile.ts` | TypeScript interfaces |
| **Form Schema** | `/frontend/src/schemas/matchingFormSchema.ts` | Zod validation |
| **Mock Data** | `/frontend/src/mock/mockSchools.ts` | 7-10 hardcoded schools |
| **Custom Hook** | `/frontend/src/hooks/useMatchingWizard.ts` | Manage wizard state |
| **Tests** | `/frontend/src/__tests__/mockAIMatching.test.ts` | Unit tests for scoring |

---

## 16. Notes for Junior Developer

### **Key Concepts to Understand**
1. **React Hook Form**: Manages form state without re-rendering entire form on every keystroke
2. **Zod**: Type-safe schema validation; catches errors before form submission
3. **Deterministic Scoring**: Same inputs → same outputs, always. Useful for DEMO and testing
4. **Template Strings**: Pre-written explanations with {variables} swapped in (not real AI)
5. **Haversine Formula**: Calculates distance between two lat/lon points on Earth

### **Common Pitfalls**
- **Forgetting to validate on "Next"**: Users will advance with empty fields
- **Not preserving form data on "Back"**: Frustrating UX
- **Hardcoding school data in components**: Put it in `/mock/mockSchools.ts` instead
- **Making API calls in DEMO mode**: This is a DEMO, no real APIs!
- **Not testing scoring algorithm**: Trust but verify your math

### **Tips**
- Start with `StepOne` component first, then use as template for others
- Test scoring logic separately before integrating into UI
- Use React DevTools to inspect form state and debug
- Read React Hook Form docs: https://react-hook-form.com/
- Read Zod docs: https://zod.dev/

### **Getting Help**
- Check existing components in `/frontend/src/components/` for patterns
- Review MUI docs for component props: https://mui.com/
- Ask questions in code comments and PRs
- Run tests locally: `npm test` (if configured)

---

## 17. Revision History

| Date | Author | Change |
|------|--------|--------|
| 2025-11-07 | Product Team | Initial PRD for PR-5 |

---

**Status**: Ready for Implementation
**Priority**: High (Conversion funnel critical path)
**Estimate**: 40-50 hours for junior developer (including testing and refinement)
