# PR-7: Financing Calculator

## Goal

Build an interactive financing calculator component that helps users estimate monthly payment obligations for flight training programs. The calculator will display loan payment estimates, showcase mock lender options, and incorporate VA benefits calculations for eligible veterans.

This is a **DEMO/MVP feature** that provides realistic calculations and visual breakdowns, with the infrastructure in place for future integration with real lending APIs.

---

## Context

### Why This Feature?

Flight training is a significant investment. Users need to understand the financial commitment before enrolling. A transparent financing calculator builds trust and helps customers make informed decisions.

### Demo Mode

This feature operates entirely in **DEMO MODE** using:
- Mock lender data (realistic but fictional companies)
- Simulated loan calculations with standard formulas
- No real API integration (designed for future enhancement)

### Key Assumptions

- Users know their credit tier (we provide simple definitions)
- VA benefit recipients know their eligibility percentage
- Simple interest calculations are sufficient for MVP (no compounding nuances)
- All rates displayed as Annual Percentage Rate (APR)

---

## Depends On

**None** - This is a standalone feature that can be developed and deployed independently. It doesn't require:
- Backend API integration
- User authentication
- Database persistence
- Other features in the roadmap

---

## Requirements

### Functional Requirements

#### 1. Input Parameters

The calculator must accept the following inputs from users:

- **Training Cost** (dollars): Range $10,000 - $250,000
  - Slider or text input
  - Display in real-time

- **Down Payment** (dollars): Range $0 - 100% of training cost
  - Cannot exceed training cost
  - Real-time validation

- **Loan Term** (months): Range 12 - 180 months (1-15 years)
  - Slider or dropdown
  - Common presets: 24, 36, 48, 60, 84 months

- **Credit Tier**: Dropdown selection
  - Excellent (≥740 credit score equivalent)
  - Good (670-739)
  - Fair (580-669)
  - Determines APR ranges for lenders

- **VA Benefits Eligibility** (optional): Percentage dropdown
  - None (0%)
  - 50% coverage
  - 75% coverage
  - 100% coverage (full benefits)

#### 2. Loan Calculation Formula

Use the standard amortized loan payment formula:

```
Monthly Payment = P × r × (1 + r)^n / ((1 + r)^n - 1)

Where:
  P = Principal (Training Cost - Down Payment)
  r = Monthly interest rate (APR / 100 / 12)
  n = Number of monthly payments (loan term in months)
```

**Example Calculation:**
- Training Cost: $50,000
- Down Payment: $10,000
- Principal (P): $40,000
- Loan Term: 60 months
- APR: 7.5%
- Monthly Rate (r): 0.075 / 12 = 0.00625

```
Monthly Payment = 40,000 × 0.00625 × (1.00625)^60 / ((1.00625)^60 - 1)
                = 40,000 × 0.00625 × 1.4533 / 0.4533
                = $799.33
```

Total Interest Paid = (Monthly Payment × n) - Principal
Total Cost = Training Cost + Total Interest - VA Benefits Applied

#### 3. Mock Lender Options

Display **3-5 mock lenders** dynamically based on selected credit tier. Each lender shows:

- **Lender Name** (fictional)
- **Logo/Icon** (placeholder or simple icon)
- **APR Range** (varies by credit tier)
- **Calculated Monthly Payment** (using formula above)
- **Total Cost Over Loan Term**
- **Estimated Total Interest**
- "Apply Now" button (links to external URL or shows modal)

Lenders should be **sorted by APR** (lowest to highest).

#### 4. VA Benefits Calculator

If VA benefits are selected:

- Apply selected percentage **before** loan calculation
- **New Training Cost = Training Cost × (1 - VA Coverage %)**
- Example: $50,000 training with 75% VA coverage = $12,500 user responsibility
- Display both:
  - Original loan amount without VA
  - Reduced loan amount with VA applied
  - Savings from VA benefits

#### 5. Visual Breakdown

Display a **clear visual summary** showing:

- **Financed Amount** (after down payment)
- **Monthly Payment** (for selected APR)
- **Total Interest Paid**
- **Total Cost to User** (including interest)
- **Time to Pay Off** (loan term in years/months)

Use one of the following for visualization:
- **Recommended**: Simple bar chart or pie chart using Recharts
- **Alternative**: HTML table with clear formatting
- **Alternative**: Card-based breakdown with large numbers and labels

#### 6. Real-Time Updates

All calculations and lender options must update **immediately** as users adjust any input parameter. No "Calculate" button required (though one is acceptable).

#### 7. Input Validation

- Down payment cannot exceed training cost
- Training cost must be positive
- Loan term must be 12-180 months
- Display helpful error messages in red text or error state
- Disable "Apply Now" buttons if inputs are invalid

---

## Mock Data

### Mock Lenders

Create a file `/src/mock/lenders.ts` with the following structure:

```typescript
interface Lender {
  id: string;
  name: string;
  logo?: string; // URL or icon key
  description: string;
  ratesByTier: {
    excellent: { min: number; max: number };
    good: { min: number; max: number };
    fair: { min: number; max: number };
  };
  features: string[]; // e.g., "No origination fee", "Fast approval"
  applyUrl: string; // Where "Apply Now" links to
}
```

#### Example Mock Lenders

1. **SkyFund Credit Union**
   - Excellent: 3.5% - 4.5%
   - Good: 5.5% - 6.5%
   - Fair: 8.5% - 9.5%
   - Features: "Member benefits", "No origination fee"

2. **CloudWings Financial**
   - Excellent: 4.0% - 5.0%
   - Good: 6.0% - 7.5%
   - Fair: 9.0% - 11.0%
   - Features: "Fast approval", "Flexible terms"

3. **AltitudeLoan Partners**
   - Excellent: 3.8% - 4.8%
   - Good: 5.8% - 7.0%
   - Fair: 8.8% - 10.5%
   - Features: "No prepayment penalty", "Loyalty discounts"

4. **PilotFinance Direct** (Optional 4th lender)
   - Excellent: 4.2% - 5.2%
   - Good: 6.5% - 8.0%
   - Fair: 9.5% - 12.0%
   - Features: "Specialized for pilots", "Deferred payments option"

5. **VeteransFirst Lending** (Optional 5th, recommend for VA customers)
   - Excellent: 3.0% - 4.0%
   - Good: 5.0% - 6.0%
   - Fair: 7.5% - 9.0%
   - Features: "VA specialist", "Military discount"

### Credit Tiers

```typescript
interface CreditTier {
  id: string;
  label: string;
  description: string;
  scoreRange: string; // e.g., "740+"
  percentile: string; // e.g., "Top 30% of borrowers"
}

const creditTiers = [
  {
    id: 'excellent',
    label: 'Excellent',
    description: 'Very strong credit history, 740+',
    scoreRange: '740+',
    percentile: 'Top 30%',
  },
  {
    id: 'good',
    label: 'Good',
    description: 'Solid credit, some minor issues',
    scoreRange: '670-739',
    percentile: 'Top 50%',
  },
  {
    id: 'fair',
    label: 'Fair',
    description: 'Average credit, some concerns',
    scoreRange: '580-669',
    percentile: 'Top 70%',
  },
];
```

### VA Benefit Tiers

```typescript
interface VABenefit {
  id: string;
  label: string;
  coveragePercentage: number;
  description: string;
}

const vaBenefits = [
  {
    id: 'none',
    label: 'Not eligible',
    coveragePercentage: 0,
    description: 'No VA benefits',
  },
  {
    id: 'fifty',
    label: '50% Service-Connected',
    coveragePercentage: 50,
    description: 'Half of training cost covered',
  },
  {
    id: 'seventyFive',
    label: '75% Service-Connected',
    coveragePercentage: 75,
    description: 'Three-quarters of training cost covered',
  },
  {
    id: 'hundred',
    label: '100% Service-Connected / Post-9/11 GI Bill',
    coveragePercentage: 100,
    description: 'Full training cost covered',
  },
];
```

---

## Files to Create

Create the following files in your React/TypeScript project:

### 1. **src/pages/FinancingCalculatorPage.tsx**
- Main page component
- Orchestrates layout and state
- Imports and combines all sub-components

### 2. **src/components/financing/LoanCalculator.tsx**
- Input form with sliders/text fields
- Training cost, down payment, loan term, credit tier inputs
- Real-time validation
- Displays calculated results

### 3. **src/components/financing/VACalculator.tsx**
- Optional VA benefits selector
- Shows VA savings calculations
- Displays reduced loan amount if VA benefits applied

### 4. **src/components/financing/LenderCard.tsx**
- Reusable component for each lender option
- Displays lender info, APR, monthly payment, total cost
- "Apply Now" button
- Styling: Material-UI Card, typography, button

### 5. **src/mock/lenders.ts**
- Export lender data array
- Export credit tier definitions
- Export VA benefit tier definitions
- Type definitions (interfaces)

### 6. **src/utils/loanCalculations.ts**
- `calculateMonthlyPayment(principal: number, apr: number, months: number): number`
- `calculateTotalInterest(monthlyPayment: number, months: number, principal: number): number`
- `calculateTotalCost(trainingCost: number, totalInterest: number, vaBenefit: number): number`
- `getApplicableLenders(creditTier: string, lenders: Lender[]): Lender[]`
- `getAPRForLender(lender: Lender, creditTier: string): number` (pick middle of range)
- Helper validation functions

---

## Step-by-Step Implementation

### Step 1: Create Loan Calculation Utility Functions

**File**: `src/utils/loanCalculations.ts`

**Tasks**:
1. Implement `calculateMonthlyPayment()` using the formula:
   - Monthly Payment = P × r × (1 + r)^n / ((1 + r)^n - 1)
   - Handle edge cases (zero principal, zero APR)
   - Return number rounded to 2 decimal places

2. Implement `calculateTotalInterest()`
   - Total Interest = (Monthly Payment × Months) - Principal

3. Implement `calculateTotalCost()`
   - Account for training cost, interest, and VA benefits

4. Implement `getAPRForLender()`
   - Given a lender and credit tier, return a realistic APR (middle of range)

5. Implement validation helper: `validateInputs()`
   - Check training cost is positive
   - Check down payment doesn't exceed training cost
   - Check loan term is 12-180 months

**Testing Notes**: Manual testing of formulas with examples is sufficient for MVP.

---

### Step 2: Create Mock Lender Data

**File**: `src/mock/lenders.ts`

**Tasks**:
1. Define TypeScript interfaces:
   - `Lender` interface with id, name, logo, rates by tier, features, applyUrl
   - `CreditTier` interface
   - `VABenefit` interface

2. Export array of 3-5 mock lenders (see Mock Data section above)

3. Export array of credit tiers

4. Export array of VA benefit options

5. Create helper functions:
   - `getLendersByTier(creditTier: string): Lender[]`
   - `getCreditTierLabel(id: string): string`

**Design Notes**:
- Keep lender names and descriptions realistic but fictional
- Vary APR ranges to show competitive differences
- Include 2-3 features per lender for realism

---

### Step 3: Build LoanCalculator Form with Sliders/Inputs

**File**: `src/components/financing/LoanCalculator.tsx`

**Tasks**:
1. Create form state using `useState()` for:
   - trainingCost (number)
   - downPayment (number)
   - loanTermMonths (number)
   - creditTier (string: 'excellent' | 'good' | 'fair')
   - vaBenefitPercentage (number)

2. Create input components using Material-UI:
   - `TextField` for Training Cost (type="number")
   - `TextField` for Down Payment (type="number")
   - `Slider` for Loan Term (12-180 months, step 1)
   - `Select` for Credit Tier
   - `Select` for VA Benefits (optional)

3. Implement real-time validation:
   - Disable form submission if invalid
   - Show error text if down payment > training cost
   - Show error text if inputs out of range

4. Add helpful labels and hints (e.g., "Down payment cannot exceed training cost")

5. Optionally add preset buttons (e.g., "Down Payment: 10%", "Down Payment: 20%")

**Styling**: Use MUI spacing, margins, and responsive design. Stack inputs vertically on mobile.

---

### Step 4: Display Calculation Results with Chart or Breakdown

**File**: `src/components/financing/LoanCalculator.tsx` (same file, new section)

**Tasks**:
1. Calculate and display in real-time:
   - **Financed Amount**: Training Cost - Down Payment
   - **Monthly Payment**: Using loan calculation formula
   - **Total Interest**: Over full loan term
   - **Total Cost to User**: Training Cost + Interest - VA Benefits
   - **Years to Pay Off**: Loan term converted to years and months

2. Choose visualization approach:
   - **Option A (Recommended)**: Use Recharts `BarChart` or `PieChart`
     - Pie: Show proportion of principal vs. interest
     - Bar: Show financed amount, interest paid, down payment
   - **Option B**: Simple HTML table with clear rows
   - **Option C**: Card-based layout with large numbers (e.g., "$799/month" in large text)

3. Use Material-UI components:
   - `Card` for the results section
   - `Typography` for labels and values
   - `Box` for layout/spacing

4. Show VA benefits impact if applicable:
   - "VA Coverage: $25,000 (50%)"
   - "Your responsibility: $25,000"

---

### Step 5: Show Mock Lender Cards Sorted by Rate

**File**: `src/components/financing/LenderCard.tsx` (new component) + `src/pages/FinancingCalculatorPage.tsx`

**Tasks**:
1. Create `LenderCard.tsx` component that displays:
   - Lender name
   - Lender logo/icon (use Material-UI `Avatar` or simple icon)
   - APR for selected credit tier (calculated from rate range)
   - Monthly payment with this lender (recalculate for their APR)
   - Total cost with this lender
   - 2-3 lender features (as list or badges)
   - "Apply Now" button (links to mock URL or shows modal)

2. In main page or calculator component:
   - Get applicable lenders for selected credit tier
   - Filter out lenders with no rates for that tier
   - **Sort lenders by APR (ascending, lowest rate first)**
   - Render array of `LenderCard` components
   - Layout: Could be grid (2-3 columns) or stacked cards

3. Lender card styling:
   - Use Material-UI `Card`, `CardContent`, `CardActions`
   - Highlight lowest-rate lender (e.g., green border)
   - Responsive: Stack on mobile, side-by-side on desktop

4. "Apply Now" button:
   - Links to lender's website (mock URL like "https://example.com/apply")
   - Opens in new tab (`target="_blank"`)
   - Or shows modal with "Coming soon" message (optional)

---

### Step 6: Add VA Calculator Section

**File**: `src/components/financing/VACalculator.tsx`

**Tasks**:
1. Create dedicated component for VA benefits:
   - Display selected VA benefit tier
   - Show coverage percentage
   - Calculate and display VA coverage amount
   - Show original vs. reduced training cost

2. Display format:
   - "Original Training Cost: $50,000"
   - "VA Coverage: 75% = $37,500"
   - "Your Responsibility: $12,500"
   - "Monthly Savings: $XX" (compared to full cost)

3. Place this section near the input form for context

4. Keep it optional (don't show if user selects "Not eligible")

5. Link it to main calculation—changes to VA selection should update all payment amounts

---

## Acceptance Criteria

Before marking this feature as complete, verify:

### Calculation Accuracy
- [ ] Monthly payment formula matches expected values (test with calculator)
- [ ] Total interest calculation is correct (Monthly Payment × Months - Principal)
- [ ] Down payment reduces financed amount appropriately
- [ ] Loan term changes affect monthly payment inversely (longer term = lower payment)

### Real-Time Updates
- [ ] Adjusting training cost updates all calculations immediately
- [ ] Adjusting down payment updates monthly payment immediately
- [ ] Changing loan term updates monthly payment immediately
- [ ] Changing credit tier updates available lenders and their rates immediately
- [ ] Selecting VA benefits reduces loan amount immediately

### Display & Clarity
- [ ] Results section shows monthly payment prominently and clearly
- [ ] Visual breakdown (chart or table) is easy to understand
- [ ] Lender cards display APR and monthly payment clearly
- [ ] Lender cards are sorted by APR (lowest first)
- [ ] VA benefits section shows savings clearly (if applicable)
- [ ] All currency values formatted as "$X,XXX.XX"

### Input Validation
- [ ] Down payment cannot exceed training cost
- [ ] Training cost must be positive (> $0)
- [ ] Loan term must be 12-180 months
- [ ] Error messages appear in red if validation fails
- [ ] Form indicates which fields are invalid

### Responsiveness
- [ ] Layout adapts to mobile, tablet, and desktop screen sizes
- [ ] All inputs are touch-friendly (adequate spacing for mobile)
- [ ] Charts/tables don't overflow on small screens

### Browser Compatibility
- [ ] Works in Chrome, Firefox, Safari, Edge
- [ ] No console errors in DevTools

---

## Design Notes

### Material-UI Components to Use

- **Inputs & Forms**:
  - `TextField` for text inputs (training cost, down payment)
  - `Slider` for loan term (more intuitive than text input for ranges)
  - `Select` / `MenuItem` for credit tier and VA benefits
  - `Button` for "Apply Now" and preset buttons

- **Layout & Containers**:
  - `Box` for spacing and layout
  - `Card` / `CardContent` / `CardActions` for lender cards and results
  - `Grid` for responsive multi-column layouts
  - `Stack` for vertical or horizontal stacking

- **Typography**:
  - `Typography` with variants: "h4" for titles, "body1" for descriptions, "h6" for card headers
  - Use `sx` prop for bold text on payment amounts

- **Data Visualization**:
  - **Recommended**: Recharts `BarChart` or `PieChart`
  - Install: `npm install recharts`
  - Alternative: Simple HTML table with MUI `Table` component

- **Icons & Images**:
  - Material-UI `Icon` or `Avatar` for lender logos
  - `CreditCardIcon`, `MoneyIcon`, `SchoolIcon` from `@mui/icons-material`

### Styling Approach

- Use MUI `sx` prop for styling (consistent with Material Design)
- Maintain consistent spacing (8px units: 8px, 16px, 24px, 32px)
- Color scheme: Primary (brand color), secondary, success (for best rates), warning/error
- Fonts: Use theme defaults (Roboto)

### Accessibility

- All form labels associated with inputs (`<label htmlFor="trainingCost">`)
- Use `aria-label` on icon buttons
- Ensure color isn't the only indicator (use icons + text for warnings)
- Test with keyboard navigation (Tab through form)

---

## Future Hook Points

This feature is designed with future integration in mind. Here's where real functionality would connect:

### 1. **Real Lender API Integration**
**File**: `src/services/lenderService.ts` (to create)

Replace mock lender data with API calls:
```typescript
// Current (mock):
const lenders = mockLenders;

// Future (real API):
const lenders = await fetchLendersFromAPI(creditTier, loanAmount, term);
```

**Affected files**: `LoanCalculator.tsx`, `src/mock/lenders.ts` → replace with service call

### 2. **Real VA Benefits Verification**
**File**: `src/services/vaService.ts` (to create)

Integrate with VA benefits API to:
- Verify user's VA eligibility
- Retrieve actual benefit percentage
- Calculate real VA benefits

**Affected files**: `VACalculator.tsx`, `FinancingCalculatorPage.tsx`

### 3. **User Authentication & Persistence**
**Files**: `src/services/authService.ts`, database integration

- Save user's financing preferences
- Pre-fill form with saved values
- Track lender applications

**Affected files**: `FinancingCalculatorPage.tsx`, `LoanCalculator.tsx`

### 4. **Credit Score Integration**
**File**: `src/services/creditService.ts` (to create)

- Fetch user's actual credit score
- Auto-select appropriate credit tier
- Show credit score improvement tips

**Affected files**: `LoanCalculator.tsx`

### 5. **Loan Application Flow**
**File**: `src/pages/LoanApplicationPage.tsx` (to create)

- Extend calculator to full application
- Collect personal info, employment, etc.
- Submit to lender API
- Track application status

**Affected files**: `LenderCard.tsx` (Apply button)

### 6. **Analytics & Tracking**
**File**: `src/services/analyticsService.ts` (to create)

Track:
- Which lenders users click
- What loan terms are most popular
- Which credit tiers represent most users

**Affected files**: All components

### 7. **Email Notifications**
**File**: `src/services/emailService.ts` (to create)

- Send comparison sheets to users
- Lender updates when rates change
- Application status emails

**Affected files**: `LenderCard.tsx`, application components

---

## Notes for Junior Developer

### Getting Started

1. **Start with Step 1**: Build the calculation utility functions first and test them with console.log
2. **Then Step 2**: Create the mock data so you have something to display
3. **Build incrementally**: Complete one step before moving to the next
4. **Test as you go**: Use React DevTools and your browser console to verify state and calculations

### Common Pitfalls to Avoid

- **Floating point errors**: When doing math with money, be careful of JavaScript's floating-point precision. Round to 2 decimals.
- **State updates**: Remember that state updates are asynchronous. If a calculation depends on multiple state values, calculate in a `useEffect` hook.
- **Unmounted component warnings**: If using API calls later, clean up with `useEffect` return function.

### Debugging Tips

- Use `console.log()` to print state values and calculation results
- Use React DevTools to inspect component state
- Test the loan formula with a known-good calculator (Google "loan calculator")
- Test form inputs with boundary values (0, max values, edge cases)

### Resources

- **Loan Formula**: https://en.wikipedia.org/wiki/Amortization_schedule
- **Material-UI Docs**: https://mui.com/
- **Recharts Docs**: https://recharts.org/
- **React Hooks**: https://react.dev/reference/react/hooks

---

## Success Metrics

Once deployed, measure success by:

1. **Feature Adoption**: % of users who interact with financing calculator
2. **Calculation Accuracy**: User feedback - are numbers reasonable?
3. **Conversion**: % of calculator users who proceed to apply
4. **Time on Page**: Users spending 2-5 minutes exploring options (good engagement)
5. **Lender Click Distribution**: Which lenders get clicked most? (Validate sorting)

---

## Questions & Clarifications

If you have questions during implementation:

1. **Calculation edge cases**: How should we handle $0 principal or 0% APR?
   - Current plan: Show $0 payment, minimal interest

2. **Down payment UI**: Should we allow percentage input or dollar amount?
   - Current plan: Dollar amount text field + optional preset buttons

3. **Lender "Apply Now"**: Should it link to external site or show modal?
   - Current plan: Open in new tab (simple, no modal needed for MVP)

4. **VA benefits**: Should user be able to toggle between scenarios (with/without)?
   - Current plan: Yes, show side-by-side comparison in results

---

**Document Version**: 1.0
**Last Updated**: November 7, 2025
**Status**: Ready for Implementation
