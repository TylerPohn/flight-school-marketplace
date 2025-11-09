# PR-1: School Listing Page with Mock Data

## Goal

Display a responsive grid/list of flight schools using hardcoded mock data. This page will serve as the primary landing view for browsing available flight schools in the marketplace.

## Context

This is a **DEMO MODE vaporware prototype** - not a production system. This means:

- **No backend API**: All data is hardcoded mock data
- **No database**: Everything lives in a TypeScript file
- **No authentication**: Not needed for this prototype
- **Mock data only**: We're simulating what real data would look like
- **Responsive UI**: Should work on desktop, tablet, and mobile

The goal of this prototype is to demonstrate the user experience and validate the interface design before building any backend infrastructure.

## Requirements

### Functional Requirements

1. **Display Mock Schools**: Show 10-15 diverse flight schools in a grid layout
2. **Show School Information**:
   - School name
   - Location (city and state)
   - Programs offered (e.g., "Private Pilot", "Commercial Pilot")
   - Cost range (e.g., "$50,000 - $75,000")
   - Trust tier badge (Verified, Trusted, Premium)
3. **Responsive Grid**: Display 1 column on mobile, 2 columns on tablet, 3 columns on desktop
4. **Interactive Cards**: Cards should be hoverable with subtle visual feedback
5. **Dark Mode**: Use Material-UI dark theme throughout

### Technical Requirements

1. **Use Material-UI (MUI)**: Grid2 for layout, Card for school display, Typography for text
2. **TypeScript**: All code must be fully typed
3. **Mock Data File**: Separate file for mock data that can be easily replaced with API calls later
4. **Responsive Design**: Mobile-first approach, works on all screen sizes
5. **Code Structure**: Follow the folder structure defined in "Files to Create" section

## Mock Data Structure

### TypeScript Interface

Create a `School` interface that represents a flight school:

```typescript
// src/types/school.ts

export type TrustTier = 'verified' | 'trusted' | 'premium';

export interface School {
  id: string;
  name: string;
  city: string;
  state: string;
  programs: string[];
  costMin: number;
  costMax: number;
  trustTier: TrustTier;
  rating: number;
  studentsCount: number;
}
```

### Example Mock Data

```typescript
// src/mock/schools.ts

import { School } from '../types/school';

export const mockSchools: School[] = [
  {
    id: 'school-001',
    name: 'SkyPath Aviation Academy',
    city: 'Phoenix',
    state: 'AZ',
    programs: ['Private Pilot', 'Commercial Pilot'],
    costMin: 50000,
    costMax: 75000,
    trustTier: 'premium',
    rating: 4.8,
    studentsCount: 245,
  },
  {
    id: 'school-002',
    name: 'Coastal Flight Training',
    city: 'San Diego',
    state: 'CA',
    programs: ['Private Pilot', 'Instrument Rating'],
    costMin: 45000,
    costMax: 65000,
    trustTier: 'trusted',
    rating: 4.6,
    studentsCount: 189,
  },
  {
    id: 'school-003',
    name: 'Midwest Pilot School',
    city: 'Kansas City',
    state: 'MO',
    programs: ['Private Pilot'],
    costMin: 40000,
    costMax: 55000,
    trustTier: 'verified',
    rating: 4.4,
    studentsCount: 156,
  },
  {
    id: 'school-004',
    name: 'Blue Skies Flight Academy',
    city: 'Atlanta',
    state: 'GA',
    programs: ['Private Pilot', 'Commercial Pilot', 'Instrument Rating'],
    costMin: 55000,
    costMax: 80000,
    trustTier: 'premium',
    rating: 4.7,
    studentsCount: 312,
  },
  {
    id: 'school-005',
    name: 'Northeast Aviation Institute',
    city: 'Boston',
    state: 'MA',
    programs: ['Private Pilot'],
    costMin: 60000,
    costMax: 85000,
    trustTier: 'trusted',
    rating: 4.5,
    studentsCount: 203,
  },
  {
    id: 'school-006',
    name: 'Rocky Mountain Flight Center',
    city: 'Denver',
    state: 'CO',
    programs: ['Private Pilot', 'Commercial Pilot'],
    costMin: 48000,
    costMax: 70000,
    trustTier: 'verified',
    rating: 4.3,
    studentsCount: 142,
  },
  {
    id: 'school-007',
    name: 'Golden Gate Aviation',
    city: 'San Francisco',
    state: 'CA',
    programs: ['Private Pilot', 'Commercial Pilot', 'Instrument Rating', 'Multi-Engine'],
    costMin: 70000,
    costMax: 110000,
    trustTier: 'premium',
    rating: 4.9,
    studentsCount: 428,
  },
  {
    id: 'school-008',
    name: 'Sunshine Flight Training',
    city: 'Miami',
    state: 'FL',
    programs: ['Private Pilot'],
    costMin: 42000,
    costMax: 58000,
    trustTier: 'verified',
    rating: 4.2,
    studentsCount: 124,
  },
  {
    id: 'school-009',
    name: 'Pacific Northwest Pilots',
    city: 'Seattle',
    state: 'WA',
    programs: ['Private Pilot', 'Instrument Rating'],
    costMin: 52000,
    costMax: 72000,
    trustTier: 'trusted',
    rating: 4.6,
    studentsCount: 198,
  },
  {
    id: 'school-010',
    name: 'Texas Air Academy',
    city: 'Dallas',
    state: 'TX',
    programs: ['Private Pilot', 'Commercial Pilot', 'Instrument Rating'],
    costMin: 48000,
    costMax: 68000,
    trustTier: 'verified',
    rating: 4.4,
    studentsCount: 167,
  },
  {
    id: 'school-011',
    name: 'Liberty Flight School',
    city: 'New York',
    state: 'NY',
    programs: ['Private Pilot', 'Commercial Pilot'],
    costMin: 65000,
    costMax: 95000,
    trustTier: 'trusted',
    rating: 4.7,
    studentsCount: 256,
  },
  {
    id: 'school-012',
    name: 'Desert Wings Aviation',
    city: 'Las Vegas',
    state: 'NV',
    programs: ['Private Pilot', 'Multi-Engine'],
    costMin: 55000,
    costMax: 75000,
    trustTier: 'verified',
    rating: 4.5,
    studentsCount: 189,
  },
  {
    id: 'school-013',
    name: 'Midwest Excellence Flight Center',
    city: 'Chicago',
    state: 'IL',
    programs: ['Private Pilot', 'Commercial Pilot', 'Instrument Rating'],
    costMin: 50000,
    costMax: 72000,
    trustTier: 'premium',
    rating: 4.8,
    studentsCount: 334,
  },
  {
    id: 'school-014',
    name: 'Evergreen Aviation Academy',
    city: 'Portland',
    state: 'OR',
    programs: ['Private Pilot'],
    costMin: 45000,
    costMax: 62000,
    trustTier: 'trusted',
    rating: 4.4,
    studentsCount: 178,
  },
  {
    id: 'school-015',
    name: 'Sunbelt Flight Training Center',
    city: 'Austin',
    state: 'TX',
    programs: ['Private Pilot', 'Commercial Pilot', 'Instrument Rating', 'Multi-Engine'],
    costMin: 52000,
    costMax: 78000,
    trustTier: 'premium',
    rating: 4.7,
    studentsCount: 295,
  },
];
```

## Files to Create

You will create the following files in the frontend directory:

1. **`src/types/school.ts`** - TypeScript interfaces for School data
2. **`src/mock/schools.ts`** - Mock data with 15 flight schools
3. **`src/components/SchoolCard.tsx`** - Reusable component to display a single school
4. **`src/pages/SchoolListingPage.tsx`** - Main page component that displays all schools
5. **Update `src/App.tsx`** - Add routing to show the new page

## Step-by-Step Implementation Guide

Follow these steps in order. Each step builds on the previous one.

### Step 1: Create TypeScript Interface

**File:** `src/types/school.ts`

**Goal:** Define the shape of school data so TypeScript can help catch errors.

**What to do:**
1. Create a new folder `src/types` if it doesn't exist
2. Create a new file `school.ts` in that folder
3. Copy the TypeScript interface code from the "Mock Data Structure" section above
4. Save the file

**Why:** TypeScript interfaces ensure all school data has the same shape and structure. This prevents bugs and makes the code more readable.

**Acceptance:** File exists and contains the `School` interface and `TrustTier` type.

### Step 2: Create Mock Data

**File:** `src/mock/schools.ts`

**Goal:** Create hardcoded data representing 15 flight schools with realistic information.

**What to do:**
1. Create a new folder `src/mock` if it doesn't exist
2. Create a new file `schools.ts` in that folder
3. Import the `School` interface from `src/types/school.ts`
4. Copy the example mock data from the "Mock Data Structure" section above
5. Make sure each school has all required fields (id, name, city, state, programs, costMin, costMax, trustTier, rating, studentsCount)

**Tips:**
- Use realistic school names
- Vary the trust tiers (mix of 'verified', 'trusted', 'premium')
- Use real US cities and states
- Mix up the programs offered (not all schools should have the same programs)
- Cost ranges should be realistic for flight training ($40k-$110k range)
- Ratings between 4.2 and 4.9
- Student counts between 100 and 500

**Acceptance:** File exists, contains 15 schools, and the data matches the `School` interface.

### Step 3: Create SchoolCard Component

**File:** `src/components/SchoolCard.tsx`

**Goal:** Create a reusable component that displays one school as a Material-UI Card.

**What to do:**
1. Create a new folder `src/components` if it doesn't exist
2. Create a new file `SchoolCard.tsx` in that folder
3. Import necessary Material-UI components:
   - `Card` - Container for the card
   - `CardContent` - Content area inside the card
   - `Typography` - Text elements
   - `Chip` - For displaying programs and trust tier badge
4. Import the `School` interface from `src/types/school.ts`
5. Create a React component that accepts a school as a prop:
   ```typescript
   interface SchoolCardProps {
     school: School;
   }

   export function SchoolCard({ school }: SchoolCardProps) {
     // Your code here
   }
   ```

**Display structure:**
```
┌─────────────────────────────────────────┐
│ School Name                              │
│ City, State                              │
│                                          │
│ Programs: [Chip] [Chip] [Chip]           │
│                                          │
│ Cost Range: $XX,000 - $XX,000            │
│ Rating: 4.8 | Students: 245              │
│                                          │
│ [Trust Tier Badge]                       │
└─────────────────────────────────────────┘
```

**Design Details:**

- **Trust Tier Colors:**
  - `verified`: Grey/neutral color
  - `trusted`: Blue color
  - `premium`: Gold/amber color

- **Trust Tier Badges:**
  - Use MUI Chip component
  - Display the trust tier name with proper capitalization
  - Apply color based on tier

- **Programs:**
  - Display each program in a small Chip component
  - If more than 3 programs, show first 3 and "+X more"

- **Styling:**
  - Use `sx` prop for Material-UI styling
  - Add hover effect (slight elevation change)
  - Padding: 20px inside the card
  - White/light text on dark background

**Acceptance:** Component renders a single school with all information displayed nicely. Card has hover effects.

### Step 4: Create SchoolListingPage Component

**File:** `src/pages/SchoolListingPage.tsx`

**Goal:** Create the main page that displays all schools in a responsive grid.

**What to do:**
1. Create a new folder `src/pages` if it doesn't exist
2. Create a new file `SchoolListingPage.tsx` in that folder
3. Import necessary Material-UI components:
   - `Container` - Constrains content width
   - `Grid2` - Layout grid system
   - `Typography` - For page title
4. Import the `mockSchools` data from `src/mock/schools.ts`
5. Import the `SchoolCard` component from `src/components/SchoolCard.tsx`
6. Create the component structure:

```typescript
import { Container, Grid2, Typography } from '@mui/material';
import { mockSchools } from '../mock/schools';
import { SchoolCard } from '../components/SchoolCard';

export function SchoolListingPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Flight Schools Marketplace
      </Typography>

      <Grid2 container spacing={3} size="grow">
        {mockSchools.map((school) => (
          <Grid2 key={school.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <SchoolCard school={school} />
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
}
```

**Key Points:**
- `Container` wraps everything with max width of "lg" (1200px)
- `Grid2 container` is the grid layout system
- `spacing={3}` adds 24px gap between grid items
- `size={{ xs: 12, sm: 6, md: 4 }}` makes it responsive:
  - `xs: 12` = 1 column on mobile (full width)
  - `sm: 6` = 2 columns on tablet (50% width each)
  - `md: 4` = 3 columns on desktop (33.33% width each)
- `.map()` iterates through all schools and renders a SchoolCard for each

**Acceptance:** Page displays all 15 schools in a responsive grid. Grid changes from 1-2-3 columns as screen size changes.

### Step 5: Update App.tsx with Routing

**File:** `src/App.tsx`

**Goal:** Set up routing so the school listing page displays as the main view.

**Current State:**
Your `App.tsx` currently shows a basic Vite + React template.

**What to do:**
1. Replace the content of `src/App.tsx` with the school listing page:
   ```typescript
   import { SchoolListingPage } from './pages/SchoolListingPage';

   function App() {
     return <SchoolListingPage />;
   }

   export default App;
   ```

2. For now, this is a simple approach (no React Router). Later, we can add proper routing.

**Future Note:**
Once the app grows, you'll add React Router for proper page navigation. For now, this direct rendering is fine.

**Acceptance:** App.tsx imports and renders SchoolListingPage. When you run `npm run dev`, you see the school listing page.

## Material-UI Setup Note

**Important:** Your project needs Material-UI installed. If it's not already installed, run:

```bash
npm install @mui/material @emotion/react @emotion/styled
```

If you're missing MUI components, consult the [MUI Documentation](https://mui.com/).

## Acceptance Criteria

Your implementation is complete when:

1. **Files Created**: All 5 files listed above exist with correct names and locations
2. **TypeScript**: No TypeScript errors in the codebase
3. **School Data**: 15 diverse schools displayed with varied trust tiers, programs, costs, and locations
4. **Components Render**: All components render without runtime errors
5. **Grid Layout**:
   - Desktop: 3 columns
   - Tablet: 2 columns
   - Mobile: 1 column
6. **Card Display**: Each school card shows:
   - School name
   - City and state
   - All programs offered
   - Cost range formatted as currency
   - Rating and student count
   - Trust tier badge with appropriate color
7. **Styling**: Uses MUI dark theme (dark background, light text)
8. **Hover Effects**: Cards have subtle visual feedback on hover
9. **Responsive**: Layout looks good and is usable on all screen sizes
10. **No Console Errors**: Browser console shows no errors or warnings

## Design Notes

### Material-UI Components to Use

| Component | Purpose | File |
|-----------|---------|------|
| `Card` | Container for each school | SchoolCard.tsx |
| `CardContent` | Content inside the card | SchoolCard.tsx |
| `Typography` | All text elements | Both |
| `Chip` | Small labels (programs, tier) | SchoolCard.tsx |
| `Grid2` | Responsive layout grid | SchoolListingPage.tsx |
| `Container` | Content wrapper | SchoolListingPage.tsx |

### Color Scheme (Dark Mode)

- **Background**: Dark grey/charcoal (#121212 or similar)
- **Card Background**: Slightly lighter (#1e1e1e or similar)
- **Text**: White or light grey (#fff or #e0e0e0)
- **Trust Tier Colors**:
  - Verified: Grey (#9e9e9e)
  - Trusted: Blue (#2196f3)
  - Premium: Amber/Gold (#ffb300)

### Spacing & Layout

- **Container padding**: 32px (py: 4)
- **Grid spacing**: 24px (spacing={3})
- **Card padding**: 20px
- **Section margins**: 32px bottom for titles

### Trust Tier Visual Hierarchy

- **Premium**: Gold badge, highest priority (best schools)
- **Trusted**: Blue badge, medium priority (established schools)
- **Verified**: Grey badge, baseline (new/independent schools)

## Responsive Breakpoints

Material-UI uses these breakpoints by default:
- `xs`: 0px (mobile)
- `sm`: 600px (tablet)
- `md`: 960px (desktop)
- `lg`: 1280px (large desktop)

Use Grid2 `size` prop to define column counts at each breakpoint:
```typescript
<Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
  {/* 1 column on mobile, 2 on tablet, 3 on desktop */}
</Grid2>
```

## Future Hook Points

**These sections are where the mock data will be replaced with real API calls:**

### Hook Point 1: Replace Mock Data with API Call

**Location:** `src/pages/SchoolListingPage.tsx`

**Current Code:**
```typescript
import { mockSchools } from '../mock/schools';

export function SchoolListingPage() {
  // Uses mockSchools directly
}
```

**Future Code:**
```typescript
import { useEffect, useState } from 'react';
import { School } from '../types/school';

export function SchoolListingPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch from API instead
    fetch('/api/schools')
      .then((res) => res.json())
      .then((data) => {
        setSchools(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    // Same JSX structure, but uses 'schools' instead of 'mockSchools'
  );
}
```

### Hook Point 2: Replace Interface with API Response Type

**Location:** `src/types/school.ts`

**Current:** Hand-written TypeScript interface

**Future:** Generated from API schema using tools like:
- OpenAPI/Swagger generation
- GraphQL codegen
- Zod/Joi validation schemas

### Hook Point 3: Filter & Search Features

Once you have real data, you can add:
- Search by school name
- Filter by location (state)
- Filter by program offered
- Filter by cost range
- Sort by rating, cost, or popularity

These would be added to `SchoolListingPage.tsx` above the grid.

### Hook Point 4: Pagination

Real datasets will likely be paginated:
- Fetch 20 schools per page
- Load more / pagination controls
- Consider using React Query or SWR for data fetching

### Hook Point 5: Detail Pages

Each school card could link to a detail page:
```typescript
<Card
  component={Link}
  to={`/schools/${school.id}`}
  sx={{ cursor: 'pointer' }}
>
  {/* Card content */}
</Card>
```

Then create `src/pages/SchoolDetailPage.tsx` to show full school information.

## Testing Tips (Optional)

Once implemented, you can test:

1. **Visual**: Does it look good on mobile, tablet, desktop?
2. **Data**: Are all 15 schools displayed?
3. **Styling**: Are trust tier colors correct?
4. **Responsive**: Does grid change from 1-2-3 columns?
5. **Hover**: Do cards have hover feedback?

## Summary

This PR creates the foundation of the flight school marketplace UI using mock data. It's a clean, responsive interface that demonstrates how schools will be displayed. Once this is approved and working, the next PRs will add:

1. Backend API for real school data
2. Search and filtering
3. School detail pages
4. User authentication
5. Booking functionality

Good luck with the implementation! Refer back to this document if you have questions about any step.
