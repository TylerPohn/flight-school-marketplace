# PR-3: School Profile Detail Page

**Status:** Development Ready
**Depends On:** [PR-1: Find-a-Flight-School MVP](./find_a_flight_school_prd.md)
**Mode:** DEMO (Mock data, no API calls)
**Target Audience:** Junior developers

---

## 1. Goal

Create a **comprehensive, detailed school profile page** that displays in-depth information about a single flight school. When a user clicks on a school from the search results (PR-1), they should be taken to a rich, visually organized profile showing everything they need to make an informed decision:

- School overview and description
- Programs and pricing details
- Fleet information
- Instructor credentials and count
- Student reviews and ratings
- Evidence Panel (Trust Tier verification details)
- Contact CTA button for inquiries

This is a **DEMO MODE feature** using mock data keyed by `schoolId` via React Router params.

---

## 2. Context

### **Environment**
- **Mode:** `DEMO` (no API calls, use hardcoded mock data)
- **Router:** React Router v6 with URL params
- **Data Source:** Extended `/src/mock/schools.ts`
- **Trigger:** User clicks school card from search results (PR-1) → navigates to `/schools/:schoolId`

### **User Journey**
1. User performs school search (PR-1)
2. User clicks a school card in results
3. Navigation to `/schools/school-uuid-123`
4. SchoolProfilePage loads mock data for that schoolId
5. User sees detailed profile with all sections
6. User can navigate back or contact school via CTA

### **Design System**
- **Component Library:** Material-UI (MUI)
- **Layout:** Container-based with responsive sections
- **Typography:** MUI theme with hierarchy
- **Color Scheme:** Dark theme (per existing PRD)

---

## 3. Dependencies

**Depends On:**
- **PR-1:** Find-a-Flight-School MVP (search page, mock school data)
- **React Router v6** (already in stack)
- **Material-UI (MUI)** (already in stack)

**Does NOT depend on:**
- Backend API (we use mock data only)
- Authentication
- Database integration

---

## 4. Requirements

### **4.1 Route & Navigation**
- **Route:** `/schools/:schoolId`
- **Params:** `schoolId` (string UUID matching schools in mock data)
- **Navigation:**
  - **To:** From PR-1 school card click
  - **Back:** Breadcrumb and "Back to Search" button navigate to `/schools`
  - **Fallback:** If schoolId not found in mock data, show 404 or redirect

### **4.2 Page Sections**

#### **A. Hero Section**
- School name (large, bold)
- Location (city, state)
- Overall rating (star + count)
- Hero image (from placeholder service, e.g., Unsplash)
- Trust Tier badge (see Evidence Panel)

#### **B. Breadcrumb Navigation**
- Home > Schools > School Name
- Allows user to navigate up

#### **C. Overview Section**
- **Description:** 2-3 paragraph text describing the school's mission, history, or highlights
- **Key Stats:**
  - Years in operation (from mock data)
  - Instructor count
  - Total students trained (mock)
  - Certifications (Part 61 / Part 141)
- **Facilities List:** e.g., "Flight Simulator," "Classroom," "Maintenance Shop"

#### **D. Programs & Pricing Section**
- **Table or Cards layout** showing:
  - Program type (e.g., "Private Pilot License")
  - Duration (hours)
  - Cost range (min - max)
  - Brief description
  - CTA: "Learn More" or "Inquire"
- **Minimum Programs:** PPL, IR, CPL (from mock data)

#### **E. Fleet Information**
- **Fleet Cards** showing:
  - Aircraft type (e.g., "Cessna 172")
  - Count in fleet
  - Max Altitude
  - Cruise Speed
  - Equipment (e.g., "Glass Cockpit," "Autopilot")
  - Availability (mock)

#### **F. Instructor Information**
- **Summary Card:** "X Certified Instructors"
- **Instructor Table/List:** Name, Certificates, Years Experience, Bio snippet
  - Show 3-5 mock instructors
  - Include badges: CFI, CFII, MEI, etc.

#### **G. Reviews Section**
- **Rating Summary:**
  - Average rating (e.g., 4.5 / 5.0)
  - Review count (e.g., "48 reviews")
  - Rating distribution (e.g., bar chart or count per star)
- **Review Cards** (3-5 per school):
  - Reviewer name
  - Date posted (mock)
  - Star rating
  - Review title
  - Review body (2-3 sentences)
  - Helpful count (mock)

#### **H. Evidence Panel**
- **Purpose:** Display Trust Tier verification details (core to marketplace trust)
- **Content:**
  - Trust Tier badge (e.g., "Verified FSP", "Premier", "Community-Verified", "Unverified")
  - Verification timestamp
  - Data sources (e.g., "Claimed Profile," "FSP Integration," "Crawled")
  - FSP Signals (if Verified FSP tier):
    - Average hours to PPL
    - Schedule consistency
    - Instructor reliability
  - Last updated date
- **Styling:** Subtle background, bordered, icon-based

#### **I. Contact CTA Section**
- Large call-to-action button: "Request Information"
- Secondary button: "Schedule Discovery Flight" (mock)
- Contact method preference (Email / Phone)
- Button state: Disabled if no contact info in mock data

---

## 5. Mock Data Additions

### **5.1 Extended School Interface**

```typescript
interface School {
  // Existing fields (from PR-1)
  schoolId: string;
  name: string;
  location: {
    city: string;
    state: string;
    zipCode?: string;
    coordinates?: { lat: number; lng: number };
  };
  programs: ("PPL" | "IR" | "CPL")[];
  costBand: { min: number; max: number };
  trainingType: "Part61" | "Part141" | "Both";
  trustTier: "Premier" | "VerifiedFSP" | "CommunityVerified" | "Unverified";

  // NEW FIELDS for profile page
  description: string;  // 2-3 paragraphs
  yearsInOperation: number;
  facilities: string[]; // ["Flight Simulator", "Classroom", "Maintenance Shop", ...]
  instructorCount: number;
  reviewCount: number;
  avgRating: number; // 0.0 - 5.0
  heroImageUrl: string; // Placeholder service URL

  // Fleet info
  fleetDetails: {
    aircraftType: string;
    count: number;
    maxAltitude: number;
    cruiseSpeed: number;
    equipment: string[]; // ["Glass Cockpit", "Autopilot", "IFR", ...]
    availability: "High" | "Medium" | "Low";
  }[];

  // Instructor summary
  instructors: {
    id: string;
    name: string;
    certificates: ("CFI" | "CFII" | "MEI" | "ATP")[];
    yearsExperience: number;
    bio: string;
    photoUrl?: string;
  }[];

  // Programs detail
  programDetails: {
    name: string;
    certification: "PPL" | "IR" | "CPL" | "ATPL";
    durationHours: number;
    costMin: number;
    costMax: number;
    description: string;
  }[];

  // Reviews (array of mock reviews)
  reviews: {
    id: string;
    reviewerName: string;
    date: string; // ISO format
    rating: number; // 1-5
    title: string;
    body: string;
    helpful: number;
  }[];

  // Evidence / Trust tier info
  verificationDetails: {
    trustTier: string;
    verificationTimestamp: string; // ISO format
    dataSources: string[];
    lastUpdated: string; // ISO format
    fspSignals?: {
      avgHoursToPPL: number;
      scheduleConsistency: number; // 0-100
      instructorReliability: number; // 0-100
    };
  };

  // Contact
  contactInfo: {
    email: string;
    phone: string;
    website?: string;
  };
}
```

### **5.2 Mock Data Examples**

#### **School Example (Extended)**

```typescript
const mockSchool: School = {
  schoolId: "school-001",
  name: "SkyWings Flight Academy",
  location: {
    city: "San Diego",
    state: "CA",
    zipCode: "92108",
    coordinates: { lat: 32.7157, lng: -117.1611 }
  },
  programs: ["PPL", "IR", "CPL"],
  costBand: { min: 12000, max: 18000 },
  trainingType: "Part141",
  trustTier: "VerifiedFSP",

  // Profile page fields
  description: `SkyWings Flight Academy has been a leader in pilot training since 2005.
  Located in sunny San Diego, we pride ourselves on personalized instruction, modern aircraft,
  and a commitment to safety. With over 500 successful PPL completions, SkyWings provides the
  ideal training environment for aspiring pilots.`,

  yearsInOperation: 19,
  facilities: [
    "Flight Simulator (X-Plane)",
    "Ground School Classroom",
    "Maintenance Hangar",
    "Student Lounge",
    "Pilot Shop"
  ],
  instructorCount: 12,
  reviewCount: 48,
  avgRating: 4.6,
  heroImageUrl: "https://images.unsplash.com/photo-1552821881-721bb62b942f?w=1200&h=400",

  fleetDetails: [
    {
      aircraftType: "Cessna 172S",
      count: 4,
      maxAltitude: 14000,
      cruiseSpeed: 122,
      equipment: ["Glass Cockpit", "Autopilot", "GNS430", "Intercom"],
      availability: "High"
    },
    {
      aircraftType: "Piper PA-44 Seminole",
      count: 2,
      maxAltitude: 20000,
      cruiseSpeed: 150,
      equipment: ["IFR", "Autopilot", "FIKI", "Known-Ice"],
      availability: "Medium"
    }
  ],

  instructors: [
    {
      id: "instr-001",
      name: "Captain James Mitchell",
      certificates: ["CFI", "CFII", "MEI"],
      yearsExperience: 15,
      bio: "Former regional airline captain with 12,000+ flight hours. Specializes in IFR and complex aircraft.",
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200"
    },
    {
      id: "instr-002",
      name: "Sarah Chen",
      certificates: ["CFI", "CFII"],
      yearsExperience: 8,
      bio: "Known for patience and clear explanations. Excellent with nervous students.",
      photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200"
    },
    {
      id: "instr-003",
      name: "Michael Rodriguez",
      certificates: ["CFI"],
      yearsExperience: 5,
      bio: "Recent PPL graduate turned instructor. Great mentor for new pilots.",
      photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200"
    }
  ],

  programDetails: [
    {
      name: "Private Pilot License (PPL)",
      certification: "PPL",
      durationHours: 60,
      costMin: 12000,
      costMax: 15000,
      description: "Learn to fly single-engine aircraft. Includes 40 flight hours and 20 ground instruction."
    },
    {
      name: "Instrument Rating (IR)",
      certification: "IR",
      durationHours: 40,
      costMin: 8000,
      costMax: 10000,
      description: "Master flight by instruments. 35 flight hours plus simulator time."
    },
    {
      name: "Commercial Pilot License (CPL)",
      certification: "CPL",
      durationHours: 50,
      costMin: 10000,
      costMax: 12000,
      description: "Prepare to fly for compensation. Advanced maneuvers and procedures."
    }
  ],

  reviews: [
    {
      id: "review-001",
      reviewerName: "Alex Thompson",
      date: "2025-10-15",
      rating: 5,
      title: "Excellent PPL Training",
      body: "SkyWings provided me with top-notch instruction. James was incredibly patient and knowledgeable. The fleet is well-maintained and modern. I felt safe and confident throughout my training.",
      helpful: 23
    },
    {
      id: "review-002",
      reviewerName: "Jessica Lee",
      date: "2025-09-22",
      rating: 4,
      title: "Great School, Minor Scheduling Issues",
      body: "The instructors are fantastic and the curriculum is solid. Only issue was occasional difficulty getting consistent flight times. Overall, highly recommend!",
      helpful: 18
    },
    {
      id: "review-003",
      reviewerName: "David Martinez",
      date: "2025-08-10",
      rating: 5,
      title: "Exceeded My Expectations",
      body: "From my first discovery flight to my checkride, every step was professional and thorough. The simulator training was incredibly realistic and helpful.",
      helpful: 15
    },
    {
      id: "review-004",
      reviewerName: "Emma Wilson",
      date: "2025-07-05",
      rating: 4,
      title: "Professional and Supportive",
      body: "Great instructors who really cared about my progress. The only downside was the cost was slightly higher than some competitors, but worth it for the quality.",
      helpful: 12
    },
    {
      id: "review-005",
      reviewerName: "Chris Anderson",
      date: "2025-06-18",
      rating: 5,
      title: "Best Decision I Made",
      body: "SkyWings changed my life. Not just teaching flying, but building a pilot community. Sarah was an amazing CFI and mentor.",
      helpful: 28
    }
  ],

  verificationDetails: {
    trustTier: "VerifiedFSP",
    verificationTimestamp: "2025-10-01T00:00:00Z",
    dataSources: ["FSP Integration", "Claimed Profile", "Student Reviews"],
    lastUpdated: "2025-11-01T00:00:00Z",
    fspSignals: {
      avgHoursToPPL: 62.3,
      scheduleConsistency: 87,
      instructorReliability: 91
    }
  },

  contactInfo: {
    email: "info@skywingsacademy.com",
    phone: "(619) 555-0123",
    website: "https://skywingsacademy.com"
  }
};
```

#### **Additional Mock Schools** (3-5 total in mock data)

Add 2-4 more schools with varied trust tiers, locations, and characteristics. Example variations:

- **School 2:** "Coastal Air Training" (Los Angeles, CA) - "Premier" tier, higher ratings
- **School 3:** "Midwest Flight Training" (Kansas City, MO) - "CommunityVerified" tier, Part 61
- **School 4:** "Eastern Sky Academy" (Atlanta, GA) - "Unverified" tier, newer school
- **School 5:** "Desert Flight Academy" (Phoenix, AZ) - "VerifiedFSP" tier, lower cost band

---

## 6. Files to Create/Modify

### **6.1 Files to Modify**

#### **1. `src/mock/schools.ts`**
- **Action:** Extend mock school data with all fields from Section 5.1
- **Changes:**
  - Add `description`, `facilities`, `instructorCount`, `avgRating`, `reviewCount`, etc.
  - Add `fleetDetails[]` with aircraft info
  - Add `instructors[]` with CFI details
  - Add `programDetails[]` with pricing and hours
  - Add `reviews[]` array (5 reviews per school)
  - Add `verificationDetails` object
  - Add `contactInfo` object
  - Ensure each school has unique `schoolId`
- **Scope:** All 3-5 mock schools
- **Example:** See Section 5.2

#### **2. `src/App.tsx` (or `src/router.tsx`)**
- **Action:** Add new route for school profile
- **Changes:**
  ```typescript
  {
    path: '/schools/:schoolId',
    element: <SchoolProfilePage />
  }
  ```
- **Ensure:** React Router v6 setup includes this route

#### **3. `src/types/school.ts` (or existing types file)**
- **Action:** Define/extend `School` interface
- **Changes:** Add all fields from Section 5.1 (if not already present)

### **6.2 Files to Create**

#### **1. `src/pages/SchoolProfilePage.tsx`**
- **Purpose:** Main page component that loads school data by `schoolId` param
- **Responsibilities:**
  - Extract `schoolId` from route params
  - Look up school in mock data
  - Handle 404 if not found
  - Render all sections
  - Provide "Back to Search" navigation
- **Structure:**
  ```typescript
  export function SchoolProfilePage() {
    const { schoolId } = useParams<{ schoolId: string }>();
    const school = mockSchools.find(s => s.schoolId === schoolId);

    if (!school) {
      return <NotFoundPage />;
    }

    return (
      <Box>
        <Breadcrumb />
        <HeroSection school={school} />
        <OverviewSection school={school} />
        <ProgramsSection school={school} />
        <FleetSection school={school} />
        <InstructorsSection school={school} />
        <ReviewsSection school={school} />
        <EvidencePanel school={school} />
        <ContactCTA school={school} />
      </Box>
    );
  }
  ```

#### **2. `src/components/EvidencePanel.tsx`**
- **Purpose:** Display Trust Tier verification details
- **Props:** `school: School`
- **Renders:**
  - Trust Tier badge (with icon/color coding)
  - Verification timestamp
  - Data sources list
  - FSP Signals (if available):
    - Avg hours to PPL
    - Schedule consistency (progress bar or gauge)
    - Instructor reliability (progress bar or gauge)
  - Last updated date
- **Styling:** MUI Paper with subtle background, left border in tier color

#### **3. `src/components/ReviewCard.tsx`**
- **Purpose:** Display individual review
- **Props:** `review: Review`
- **Renders:**
  - Reviewer name
  - Date (formatted)
  - Star rating (MUI Rating component)
  - Title
  - Body text
  - Helpful count with heart/thumbs icon
- **Styling:** MUI Card, white/light background, shadow

#### **4. `src/components/Breadcrumb.tsx` (if not exists)**
- **Purpose:** Navigation breadcrumb (Home > Schools > School Name)
- **Props:** `schoolName: string`
- **Navigation:** Links to `/` and `/schools`

#### **5. `src/components/FleetCard.tsx` (optional)**
- **Purpose:** Display individual aircraft in fleet
- **Props:** `aircraft: FleetDetail`
- **Renders:**
  - Aircraft type
  - Count in fleet
  - Max altitude, cruise speed
  - Equipment badges
  - Availability indicator

#### **6. `src/components/InstructorCard.tsx` (optional)**
- **Purpose:** Display instructor info
- **Props:** `instructor: Instructor`
- **Renders:**
  - Photo
  - Name
  - Certificates (CFI, CFII, MEI, ATP badges)
  - Years experience
  - Bio snippet

---

## 7. Step-by-Step Implementation Guide

### **Step 1: Extend Mock Data Structure**

**File:** `src/mock/schools.ts`

1. Review current mock school structure from PR-1
2. Extend the `School` interface in types or inline
3. Add all new fields listed in Section 5.1:
   - `description`, `yearsInOperation`, `facilities`
   - `fleetDetails[]`, `instructorCount`, `instructors[]`
   - `programDetails[]`, `reviewCount`, `avgRating`
   - `reviews[]`, `verificationDetails`, `contactInfo`
4. Populate 3-5 mock schools with realistic data
5. Use placeholder images from:
   - Hero images: `https://images.unsplash.com/photo-...?w=1200&h=400`
   - Instructor photos: `https://images.unsplash.com/photo-...?w=200&h=200`
   - Aircraft images: Similar from Unsplash (aviation category)
6. **Test:** Import and verify data structure loads without errors

**Acceptance:** Mock data file has all required fields; TypeScript compiles

---

### **Step 2: Add React Router Route**

**File:** `src/App.tsx` or `src/router.tsx`

1. Open router configuration
2. Add new route:
   ```typescript
   {
     path: '/schools/:schoolId',
     element: <SchoolProfilePage />
   }
   ```
3. Ensure `SchoolProfilePage` is imported (will create next step)
4. Test navigation: `/schools/school-001` should load

**Acceptance:** Route exists; navigation doesn't throw errors (component not found yet is OK)

---

### **Step 3: Create SchoolProfilePage Layout**

**File:** `src/pages/SchoolProfilePage.tsx`

1. Create page component
2. Extract `schoolId` from `useParams()`
3. Look up school from mock data using `schoolId`
4. Add 404 handling if school not found
5. Create layout structure with MUI:
   ```typescript
   <Box>
     <Breadcrumb schoolName={school.name} />
     <HeroSection school={school} />
     <Container maxWidth="lg">
       <OverviewSection school={school} />
       <Divider sx={{ my: 4 }} />
       <ProgramsSection school={school} />
       {/* ... other sections */}
     </Container>
   </Box>
   ```
6. **For now:** Create empty/placeholder sub-section components
7. **Test:** Page loads, displays breadcrumb and school name

**Acceptance:** SchoolProfilePage renders without errors; breadcrumb visible

---

### **Step 4: Create Sub-Components**

Create each component with proper TypeScript typing and props:

#### **4a. `src/components/EvidencePanel.tsx`**
- Render trust tier badge with icon
- Display verification details
- Show FSP signals in a readable format (progress bars or stats cards)
- Styling: MUI Paper with left border (color by tier)

#### **4b. `src/components/ReviewCard.tsx`**
- Render review as MUI Card
- Show rating as MUI Rating component
- Format date with `new Date().toLocaleDateString()`
- Include helpful count button

#### **4c. Other Optional Components**
- `FleetCard.tsx`: Aircraft card with specs
- `InstructorCard.tsx`: Instructor info card
- `Breadcrumb.tsx`: Navigation breadcrumb

**Acceptance:** All components render without prop errors; TypeScript strict mode passes

---

### **Step 5: Populate Page Sections**

Implement each section in SchoolProfilePage, rendering the mock data:

#### **Hero Section**
- School name (Typography variant="h2")
- Location (city, state)
- Rating stars (MUI Rating)
- Hero image (MUI CardMedia or img)
- Trust tier badge

#### **Overview Section**
- Description text
- Key stats (years, instructors, certifications)
- Facilities list (Grid or List)

#### **Programs & Pricing Section**
- Program cards or table
- Show: name, duration, cost range, description
- Button: "Learn More" or "Inquire Now"

#### **Fleet Section**
- Fleet cards showing aircraft
- Equipment badges
- Availability indicator

#### **Instructors Section**
- Instructor cards with photo, name, certs, experience
- Grid layout (2-3 cols on desktop)

#### **Reviews Section**
- Rating summary (avg, count, distribution)
- Review cards (map over reviews array)
- "View More Reviews" CTA

#### **Evidence Panel**
- Import and render `EvidencePanel` component

#### **Contact CTA**
- Large button "Request Information"
- Secondary: "Schedule Discovery Flight"
- Button links or forms (form submission is out of scope for DEMO)

**Acceptance:** All sections visible; data displays correctly

---

### **Step 6: Add Navigation and Polish**

1. **Back Navigation:**
   - "Back to Search" button in breadcrumb
   - Navigate back with `useNavigate()` hook
   - Or use browser back button

2. **Responsive Design:**
   - Test on mobile (Grid adjusts columns)
   - Test on tablet
   - Test on desktop

3. **Error Handling:**
   - If schoolId not in mock data, show 404 page
   - If data is missing fields, show fallback UI

4. **Loading State (Optional):**
   - Could add fake loading state if desired
   - DEMO mode has instant data, so optional

5. **Visual Polish:**
   - Consistent spacing (MUI spacing scale)
   - Dividers between sections
   - Icons for stats/badges
   - Hover states on buttons

**Acceptance:** Navigation works, responsive, no console errors

---

## 8. Acceptance Criteria

A feature is complete when:

1. **Route & Navigation**
   - ✅ Route `/schools/:schoolId` exists
   - ✅ Clicking school card from PR-1 navigates to profile
   - ✅ "Back to Search" navigates back to `/schools`
   - ✅ URL params update correctly
   - ✅ 404 or fallback shows if schoolId invalid

2. **Data Display**
   - ✅ All school data fields render without errors
   - ✅ Mock reviews display (3-5 per school)
   - ✅ Fleet details show correctly
   - ✅ Instructor info displays
   - ✅ Programs and pricing visible

3. **Visual Sections**
   - ✅ Hero section with image and title
   - ✅ Breadcrumb navigation visible
   - ✅ Overview section with description and stats
   - ✅ Programs section with pricing
   - ✅ Fleet cards with aircraft details
   - ✅ Instructor section with photos and certs
   - ✅ Reviews section with ratings and feedback
   - ✅ Evidence Panel with Trust Tier info
   - ✅ Contact CTA button visible

4. **User Experience**
   - ✅ Page loads instantly (DEMO mode, no API)
   - ✅ Responsive design on mobile/tablet/desktop
   - ✅ Clear visual hierarchy
   - ✅ No console errors
   - ✅ Dividers and spacing consistent

5. **Code Quality**
   - ✅ TypeScript strict mode passes
   - ✅ Components have proper prop typing
   - ✅ Mock data is structured and extensible
   - ✅ No hardcoded values (use constants/enums)
   - ✅ Reusable sub-components

---

## 9. Design Notes

### **MUI Components to Use**
- `Container`: Max-width wrapper for sections
- `Box`: Flexible layout container
- `Paper`: Cards, panels, sections
- `Card`: Individual review/instructor/fleet cards
- `Divider`: Section separators
- `Grid`: Multi-column layouts
- `Typography`: Headings, body text, captions
- `Rating`: Star ratings for reviews
- `Chip`: Program names, certifications, facilities
- `Button`: CTAs, navigation
- `CardMedia`: Hero images
- `List` / `ListItem`: Facilities, equipment lists

### **Styling Best Practices**
- **Spacing:** Use MUI spacing scale (8px base) via `sx={{ my: 4, px: 2 }}`
- **Colors:** Use theme colors (primary, secondary, grey)
- **Responsive:** Use `sx` with breakpoint queries (`xs`, `sm`, `md`, `lg`)
- **Borders:** Subtle borders on cards (theme.palette.divider)
- **Shadows:** Use paper elevation prop instead of custom shadows

### **Typography Hierarchy**
```
h1: School name (hero)
h2: Section titles (Overview, Fleet, etc.)
h3: Subsection titles (e.g., "Your Instructors")
body1: Description text, review body
body2: Secondary text (locations, stats)
caption: Dates, small labels
```

### **Color Scheme (per PR-1)**
- **Primary:** Use theme primary color (likely blue/teal)
- **Trust Tiers:**
  - Premier: Gold/yellow badge
  - VerifiedFSP: Green badge
  - CommunityVerified: Blue badge
  - Unverified: Grey badge

### **Example Section Layout**
```
┌─────────────────────────────────────┐
│         Hero Section                 │
│  (Image, Name, Location, Rating)     │
├─────────────────────────────────────┤
│         Breadcrumb                   │
├─────────────────────────────────────┤
│         Container (lg)               │
│  ┌───────────────────────────────┐   │
│  │ Overview Section              │   │
│  │ (Desc, Stats, Facilities)     │   │
│  └───────────────────────────────┘   │
│                                       │
│  ─────────────────────────────────   │
│                                       │
│  ┌───────────────────────────────┐   │
│  │ Programs & Pricing Section    │   │
│  │ (Cards or Table)              │   │
│  └───────────────────────────────┘   │
│                                       │
│  ─────────────────────────────────   │
│                                       │
│  ┌───────────────────────────────┐   │
│  │ Fleet Information             │   │
│  │ (Aircraft Cards)              │   │
│  └───────────────────────────────┘   │
│                                       │
│  [... Reviews, Evidence, Contact ...] │
│                                       │
└─────────────────────────────────────┘
```

---

## 10. Future Hook Points (Out of Scope for DEMO)

These are locations in the code where you **would** connect to a real API:

### **In SchoolProfilePage.tsx**
```typescript
// HOOK: Replace this with API call
// const { data: school } = useQuery({
//   queryKey: ['school', schoolId],
//   queryFn: () => fetch(`/api/schools/${schoolId}`).then(r => r.json())
// });

// For DEMO, use mock data:
const school = mockSchools.find(s => s.schoolId === schoolId);
```

### **In ReviewsSection**
```typescript
// HOOK: Fetch paginated reviews
// const { data: reviews } = useQuery({
//   queryKey: ['reviews', schoolId],
//   queryFn: () => fetch(`/api/schools/${schoolId}/reviews`).then(r => r.json())
// });

// For DEMO, use school.reviews from mock
const reviews = school.reviews;
```

### **In ContactCTA**
```typescript
// HOOK: Submit inquiry form
// const { mutate: submitInquiry } = useMutation({
//   mutationFn: (data) => fetch(`/api/inquiries`, {
//     method: 'POST',
//     body: JSON.stringify(data)
//   }).then(r => r.json())
// });

// For DEMO, log to console or show fake success
const handleInquiry = (email, message) => {
  console.log('DEMO: Inquiry submitted', { email, message });
  showSuccess('Inquiry submitted!');
};
```

### **Environment Check**
```typescript
// Use MODE environment variable to toggle
const isDemoMode = import.meta.env.VITE_MODE === 'DEMO';

if (isDemoMode) {
  // Use mock data
} else {
  // Use API calls
}
```

---

## 11. Testing Checklist (for Junior Developer)

Before marking PR as complete:

- [ ] Page loads without errors in browser console
- [ ] All 5 schools can be viewed via `/schools/school-001`, etc.
- [ ] Hero section displays correctly (image, name, location)
- [ ] All data sections visible and populated
- [ ] Breadcrumb navigation works
- [ ] "Back to Search" button navigates to search page
- [ ] Mobile responsive (test on 375px, 768px, 1024px widths)
- [ ] Reviews display with ratings and text
- [ ] Evidence Panel shows Trust Tier correctly
- [ ] Contact CTA button is clickable (links work)
- [ ] Instructor photos load (or show fallback)
- [ ] Fleet cards show equipment and specs
- [ ] No broken image links (check console for 404s)
- [ ] Dates are formatted consistently
- [ ] Star ratings render correctly
- [ ] Dividers and spacing look intentional
- [ ] TypeScript has no errors (run `tsc --noEmit`)

---

## 12. Common Pitfalls to Avoid

1. **Hardcoded schoolId:** Use `useParams()` to get schoolId from URL
2. **Missing null checks:** Always check if school exists before accessing properties
3. **Not extending mock data:** Ensure all new fields are populated in mock schools
4. **Responsive layout issues:** Use MUI Grid with proper breakpoints
5. **Image link failures:** Use working placeholder URLs (Unsplash, Picsum, etc.)
6. **Typos in route:** Ensure `/schools/:schoolId` matches both router and links
7. **Forgetting imports:** Import `useParams`, `useNavigate`, MUI components
8. **Styling conflicts:** Use MUI `sx` prop instead of CSS files for component-specific styles
9. **Review data missing:** Ensure each school has `reviews[]` array with 3-5 items
10. **Instructor photo fallbacks:** Show default avatar if photo URL fails to load

---

## 13. Development Environment Setup

### **Prerequisites**
- Node.js 18+
- React 18+
- React Router v6
- Material-UI (MUI) v5 or v6
- TypeScript 4.9+

### **Installation (First Time)**
```bash
# Already installed in PR-1, but if starting fresh:
cd frontend
npm install
npm run dev
```

### **Development Server**
```bash
npm run dev
# Navigate to http://localhost:5173 (or Vite default port)
```

### **Testing**
```bash
# TypeScript check
npm run type-check
# or
tsc --noEmit

# Jest/Vitest if configured
npm test
```

### **Build**
```bash
npm run build
# Output: dist/
```

---

## 14. Deliverables Summary

**What You're Building:**
1. Extended mock data in `src/mock/schools.ts` with rich school profiles
2. New page route `/schools/:schoolId`
3. `SchoolProfilePage.tsx` with complete layout
4. Sub-components: `EvidencePanel.tsx`, `ReviewCard.tsx`, `FleetCard.tsx`, `InstructorCard.tsx`
5. Breadcrumb navigation component
6. Responsive, styled page using MUI

**What You're NOT Building:**
- Backend API (use mock data only)
- Real form submission (display fake success)
- User authentication
- Database integration
- Server-side rendering

**Estimated Time:** 6-8 hours for junior developer (depending on styling polish)

---

## 15. Questions & Support

**If Stuck On...**

- **React Router params:** See [React Router Docs - useParams()](https://reactrouter.com/en/main/hooks/use-params)
- **MUI styling:** See [MUI SX Prop Docs](https://mui.com/system/the-sx-prop/)
- **MUI Grid layout:** See [MUI Grid Docs](https://mui.com/material-ui/react-grid/)
- **TypeScript interfaces:** Extend the `School` type in `src/types/school.ts`
- **Mock data structure:** Reference existing `mockSchools` array in PR-1

---

**Document Version:** 1.0
**Created:** 2025-11-07
**Last Updated:** 2025-11-07
**For:** Flight School Marketplace (DEMO Mode)
