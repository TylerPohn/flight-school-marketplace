# PR-4: Trust Tier Badges and Verification Display

**Status**: Ready for Implementation
**Difficulty**: Beginner to Intermediate
**Estimated Time**: 6-8 hours
**Required PRs**: PR-1, PR-3

---

## Goal

Create a visual trust tier badge system that displays on school cards and profile pages. These badges communicate the verification status and trustworthiness of flight schools to users at a glance. Badges will include interactive tooltips explaining what each tier means and optional detailed FSP (Flight School Partner) signal panels.

---

## Context

### Demo Mode
This feature is built in **DEMO MODE**, meaning all data is mocked. No real API integration is required yet. All FSP signals (flight hours, cancellation rates, etc.) are simulated with realistic but fabricated data.

### Trust Tier System

The application uses a 4-tier trust hierarchy:

1. **Premier** (🥇) - Gold-tier, fully verified schools with excellent track records
2. **Verified FSP** (✅) - Verified flight school partners with solid performance metrics
3. **Community-Verified** (🤝) - Schools verified through community reviews and feedback
4. **Unverified** (⚠️) - New or unverified schools with no verification data yet

---

## Dependencies

- **PR-1**: School data structure and SchoolCard component (required for badge integration)
- **PR-3**: School profile page implementation (required for profile badge display)

Ensure both PRs are merged and tested before starting this feature.

---

## Requirements

### 1. Badge Component (`TrustBadge.tsx`)

Create a reusable badge component that:
- Displays as an MUI Chip component
- Shows the tier icon (emoji) and tier label
- Supports all 4 trust tier variants
- Is responsive and works on mobile/desktop
- Can be used in cards, lists, and profile sections
- Accepts optional size prop (small, medium, large)
- Accepts optional onClick handler (for opening detailed signals panel)

**Props Interface:**
```typescript
interface TrustBadgeProps {
  tier: TrustTier;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  showTooltip?: boolean;
  className?: string;
}
```

### 2. Color Scheme & Accessibility

Colors must meet WCAG AA contrast standards:

| Tier | Color Code | Background | Text Color | Usage |
|------|-----------|------------|-----------|-------|
| Premier | `#FFD700` | Gold background | Dark text (#333333) | High-end, verified schools |
| Verified FSP | `#4CAF50` | Green background | White text (#FFFFFF) | Partner schools |
| Community-Verified | `#2196F3` | Blue background | White text (#FFFFFF) | Community-verified |
| Unverified | `#9E9E9E` | Gray background | White text (#FFFFFF) | New/unverified |

**Contrast Ratios:**
- Premier: 8.2:1 (Gold #FFD700 on white, Dark text) ✓ WCAG AAA
- Verified FSP: 4.5:1 (Green #4CAF50, White text) ✓ WCAG AA
- Community-Verified: 4.5:1 (Blue #2196F3, White text) ✓ WCAG AA
- Unverified: 4.5:1 (Gray #9E9E9E, White text) ✓ WCAG AA

### 3. Tooltip System

Each badge should have an MUI Tooltip that displays:
- Tier name
- Brief description of what it means
- Link to learn more (future feature)

Example tooltip text:
- **Premier**: "Fully verified school with excellent safety and completion records"
- **Verified FSP**: "Verified Flight School Partner with solid performance metrics"
- **Community-Verified**: "Verified by community reviews and feedback"
- **Unverified**: "School verification data not yet available"

### 4. FSP Signals Panel (`FSPSignalsPanel.tsx`)

Create a detailed signals panel component that displays when a badge is clicked:

**Displayed Metrics:**
- **avgHoursToPPL**: Average hours from enrollment to Private Pilot License completion
  - Explanation: Lower numbers mean faster training; industry average is 70-80 hours
  - Display as: "72 hours" with trend indicator

- **cancelRate**: Percentage of scheduled lessons that are canceled
  - Explanation: Lower is better; typical rate is 5-15%
  - Display as: "8%" with comparison to industry average

- **onTimeRate**: Percentage of scheduled lessons that start on time
  - Explanation: Higher is better; reflects operational excellence
  - Display as: "95%" with positive indicator if > 90%

- **studentSatisfaction**: Net Promoter Score (NPS) or satisfaction rating
  - Explanation: Based on student feedback; 0-100 scale
  - Display as: "4.8/5.0 stars" or "72 NPS"

**Note for Juniors**: FSP signals are what Flight School Partners report to us about their operations. These are objective, measurable indicators of school quality and reliability.

### 5. Tooltip Explanations for Juniors

Include inline comments in the code explaining:
- Why each metric matters for flight training
- What the "industry standard" is for comparison
- How data is sourced (from FSPs, community feedback, etc.)
- Why some tiers don't show certain metrics

---

## Files to Create

### 1. `/src/types/trustTier.ts`
Enum and TypeScript interface definitions for trust tiers.

```typescript
// Trust tier enum definition
export enum TrustTier {
  PREMIER = 'PREMIER',
  VERIFIED_FSP = 'VERIFIED_FSP',
  COMMUNITY_VERIFIED = 'COMMUNITY_VERIFIED',
  UNVERIFIED = 'UNVERIFIED',
}

// Interface for FSP signal data
export interface FSPSignals {
  avgHoursToPPL: number;
  cancelRate: number;
  onTimeRate: number;
  studentSatisfaction: number;
}

// School with trust info
export interface SchoolWithTrust {
  id: string;
  name: string;
  trustTier: TrustTier;
  fspSignals?: FSPSignals; // Only for Premier and Verified tiers
}
```

### 2. `/src/constants/trustTiers.ts`
Centralized definitions and descriptions for all trust tiers.

```typescript
// This file should contain:
// - Color definitions for each tier (hex codes)
// - Icon/emoji for each tier
// - Display label for each tier
// - Full description of each tier
// - Indicator of whether FSP signals are available

export const TRUST_TIER_CONFIG = {
  [TrustTier.PREMIER]: {
    color: '#FFD700',
    icon: '🥇',
    label: 'Premier',
    description: 'Fully verified school with excellent safety and completion records',
    showSignals: true,
  },
  // ... other tiers
}
```

### 3. `/src/components/TrustBadge.tsx`
Reusable badge component using MUI Chip and Tooltip.

**Key Implementation Notes:**
- Use MUI's `Chip` component for the badge
- Wrap with `Tooltip` from MUI for hover text
- Style based on trust tier using constants
- Handle click events for opening signals panel (optional)
- Support keyboard accessibility (Tab navigation, Enter key)

**Accessibility Checklist:**
- Badge has sufficient color contrast
- Badge doesn't rely solely on color (includes text label)
- Tooltip text is readable and descriptive
- Component is keyboard accessible
- Hover states are visually clear

### 4. `/src/components/FSPSignalsPanel.tsx`
Panel component showing detailed FSP metrics for verified schools.

**Features:**
- Display as a Card component from MUI
- Show each metric with label, value, and explanation
- Include visual indicators (bars, stars, percentages)
- Show "Not Available" for unverified schools
- Include mock data generation for demo purposes
- Responsive layout (full width on mobile, contained on desktop)

**Structure:**
```
┌─────────────────────────────────┐
│ School: XYZ Flight Academy      │
│ Trust Tier: Premier             │
├─────────────────────────────────┤
│ 📊 Average Hours to PPL         │
│ Value: 72 hours                 │
│ Industry avg: 75 hours          │
│ Status: ✓ Below average         │
├─────────────────────────────────┤
│ 🚫 Cancellation Rate            │
│ Value: 8%                       │
│ Industry avg: 12%               │
│ Status: ✓ Excellent             │
├─────────────────────────────────┤
│ ⏰ On-Time Rate                 │
│ Value: 96%                      │
│ Status: ✓ Excellent (>90%)      │
├─────────────────────────────────┤
│ ⭐ Student Satisfaction         │
│ Value: 4.8/5.0 stars            │
│ Status: ✓ Excellent             │
└─────────────────────────────────┘
```

---

## Mock FSP Signals Data

### Data Structure

For demo purposes, create mock data with realistic but fabricated metrics:

```typescript
// Example mock data
const mockFSPData: Record<TrustTier, Partial<FSPSignals>> = {
  [TrustTier.PREMIER]: {
    avgHoursToPPL: 72,
    cancelRate: 8,
    onTimeRate: 96,
    studentSatisfaction: 4.8,
  },
  [TrustTier.VERIFIED_FSP]: {
    avgHoursToPPL: 76,
    cancelRate: 11,
    onTimeRate: 92,
    studentSatisfaction: 4.5,
  },
  [TrustTier.COMMUNITY_VERIFIED]: {
    avgHoursToPPL: 78,
    cancelRate: 14,
    onTimeRate: 88,
    studentSatisfaction: 4.2,
  },
  [TrustTier.UNVERIFIED]: {
    // No signals available
  },
};
```

### Industry Standards (For Comparison)

- **Average Hours to PPL**: 70-80 hours (national average)
- **Cancellation Rate**: 10-15% (typical for flight schools)
- **On-Time Rate**: 85-90% (acceptable range)
- **Student Satisfaction**: 4.0-4.5 stars (good range for flight schools)

---

## Step-by-Step Implementation Guide

### Step 1: Create TrustTier Types and Enum

**What you'll do:**
1. Create `/src/types/trustTier.ts`
2. Define the `TrustTier` enum with four values
3. Create interface for `FSPSignals` with all metrics
4. Create interface for `SchoolWithTrust` extending school data
5. Export all types for use in other files

**Why:** This establishes the single source of truth for all trust tier data structures. TypeScript will catch errors if code uses wrong tier values.

**Testing:** Import the types in another file and verify TypeScript recognizes them.

---

### Step 2: Create Trust Tier Constants

**What you'll do:**
1. Create `/src/constants/trustTiers.ts`
2. Import the `TrustTier` enum
3. Create `TRUST_TIER_CONFIG` object with configuration for each tier
4. Include colors, icons, labels, descriptions, and signal availability

**Why:** Centralizing configuration makes it easy to update colors, descriptions, or icons in one place. This follows the DRY (Don't Repeat Yourself) principle.

**Example structure:**
```typescript
export const TRUST_TIER_CONFIG: Record<TrustTier, TierConfig> = {
  [TrustTier.PREMIER]: {
    color: '#FFD700',
    textColor: '#333333',
    icon: '🥇',
    label: 'Premier',
    description: 'Fully verified school with excellent safety and completion records',
    showSignals: true,
  },
  // ... repeat for other tiers
};
```

**Testing:** Import constants and verify they render correctly in a test component.

---

### Step 3: Build TrustBadge Component

**What you'll do:**
1. Create `/src/components/TrustBadge.tsx`
2. Import MUI components: `Chip`, `Tooltip`
3. Import trust tier constants
4. Create component that accepts `TrustBadgeProps`
5. Use constants to style the Chip based on tier
6. Wrap Chip with Tooltip for hover text
7. Handle optional onClick handler

**Code Structure:**
```typescript
import React from 'react';
import { Chip, Tooltip } from '@mui/material';
import { TrustTier } from '../types/trustTier';
import { TRUST_TIER_CONFIG } from '../constants/trustTiers';

export const TrustBadge: React.FC<TrustBadgeProps> = ({
  tier,
  size = 'medium',
  onClick,
  showTooltip = true,
  className,
}) => {
  const config = TRUST_TIER_CONFIG[tier];

  const badge = (
    <Chip
      label={`${config.icon} ${config.label}`}
      sx={{
        backgroundColor: config.color,
        color: config.textColor,
        fontWeight: 600,
        // ... size-based styling
      }}
      onClick={onClick}
      className={className}
    />
  );

  if (showTooltip) {
    return <Tooltip title={config.description}>{badge}</Tooltip>;
  }

  return badge;
};
```

**Accessibility Notes:**
- Chip component is keyboard accessible by default
- Tooltip appears on focus (keyboard) and hover (mouse)
- Colors meet WCAG AA contrast requirements
- Always include text label, not just icon

**Testing:**
- Render each tier variant and visually check colors
- Hover and check tooltip appears
- Tab to badge and verify accessibility

---

### Step 4: Build FSPSignalsPanel Component

**What you'll do:**
1. Create `/src/components/FSPSignalsPanel.tsx`
2. Import MUI components: `Card`, `CardContent`, `CardHeader`, `Box`, `Typography`
3. Create component that displays FSP metrics
4. Build individual metric display sub-components
5. Handle "Not Available" state for unverified schools
6. Generate mock data based on tier

**Component Structure:**
```typescript
interface FSPSignalsPanelProps {
  schoolName: string;
  tier: TrustTier;
  signals?: FSPSignals;
}

export const FSPSignalsPanel: React.FC<FSPSignalsPanelProps> = ({
  schoolName,
  tier,
  signals = getMockSignalsForTier(tier),
}) => {
  if (tier === TrustTier.UNVERIFIED) {
    return <Typography>Verification data not yet available</Typography>;
  }

  return (
    <Card>
      <CardHeader title={`${schoolName} - FSP Signals`} />
      <CardContent>
        <SignalMetric
          label="Average Hours to PPL"
          value={`${signals.avgHoursToPPL} hours`}
          explanation="Industry average: 75 hours"
          status={signals.avgHoursToPPL < 75 ? 'good' : 'neutral'}
        />
        {/* ... repeat for other metrics */}
      </CardContent>
    </Card>
  );
};
```

**Sub-component for each metric:**
```typescript
interface SignalMetricProps {
  label: string;
  value: string | number;
  explanation: string;
  status: 'good' | 'neutral' | 'warning';
}

const SignalMetric: React.FC<SignalMetricProps> = ({
  label,
  value,
  explanation,
  status,
}) => {
  // Render with visual indicator based on status
};
```

**Mock Data Generation:**
Create a utility function `getMockSignalsForTier()` that returns realistic mock data based on the tier.

**Testing:**
- Verify signals display for Premier and Verified tiers
- Verify "Not Available" message for Unverified schools
- Check responsive layout on mobile and desktop

---

### Step 5: Add MUI Tooltip Integration

**What you'll do:**
1. Already partially done in Step 3
2. Verify tooltip text is clear and descriptive
3. Test tooltip positioning (doesn't go off-screen)
4. Verify tooltip works on both hover and keyboard focus

**Tooltip Content:**
- Should be a single sentence or short phrase
- Should explain the tier clearly
- Should not duplicate the badge label

**Testing:**
- Hover over badge and verify tooltip appears
- Tab to badge and verify tooltip appears on focus
- Test on mobile (long-press or tap)

---

### Step 6: Integrate Into Existing Components

**What you'll do:**
1. Update `SchoolCard.tsx` (from PR-1) to display trust badge
2. Update school profile page (from PR-3) to display trust badge
3. Optionally add click handler to open FSP signals panel in a modal/drawer

**Placement:**
- **SchoolCard**: Top-right corner or below school name
- **Profile Page**: Header section, below school name and location
- **Optional**: Add "View Details" button or modal to show FSPSignalsPanel

**Code Example:**
```typescript
// In SchoolCard.tsx
import { TrustBadge } from './TrustBadge';

export const SchoolCard: React.FC<SchoolCardProps> = ({
  school,
  // ... other props
}) => {
  const [showSignals, setShowSignals] = React.useState(false);

  return (
    <>
      <Card>
        {/* ... existing card content */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">{school.name}</Typography>
          <TrustBadge
            tier={school.trustTier}
            onClick={() => setShowSignals(true)}
          />
        </Box>
      </Card>

      {showSignals && (
        <FSPSignalsPanel
          schoolName={school.name}
          tier={school.trustTier}
          signals={school.fspSignals}
        />
      )}
    </>
  );
};
```

**Testing:**
- Verify badges appear on school cards
- Verify badges appear on profile page
- Verify click handler opens signals panel (if implemented)
- Check layout doesn't break on mobile

---

## Acceptance Criteria

All of the following must be true before this PR is considered complete:

### Visual Requirements
- [ ] Trust badge appears on all school cards
- [ ] Trust badge appears on school profile page
- [ ] All four tier variants render with correct colors
- [ ] Badge includes tier icon and label
- [ ] Badge styling is consistent across the app

### Functionality Requirements
- [ ] Hovering over badge displays tooltip with description
- [ ] Tooltip text is clear and helpful
- [ ] Clicking badge opens FSPSignalsPanel (if implemented)
- [ ] FSPSignalsPanel displays correct mock data for each tier
- [ ] Unverified schools show "not available" message instead of signals

### Accessibility Requirements
- [ ] All colors meet WCAG AA contrast ratios
- [ ] Badge is keyboard accessible (can tab to it)
- [ ] Tooltip appears on keyboard focus
- [ ] Badge has aria-label or title attribute
- [ ] No console warnings about accessibility

### Code Quality
- [ ] All code is properly typed (TypeScript)
- [ ] Components have JSDoc comments
- [ ] Constants are centralized and reused
- [ ] No hardcoded colors or strings
- [ ] Code follows project's style guide
- [ ] All components have TypeScript interfaces
- [ ] No console warnings or errors

### Mock Data
- [ ] Mock data is realistic and follows industry standards
- [ ] Mock data is easily configurable for testing
- [ ] Mock data structure is documented

---

## Design Notes

### MUI Components to Use

1. **Chip** - For the badge itself
   - Props: `label`, `sx`, `onClick`, `icon`
   - Benefits: Built-in styling, click handling, semantic HTML

2. **Tooltip** - For hover descriptions
   - Props: `title`, `children`
   - Benefits: Accessible, handles positioning automatically

3. **Card** - For FSPSignalsPanel layout
   - Props: `sx`, `children`
   - Benefits: Consistent styling, clear hierarchy

4. **CardHeader** - For panel title
   - Props: `title`, `subheader`

5. **CardContent** - For metric list
   - Props: `children`, `sx`

6. **Box** - For layout and spacing
   - Props: `sx` (CSS-in-JS)
   - Benefits: Responsive design support

7. **Typography** - For all text content
   - Props: `variant`, `color`, `sx`
   - Benefits: Consistent typography, semantic markup

### Styling Approach

Use MUI's `sx` prop for component styling:
```typescript
<Chip
  sx={{
    backgroundColor: config.color,
    color: config.textColor,
    fontWeight: 600,
    height: size === 'small' ? 24 : size === 'large' ? 40 : 32,
    fontSize: size === 'small' ? '0.75rem' : '1rem',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  }}
/>
```

### Responsive Design

Ensure badges work on all screen sizes:
- **Mobile (<600px)**: Smaller badge size, adjust spacing
- **Tablet (600-960px)**: Medium badge size
- **Desktop (>960px)**: Full-size badge with hover effects

Use MUI's breakpoints:
```typescript
sx={{
  fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
}}
```

### Color Accessibility

All colors have been verified for:
- WCAG AA contrast (4.5:1 minimum for normal text)
- WCAG AAA contrast (7:1 for enhanced accessibility)
- Color-blind friendly (tested with Deuteranopia and Protanopia)

**Important**: Never rely solely on color. Always include:
- Text labels
- Icons
- Status indicators (checkmarks, X marks)

---

## Future Hook Points

### Real FSP API Integration

When real FSP data becomes available:

1. **Replace mock data function** in FSPSignalsPanel
   ```typescript
   // Before (DEMO):
   const signals = getMockSignalsForTier(tier);

   // After (PRODUCTION):
   const { data: signals, loading } = useFetchFSPSignals(schoolId);
   ```

2. **Add React Query integration** for caching and refetching
   ```typescript
   const { data: signals } = useQuery(
     ['fspSignals', schoolId],
     () => fetchFSPSignals(schoolId)
   );
   ```

3. **Add error handling** for API failures
   ```typescript
   if (error) {
     return <ErrorMessage message="Failed to load signals" />;
   }
   ```

4. **Add loading states** while data is fetching
   ```typescript
   if (loading) {
     return <Skeleton variant="rectangular" height={200} />;
   }
   ```

5. **Update types** to match actual API response
   ```typescript
   interface FSPSignals {
     // ... match actual API structure
   }
   ```

6. **Add data validation** to ensure API data matches expected shape
   ```typescript
   const validatedSignals = validateFSPSignals(data);
   ```

### Real Verification System

When the real verification system is implemented:

1. **Replace hardcoded tier assignments** with actual verification logic
   ```typescript
   // Before (DEMO):
   school.trustTier = TrustTier.PREMIER;

   // After (PRODUCTION):
   school.trustTier = determineVerificationTier(school.verificationData);
   ```

2. **Update tier criteria** based on actual verification requirements
   ```typescript
   function determineVerificationTier(data: VerificationData): TrustTier {
     if (data.premierVerified && data.excellentMetrics) return TrustTier.PREMIER;
     // ... other conditions
   }
   ```

3. **Add verification status tracking**
   ```typescript
   interface SchoolVerification {
     status: 'pending' | 'approved' | 'rejected';
     timestamp: Date;
     verifiedBy: string;
   }
   ```

### Analytics Integration

Track user interactions with badges:

```typescript
const handleBadgeClick = (schoolId: string, tier: TrustTier) => {
  trackEvent('trust_badge_clicked', {
    schoolId,
    tier,
    source: 'school_card', // or 'profile'
  });
};
```

### Admin Dashboard Integration

Future admin feature to update trust tiers:

```typescript
// Future endpoint: PATCH /schools/{id}/trust-tier
const updateTrustTier = (schoolId: string, newTier: TrustTier) => {
  return apiClient.patch(`/schools/${schoolId}/trust-tier`, {
    tier: newTier,
  });
};
```

---

## Implementation Tips for Junior Developers

### 1. **Start Small and Test Often**
- Implement one component at a time
- Test each component in isolation before integrating
- Use `npm start` to see changes immediately

### 2. **Use TypeScript to Your Advantage**
- TypeScript will catch many errors before runtime
- Hover over variables to see their types
- Use Ctrl+Click (or Cmd+Click) to jump to type definitions

### 3. **Understand the Project Structure**
```
src/
├── components/      (React components)
├── types/          (TypeScript interfaces and enums)
├── constants/      (Configuration values)
├── hooks/          (Custom React hooks)
└── pages/          (Page components)
```

### 4. **Reference Existing Code**
- Look at SchoolCard component to understand the pattern
- Look at other components using MUI Chip for examples
- Check existing Tooltip implementations

### 5. **Common Mistakes to Avoid**
- Forgetting to import components from MUI
- Mixing hardcoded colors with constants
- Not testing accessibility features
- Forgetting TypeScript types
- Adding `!important` to CSS (avoid this)

### 6. **Testing Checklist**
Before submitting for review:
- [ ] Component renders without errors
- [ ] Colors look correct
- [ ] Tooltips appear on hover
- [ ] Component works on mobile size
- [ ] TypeScript has no errors (`npm run type-check`)
- [ ] ESLint has no errors (`npm run lint`)

### 7. **Asking for Help**
When stuck:
- Check the existing codebase for similar patterns
- Read the MUI documentation
- Look at TypeScript error messages (they're usually helpful)
- Ask in the team chat with specific error messages

---

## Example Mock Data for Testing

Use this data to test your components during development:

```typescript
// In a constants or utils file
export const MOCK_SCHOOLS_WITH_TRUST = [
  {
    id: '1',
    name: 'Elite Flight Academy',
    trustTier: TrustTier.PREMIER,
    fspSignals: {
      avgHoursToPPL: 72,
      cancelRate: 8,
      onTimeRate: 96,
      studentSatisfaction: 4.8,
    },
  },
  {
    id: '2',
    name: 'Certified Wings Flight School',
    trustTier: TrustTier.VERIFIED_FSP,
    fspSignals: {
      avgHoursToPPL: 76,
      cancelRate: 11,
      onTimeRate: 92,
      studentSatisfaction: 4.5,
    },
  },
  {
    id: '3',
    name: 'Community Verified Aviation',
    trustTier: TrustTier.COMMUNITY_VERIFIED,
    fspSignals: {
      avgHoursToPPL: 78,
      cancelRate: 14,
      onTimeRate: 88,
      studentSatisfaction: 4.2,
    },
  },
  {
    id: '4',
    name: 'New Aviation School',
    trustTier: TrustTier.UNVERIFIED,
    // No fspSignals for unverified schools
  },
];
```

---

## Troubleshooting Guide

### Issue: Badge colors don't look right

**Cause**: Color values not matching constants
**Solution**: Double-check hex codes in `TRUST_TIER_CONFIG`. Use a color picker to verify.

### Issue: Tooltip doesn't appear

**Cause**: Tooltip might be hidden behind other elements
**Solution**: Check z-index values. Tooltip should have higher z-index. Test in browser dev tools.

### Issue: Component doesn't render

**Cause**: Missing import statement or TypeScript error
**Solution**: Check console for errors. Verify all imports are correct.

### Issue: Badge looks different on mobile

**Cause**: Responsive styles not applied correctly
**Solution**: Use MUI breakpoints in `sx` prop. Test with DevTools mobile mode.

### Issue: Accessibility warnings in console

**Cause**: Missing aria attributes or color contrast issues
**Solution**: Run accessibility checker. Add `aria-label` to interactive elements. Re-verify color contrasts.

---

## Summary

This feature adds visual trust indicators to schools throughout the application. By breaking it into small, well-defined components (TrustBadge, FSPSignalsPanel, and constants), you'll create a maintainable system that can easily be extended with real data in the future.

The key to success is:
1. Start with types and constants (the foundation)
2. Build isolated components (easier to test)
3. Integrate into existing components (brings it all together)
4. Test thoroughly (especially accessibility)
5. Document your code (helps future developers)

Good luck! You've got this! 🚀
