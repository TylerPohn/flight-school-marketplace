# PR-6: School Comparison View

---

## 1. Goal

Enable users to select **2-4 flight schools** and view them **side-by-side in a comparison table**. This feature allows prospective pilots to evaluate multiple schools against standardized criteria, making informed decisions more efficient. The comparison supports adding/removing schools dynamically and sharing comparison links via URL parameters.

---

## 2. Context

**Environment**: DEMO MODE
- All data sourced from mock store (hardcoded school data)
- No API calls or backend integration in this PR
- Uses React's local state (Context API) + URL parameters for tracking selected schools
- Intended for demonstration and frontend development purposes

**Dependencies**:
- **PR-1** (School Directory/Search Page): Provides base school list and card components
- **PR-3** (School Profile Page): Ensures individual school data structure and profile view integrity

---

## 3. Feature Requirements

### 3.1 Add to Compare - School Cards
- Display a **checkbox** on each SchoolCard component labeled "Add to Compare"
- Checkbox is enabled only when fewer than 4 schools are selected
- Checkbox is visually disabled (grayed out) when the comparison list is full and this school is not already selected
- Clicking checkbox:
  - If unchecked: adds school to comparison list
  - If checked: removes school from comparison list
- Show current selection count next to checkbox (e.g., "3/4 selected")

### 3.2 Floating Compare Bar
- **Fixed position** at the bottom of the viewport (sticky bar)
- Displays selected schools as **removable Chips** or compact cards
- Each chip shows:
  - School name
  - An "X" button to remove from comparison
- Total schools selected badge (e.g., "3 schools selected")
- **"Compare Now"** button that routes to `/compare?schools=id1,id2,id3`
- Bar appears only when at least 1 school is selected
- Smooth slide-in/out animation when schools are added/removed
- Semi-transparent background with elevation shadow

### 3.3 Comparison Page Route
- Route: `/compare?schools=id1,id2,id3`
- Parse URL query parameter `schools` (comma-separated school IDs)
- Support 2-4 school IDs in URL
- If invalid schools passed, show user-friendly error message
- Allow modification of comparison on this page (add/remove schools)

### 3.4 Comparison Table Structure

The comparison table displays the following fields as **rows**, with each selected school in a **column**:

| Field | Type | Example Value |
|-------|------|----------------|
| **School Name** | Text | "AeroFlight Academy" |
| **Location** | Text | "San Diego, CA" |
| **Trust Tier** | Badge | "Verified FSP" / "Community" / "Unverified" |
| **Programs Offered** | Chip List | PPL, IR, CPL, CFII |
| **Training Type** | Badge | "Part 141" / "Part 61" |
| **Fleet Size** | Number | "12 aircraft" |
| **Primary Aircraft** | Text List | Cessna 172, Piper Archer, Diamond DA40 |
| **Cost - PPL** | Price | "$12,500" |
| **Cost - IR (if offered)** | Price | "$5,500" |
| **Cost - CPL (if offered)** | Price | "$8,200" |
| **Estimated Hours to PPL** | Number | "65 hours" |
| **Instructor Count** | Number | "18 instructors" |
| **Financing Available** | Boolean | "Yes" / "No" |
| **School Rating** | Star / Score | "4.5/5.0 (23 reviews)" |

**First Column Structure**: The field name acts as a row header with a left-aligned label.

### 3.5 Highlight Differences
- **Highest value fields**: Use light green background (`bgcolor: '#E8F5E9'`) for best-in-class values
  - Lowest cost in each program
  - Highest instructor count
  - Highest fleet size
  - Best trust tier
  - Highest rating
- **Neutral value fields**: Normal background (no highlight)
- Highlighting helps users quickly identify standout schools

### 3.6 Navigation & Linking
- Each school column header should be a **clickable link** to that school's profile page (`/schools/:schoolId`)
- Allow users to drill down from comparison table to individual school details

### 3.7 URL Parameter Handling
- When schools are added/removed on the comparison page, update the URL in real-time
- Allows users to **share comparison links** with peers or advisors
- Permalink format: `/compare?schools=school-id-1,school-id-2,school-id-3`

---

## 4. Files to Create

| File | Purpose |
|------|---------|
| **`src/hooks/useComparison.ts`** | Custom hook for comparison state management (add/remove schools, max 4 enforcement) |
| **`src/components/CompareBar.tsx`** | Floating bottom bar showing selected schools with remove buttons and "Compare Now" CTA |
| **`src/pages/ComparisonPage.tsx`** | Full-page comparison table view with editable school selection |
| **`src/components/SchoolCard.tsx` (update)** | Add "Add to Compare" checkbox to existing card |

---

## 5. Step-by-Step Implementation Guide

### Step 1: Create Comparison Hook (`useComparison.ts`)

**File**: `src/hooks/useComparison.ts`

**Responsibilities**:
- Manage selected schools list in state (max 4)
- Provide `addSchool(id)` function
- Provide `removeSchool(id)` function
- Provide `clearComparison()` function
- Provide `getSelectedSchools()` getter
- Provide `isSchoolSelected(id)` checker
- Enforce max 4 schools limit
- Initialize from URL params if provided

**Hook Signature**:
```typescript
interface UseComparisonReturn {
  selectedSchools: School[];
  addSchool: (schoolId: string) => boolean; // returns true if added, false if at max
  removeSchool: (schoolId: string) => void;
  clearComparison: () => void;
  isSchoolSelected: (schoolId: string) => boolean;
  count: number;
  maxCount: number;
}

function useComparison(): UseComparisonReturn
```

**Implementation Notes**:
- Use React Context (create context file: `src/context/ComparisonContext.tsx`)
- Wrap App component with ComparisonProvider
- Use `useSearchParams()` from React Router to sync with URL
- On mount, parse `?schools=` query param and populate selected schools
- On selected schools change, update URL params (without page reload)

---

### Step 2: Update SchoolCard Component

**File**: `src/components/SchoolCard.tsx` (existing file)

**Changes**:
- Import `useComparison` hook
- Add checkbox input before the card content
- Label: "Add to Compare"
- Checkbox state tied to `isSchoolSelected(schoolId)`
- Disable checkbox when `count === 4 && !isSchoolSelected(schoolId)`
- Show selection counter (e.g., "3/4")
- Handle checkbox change with `addSchool()` / `removeSchool()`

**Visual Treatment**:
- Checkbox and label in top-right corner of card (or near action buttons)
- Consider adding a subtle border/highlight when a school is selected for comparison
- Use MUI Checkbox component

**Example JSX snippet**:
```tsx
<Checkbox
  checked={isSchoolSelected(school.id)}
  onChange={(e) => {
    if (e.target.checked) {
      addSchool(school.id);
    } else {
      removeSchool(school.id);
    }
  }}
  disabled={count === 4 && !isSchoolSelected(school.id)}
  label={`Add to Compare (${count}/${maxCount})`}
/>
```

---

### Step 3: Build Floating CompareBar Component

**File**: `src/components/CompareBar.tsx`

**Responsibilities**:
- Display fixed bar at bottom of viewport
- Show list of selected schools as removable Chips
- Display "X schools selected" summary
- "Compare Now" button routes to comparison page
- Only render when `selectedSchools.length > 0`

**Structure**:
```
┌────────────────────────────────────────────────────┐
│  Selected Schools: [School 1 X] [School 2 X] [School 3 X]    [Compare Now]  │
│  3/4 schools selected                                                           │
└────────────────────────────────────────────────────┘
```

**Features**:
- Use MUI Paper, Chip, Button components
- Position: `fixed`, `bottom: 0`, `left: 0`, `right: 0`
- Background: semi-transparent (e.g., `rgba(255, 255, 255, 0.95)`)
- Box shadow for elevation
- Z-index high enough to appear over other content
- Smooth animation on enter/exit (use framer-motion or CSS transitions)

**Button Behavior**:
- "Compare Now" generates URL `/compare?schools=id1,id2,id3` and navigates
- Each Chip has delete icon to remove school from comparison
- Clicking delete triggers `removeSchool()`

---

### Step 4: Create ComparisonPage Component

**File**: `src/pages/ComparisonPage.tsx`

**Responsibilities**:
- Parse `?schools=` query parameter
- Validate school IDs exist in mock store
- Display comparison table with schools as columns
- Handle errors (invalid IDs, less than 2 schools, more than 4 schools)
- Allow users to modify comparison (add/remove schools dynamically)
- Update URL when comparison changes

**Page Layout**:
```
┌─────────────────────────────────────────┐
│  School Comparison                      │ (heading)
│  Comparing 3 schools                    │ (subtitle)
├─────────────────────────────────────────┤
│  (Comparison Table)                     │
│                                         │
│  Metric          | School A | School B | School C |
│  ─────────────────────────────────────  │
│  Location        | San Diego, CA | ...│
│  Programs        | PPL, IR, CPL | ... │
│  Cost - PPL      | $12,500 | $13,200 | $11,800 |
│  ... (more rows) │         │         │         │
│                                         │
└─────────────────────────────────────────┘
```

**Error States**:
- Less than 2 schools: Show message "Please select at least 2 schools to compare" with link back to directory
- More than 4 schools in URL: Truncate to first 4 and notify user
- Invalid school IDs: Show message "One or more schools could not be found" with link to directory

---

### Step 5: Implement Difference Highlighting

**Highlighting Logic**:

For each row in the comparison table, identify the "best" value and apply green background:

1. **Cost fields** (Cost - PPL, Cost - IR, Cost - CPL):
   - Best = **lowest price**
   - Highlight: `bgcolor: '#E8F5E9'` (light green)

2. **Fleet Size**:
   - Best = **highest count**
   - Highlight: `bgcolor: '#E8F5E9'`

3. **Instructor Count**:
   - Best = **highest count**
   - Highlight: `bgcolor: '#E8F5E9'`

4. **Rating**:
   - Best = **highest rating**
   - Highlight: `bgcolor: '#E8F5E9'`

5. **Trust Tier**:
   - Best = **"Premier" > "Verified FSP" > "Community" > "Unverified"**
   - Highlight the cell with best tier: `bgcolor: '#E8F5E9'`

6. **Estimated Hours to PPL**:
   - Best = **lowest hours**
   - Highlight: `bgcolor: '#E8F5E9'`

7. **Other fields** (School Name, Location, Programs, Training Type, Aircraft, Financing):
   - No highlighting (these are qualitative, not comparative)

**Implementation**:
- Create helper function `getBestValueIndex(fieldName, values: number[]): number`
- In table cell rendering, check if current cell is the best value
- Apply conditional styling using MUI `sx` prop

---

### Step 6: URL Parameter Handling

**Sync Strategy**:

1. **On mount** (`useEffect` in ComparisonPage):
   - Parse `?schools=` from `useSearchParams()`
   - Validate each school ID
   - Load school data from mock store
   - Display table

2. **On school add/remove**:
   - Update `useComparison` hook state
   - Generate new URL: `/compare?schools=id1,id2,id3`
   - Call `setSearchParams()` to update URL (no full page reload)

3. **Shareable links**:
   - User can copy the URL and share with others
   - When peer opens link, they see the same comparison

**Code Example**:
```typescript
const [searchParams, setSearchParams] = useSearchParams();
const schoolIds = searchParams.get('schools')?.split(',') || [];

// When schools change:
const newSchoolIds = selectedSchools.map(s => s.id).join(',');
setSearchParams({ schools: newSchoolIds });
```

---

## 6. Acceptance Criteria

A junior developer can verify completion by checking:

- [ ] **Add to Compare Checkbox Works**:
  - Checkbox appears on all SchoolCard components
  - Clicking checkbox adds school to comparison
  - Max 4 schools enforced (checkbox disabled when full)
  - Unchecking removes school from comparison
  - Selection count displays correctly (e.g., "2/4")

- [ ] **Floating CompareBar Displays Correctly**:
  - Bar appears only when at least 1 school selected
  - Selected schools display as removable Chips
  - "Compare Now" button navigates to comparison page with correct URL
  - Each chip's delete button removes school from comparison
  - Bar smoothly slides in/out with animations

- [ ] **ComparisonPage Renders Table**:
  - Route `/compare?schools=id1,id2` loads and displays comparison table
  - Schools display as columns
  - All required metrics display as rows
  - URL updates when schools are added/removed on this page

- [ ] **Highlighting Works**:
  - Lowest cost in each program column is highlighted green
  - Highest instructor count is highlighted green
  - Highest fleet size is highlighted green
  - Best trust tier is highlighted green
  - Highest rating is highlighted green
  - Other fields have no highlighting

- [ ] **School Links Work**:
  - Clicking school name in column header navigates to that school's profile page
  - Links use correct format: `/schools/:schoolId`

- [ ] **URL Sharing Works**:
  - Comparison link can be copied and shared
  - Opening shared link in new browser displays same comparison
  - URL updates when schools are added/removed

- [ ] **Error Handling**:
  - Less than 2 schools: friendly error message + link to directory
  - Invalid school IDs: friendly error message + link to directory
  - More than 4 schools: truncate to first 4 + notification

- [ ] **No Console Errors**:
  - React warnings or errors in console: 0
  - TypeScript type errors: 0

---

## 7. Design & Component Notes

### MUI Components to Use
- **MUI Table**: `<Table>`, `<TableHead>`, `<TableBody>`, `<TableRow>`, `<TableCell>`
- **MUI Checkbox**: `<Checkbox>` for school selection on cards
- **MUI Chip**: `<Chip>` for school pills in CompareBar and chip lists
- **MUI Paper**: `<Paper>` for CompareBar background
- **MUI Button**: `<Button>` for "Compare Now" and remove buttons
- **MUI Badge**: `<Chip variant="outlined"` for Trust Tier display
- **MUI Box**: `<Box>` for layout and spacing

### Sticky/Fixed Positioning
- CompareBar uses `position: fixed`
- Add padding to page bottom to avoid content overlap: `paddingBottom: { xs: '120px', sm: '80px' }`
- Apply to pages that show CompareBar (all pages when schools selected)

### Responsive Behavior
- **Desktop (md+)**: Full table with all columns visible
- **Tablet (sm)**: Horizontal scroll on table if necessary
- **Mobile (xs)**: Consider collapsible column groups or stacked layout (optional for MVP)
- CompareBar adjusts font size and spacing for mobile

### Color Scheme
- **Highlight color**: `#E8F5E9` (light green) for best values
- **Disabled state**: `#BDBDBD` (gray) for disabled checkboxes
- **Bar background**: `rgba(255, 255, 255, 0.95)` with dark border
- Use theme colors from MUI theme (configured in App.tsx)

### Typography
- **Table header**: Bold, slightly larger font
- **Row labels**: Left-aligned, consistent width
- **Data cells**: Center-aligned for easy comparison
- **School names**: Bold in column headers, clickable links

### Spacing & Layout
- Comparison table margin: `24px` top/bottom, `16px` left/right
- CompareBar internal padding: `12px` horizontal, `8px` vertical
- Chip spacing in bar: `8px` between chips
- Table cell padding: `12px` (MUI default)

---

## 8. Exact Table Structure & Fields to Compare

### Table Layout

```
┌──────────────────────┬─────────────────┬─────────────────┬─────────────────┐
│ Metric               │ School A        │ School B        │ School C        │
├──────────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ Location             │ San Diego, CA   │ Phoenix, AZ     │ Austin, TX      │
├──────────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ Trust Tier           │ Verified FSP    │ Unverified      │ Community       │
├──────────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ Programs Offered     │ PPL, IR, CPL    │ PPL, IR         │ PPL, IR, CPL    │
├──────────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ Training Type        │ Part 141        │ Part 61         │ Part 141        │
├──────────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ Fleet Size           │ 12 aircraft     │ 8 aircraft      │ 15 aircraft     │
├──────────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ Primary Aircraft     │ C172, PA28, DA40│ C172, PA28      │ C172, SR22      │
├──────────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ Cost - PPL           │ $12,500         │ $11,800 [BEST]  │ $13,200         │
├──────────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ Cost - IR (if PPL+IR)│ $5,500          │ $6,200          │ $5,200 [BEST]   │
├──────────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ Cost - CPL (if CPL)  │ $8,200          │ Not Offered     │ $7,800 [BEST]   │
├──────────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ Est. Hours to PPL    │ 65 hours        │ 72 hours        │ 60 hours [BEST] │
├──────────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ Instructor Count     │ 18 instructors  │ 10 instructors  │ 22 [BEST]       │
├──────────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ Financing Available  │ Yes             │ Yes             │ No              │
├──────────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ School Rating        │ 4.5/5.0 (23 rev)│ 4.2/5.0 (18 rev)│ 4.7/5.0 [BEST]  │
└──────────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

### Fields in Comparison (in order)

1. **School Name** (column header, clickable link)
2. **Location** (City, State)
3. **Trust Tier** (Premier / Verified FSP / Community / Unverified)
4. **Programs Offered** (List of: PPL, IR, CPL, CFII, ATPL)
5. **Training Type** (Part 141 / Part 61)
6. **Fleet Size** (Number of aircraft)
7. **Primary Aircraft** (List, comma-separated: Cessna 172, Piper Archer, etc.)
8. **Cost - PPL** (Dollar amount, highlights lowest)
9. **Cost - IR** (Only if IR program offered, highlights lowest)
10. **Cost - CPL** (Only if CPL program offered, highlights lowest)
11. **Estimated Hours to PPL** (Number, highlights lowest)
12. **Instructor Count** (Number, highlights highest)
13. **Financing Available** (Yes / No)
14. **School Rating** (X.X/5.0 (N reviews), highlights highest)

### Conditional Rows
- **Cost - IR**: Only display if **at least one school** offers IR program
- **Cost - CPL**: Only display if **at least one school** offers CPL program

---

## 9. Implementation Notes for Junior Developers

### How to Think About State Management
- **Comparison state** (selected schools) lives in a Context
- Context Provider wraps entire App
- Any component (SchoolCard, CompareBar, ComparisonPage) can read/write to this state
- Think of it as a "shopping cart" for flight schools

### How to Handle URL Params
- URL params are a "bookmark" or "link" to a specific comparison
- When user adds school on comparison page, update URL so they can share link
- When user opens page fresh with URL params, initialize state from URL
- Sync is two-way: URL ↔ State

### How to Highlight Best Values
- For each metric row, find the school with the "best" value
- "Best" meaning depends on metric (lowest cost, highest rating, etc.)
- Apply green background to that cell
- This visual aid helps users quickly identify standout schools

### How to Structure Table Data
- Table is not a component—it's layout
- Each row is a different metric
- Each column is a different school
- First column is row label, rest are data

### Common Pitfalls to Avoid
1. **Forgetting to wrap App with ComparisonProvider**: State won't propagate
2. **Not syncing URL**: User can't share comparison links
3. **Highlighting all cells**: Should only highlight the "best" cell per row
4. **Allowing more than 4 schools**: UI should prevent this at checkbox level
5. **Not validating schools exist**: Invalid URLs should show friendly errors
6. **Hardcoding school data**: Always pull from mock store (check PR-1 for structure)

---

## 10. Future Hook Points

The following are intentional extension points where the comparison feature might be enhanced in future PRs:

### 10.1 Save Comparison to User Account
- **Future PR**: Add "Save This Comparison" button that stores comparison to user's profile
- **Requires**: User authentication (PR-X), backend storage (DynamoDB)
- **Hook**: ComparisonPage component can be extended with save logic
- **Data structure**: Store array of school IDs + metadata (created date, user notes)
- **UI**: "Saved Comparisons" section in user dashboard

### 10.2 Add Notes to Comparison
- **Future PR**: Allow users to annotate each school with personal notes
- **Example**: "Called admissions, they said..." or "Best price for PPL"
- **Hook**: Add notes state to useComparison hook
- **Storage**: Could persist to localStorage (client-side) or user account (server-side)
- **UI**: Small note icon in each column header, opens modal for editing

### 10.3 Export Comparison
- **Future PR**: Download comparison as PDF or CSV
- **Hook**: Add export functions to ComparisonPage
- **Libraries**: Use `pdfkit` or `react-pdf` for PDF generation
- **UI**: "Export as PDF" and "Export as CSV" buttons above table

### 10.4 Compare More Than 4 Schools
- **Future PR**: Allow unlimited school comparison in side-by-side table
- **Challenge**: Table becomes very wide on larger comparisons
- **Solution**: Implement horizontal scrolling or column visibility toggles
- **Hook**: Change `maxCount` in useComparison from 4 to unlimited

### 10.5 AI-Powered Summary
- **Future PR**: Summarize comparison with AI insights
- **Example**: "School A is best for cost, School B has best training outcomes"
- **Requires**: OpenAI API integration (PR-X)
- **Hook**: Add button in ComparisonPage to fetch AI summary
- **UI**: Summary panel above or below table

### 10.6 Weighted Scoring
- **Future PR**: Let users weight different metrics and get a total score
- **Example**: User cares most about cost (weight 50%) and location (weight 30%)
- **Hook**: Add scoring logic to comparison table
- **UI**: Slider controls to set weights, final score column

### 10.7 Historical Comparison Tracking
- **Future PR**: Track how schools' costs/programs change over time
- **Requires**: Historical data snapshots in backend
- **Hook**: Add date picker to ComparisonPage to view past comparisons
- **UI**: Date range selector, price/metric trend mini-charts

---

## 11. Mock Data Structure Reference

Use the following mock school data structure (from PR-1 School Directory):

```typescript
interface School {
  id: string; // e.g., "school-001"
  name: string; // e.g., "AeroFlight Academy"
  location: {
    city: string;
    state: string;
    zip?: string;
  };
  programs: Array<'PPL' | 'IR' | 'CPL' | 'CFII' | 'ATPL'>;
  trainingType: 'Part141' | 'Part61';
  fleetSize: number; // e.g., 12
  primaryAircraft: string[]; // e.g., ["Cessna 172", "Piper Archer"]
  costBand: {
    ppl: number; // e.g., 12500
    ir?: number; // optional
    cpl?: number; // optional
  };
  estimatedHoursToPPL: number; // e.g., 65
  instructorCount: number; // e.g., 18
  financingAvailable: boolean;
  trustTier: 'Premier' | 'VerifiedFSP' | 'Community' | 'Unverified';
  rating: {
    score: number; // e.g., 4.5
    reviewCount: number; // e.g., 23
  };
  // ... other fields
}
```

Ensure your comparison table logic handles optional fields gracefully (e.g., if IR cost not defined, show "Not Offered").

---

## 12. Testing Checklist

Before marking as complete, verify:

- [ ] Can add schools to comparison (1-4)
- [ ] Cannot add 5th school (checkbox disabled)
- [ ] Can remove schools from comparison
- [ ] Floating bar appears/disappears correctly
- [ ] "Compare Now" button generates correct URL
- [ ] Comparison page loads with URL params
- [ ] Invalid URLs show friendly errors
- [ ] Table displays all metrics correctly
- [ ] Lowest cost rows are highlighted green
- [ ] Highest instructor count is highlighted green
- [ ] School name links navigate to profile
- [ ] URL updates when schools added/removed
- [ ] Shared comparison link works
- [ ] No console errors or TypeScript errors
- [ ] Responsive on mobile/tablet/desktop

---

## 13. Commit Message Template

When ready to commit (after this PR):

```
feat: add school comparison view

- Add useComparison hook for state management
- Add CompareBar floating component for school selection
- Create ComparisonPage with side-by-side table
- Add compare checkbox to SchoolCard
- Implement difference highlighting for best values
- Support 2-4 school comparisons with URL sharing

Depends on: PR-1, PR-3
```

---

## 14. Questions for Clarification

If uncertain about any requirements, ask your tech lead:

1. **Mobile table layout**: Should comparison table stack schools vertically on mobile, or use horizontal scroll?
2. **Animation preference**: Slide-in animation for CompareBar, or fade-in?
3. **Highlight color**: Is `#E8F5E9` (light green) the right shade, or use theme primary color?
4. **Max schools**: Confirmed 4 is the limit, or should it be higher for future flexibility?
5. **Optional programs**: Should Cost-IR/CPL rows appear only if offered, or always show "Not Offered"?
6. **Share button**: Should there be an explicit "Copy Link" button on ComparisonPage, or just show URL bar?

---

## 15. Recommended Reading

- React Router v6 `useSearchParams`: https://reactrouter.com/en/main/hooks/use-search-params
- MUI Table Documentation: https://mui.com/material-ui/react-table/
- React Context API: https://react.dev/reference/react/useContext
- Responsive Design: Check existing MUI theme breakpoints in `src/theme/` (from PR-1)

---

**Written for**: Junior Developers
**Estimated Effort**: 2-3 days (8-24 hours)
**Difficulty**: Intermediate (Context API, Router params, Table layouts)
**Review**: Tech lead code review required before merge

