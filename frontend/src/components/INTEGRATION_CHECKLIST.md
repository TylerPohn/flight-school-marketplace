# Trust Tier Components - Integration Checklist

Use this checklist when integrating trust tier badges into your components.

---

## Pre-Integration Setup

### ✅ 1. Verify Dependencies
- [ ] `@mui/material` is installed (v7.3.5 or higher)
- [ ] `@mui/icons-material` is installed (v7.3.5 or higher)
- [ ] TypeScript is configured correctly
- [ ] No build errors in project

### ✅ 2. Review Documentation
- [ ] Read `TRUST_TIER_README.md`
- [ ] Review `TrustBadgeDemo.tsx` for examples
- [ ] Check `TrustTierExamples.tsx` for usage patterns
- [ ] Understand the trust tier hierarchy

### ✅ 3. Understand Data Structure
- [ ] Know where `trustTier` property comes from
- [ ] Understand when `fspSignals` is available
- [ ] Know the difference between mock and real data
- [ ] Reviewed `mockSchools.ts` for example data

---

## Integration Steps

### For School Cards (PR-1)

#### Step 1: Import Components
```typescript
import { TrustBadge } from '../components';
import { TrustTier } from '../types';
```

- [ ] Import statement added
- [ ] No TypeScript errors
- [ ] Path is correct relative to your file

#### Step 2: Add Badge to Card
```typescript
<CardHeader
  title={school.name}
  action={<TrustBadge tier={school.trustTier} size="small" />}
/>
```

- [ ] Badge renders in correct location
- [ ] Size is appropriate for card
- [ ] Badge aligns properly with other elements

#### Step 3: Optional - Add Click Handler
```typescript
const [showSignals, setShowSignals] = useState(false);

<TrustBadge
  tier={school.trustTier}
  onClick={() => setShowSignals(true)}
/>

<Dialog open={showSignals} onClose={() => setShowSignals(false)}>
  <FSPSignalsPanel
    schoolName={school.name}
    tier={school.trustTier}
    signals={school.fspSignals}
  />
</Dialog>
```

- [ ] Click handler works
- [ ] Modal/dialog opens correctly
- [ ] Modal closes properly
- [ ] No console errors

#### Step 4: Test
- [ ] Badge appears on all school cards
- [ ] Tooltip shows on hover
- [ ] Colors match tier specifications
- [ ] Responsive on mobile
- [ ] Keyboard navigation works
- [ ] No visual glitches

---

### For School Profile (PR-3)

#### Step 1: Import Components
```typescript
import { TrustBadge, FSPSignalsPanel } from '../components';
import { TrustTier } from '../types';
```

- [ ] Import statement added
- [ ] No TypeScript errors
- [ ] Path is correct relative to your file

#### Step 2: Add Badge to Header
```typescript
<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
  <Typography variant="h4">{school.name}</Typography>
  <TrustBadge tier={school.trustTier} size="large" />
</Box>
```

- [ ] Badge renders next to school name
- [ ] Large size is used
- [ ] Alignment is correct
- [ ] Spacing looks good

#### Step 3: Add FSP Signals Panel
```typescript
{school.fspSignals && (
  <FSPSignalsPanel
    schoolName={school.name}
    tier={school.trustTier}
    signals={school.fspSignals}
  />
)}
```

- [ ] Panel displays below header
- [ ] All 4 metrics are shown
- [ ] Status indicators are correct
- [ ] Progress bars animate
- [ ] "Not Available" shows for unverified schools

#### Step 4: Test
- [ ] Badge appears in profile header
- [ ] Signals panel displays correctly
- [ ] Responsive on mobile/tablet
- [ ] All metrics are readable
- [ ] Benchmarks are accurate
- [ ] No console errors

---

## Accessibility Testing

### Keyboard Navigation
- [ ] Can tab to badge
- [ ] Focus indicator is visible
- [ ] Enter key activates click handler (if present)
- [ ] Tooltip appears on focus
- [ ] Can navigate through signals panel with keyboard

### Screen Reader Testing
- [ ] Badge announces tier information
- [ ] Tooltip text is read aloud
- [ ] Signals panel content is accessible
- [ ] All metrics have descriptive labels

### Visual Testing
- [ ] Colors meet WCAG AA contrast (4.5:1 minimum)
- [ ] Badge is visible in high contrast mode
- [ ] Icons are not the only indicator (text labels present)
- [ ] No color-only distinctions

### Mobile Testing
- [ ] Badge is touch-friendly (not too small)
- [ ] Tooltip appears on long press
- [ ] Signals panel is scrollable if needed
- [ ] Text is readable on small screens

---

## Code Quality Checklist

### TypeScript
- [ ] No TypeScript errors
- [ ] All props are properly typed
- [ ] Type imports use `type` keyword
- [ ] No `any` types used

### React Best Practices
- [ ] No console warnings
- [ ] Components are pure (no side effects)
- [ ] State is managed appropriately
- [ ] Keys are used for lists

### Performance
- [ ] No unnecessary re-renders
- [ ] Large lists are virtualized (if applicable)
- [ ] Images are optimized
- [ ] No performance warnings

### Styling
- [ ] Uses MUI theming system
- [ ] No inline styles (use `sx` prop)
- [ ] Responsive breakpoints used
- [ ] Consistent spacing

---

## Testing Scenarios

### Test Case 1: Premier School
- [ ] Gold badge displays
- [ ] Tooltip says "Fully verified school..."
- [ ] All 4 FSP metrics show
- [ ] Metrics indicate "Excellent" status
- [ ] Progress bars are mostly full

### Test Case 2: Verified FSP School
- [ ] Green badge displays
- [ ] Tooltip says "Verified Flight School Partner..."
- [ ] All 4 FSP metrics show
- [ ] Metrics indicate "Average" or better
- [ ] Progress bars show appropriate levels

### Test Case 3: Community-Verified School
- [ ] Blue badge displays
- [ ] Tooltip says "Verified by community..."
- [ ] FSP metrics show (based on community data)
- [ ] Metrics indicate mixed performance
- [ ] Progress bars show moderate levels

### Test Case 4: Unverified School
- [ ] Gray badge displays
- [ ] Tooltip says "School verification data not yet available"
- [ ] FSP signals panel shows "Not Available" message
- [ ] No metrics are displayed
- [ ] User understands why no data is shown

---

## Common Issues and Solutions

### Issue: Badge doesn't appear
**Solution**:
- Check that school has `trustTier` property
- Verify import path is correct
- Check for React console errors

### Issue: Colors look wrong
**Solution**:
- Verify using exact hex codes from `TRUST_TIER_CONFIG`
- Check theme settings
- Clear browser cache

### Issue: Tooltip doesn't show
**Solution**:
- Verify `showTooltip` is not set to `false`
- Check z-index of parent elements
- Try in different browser

### Issue: Signals panel shows wrong data
**Solution**:
- Check that correct `tier` prop is passed
- Verify `signals` prop matches `FSPSignals` interface
- Check mock data in `mockSchools.ts`

### Issue: TypeScript errors
**Solution**:
- Use `type` keyword for type-only imports
- Check that all props are defined in interfaces
- Run `npm run build` to see all errors

### Issue: Badge not keyboard accessible
**Solution**:
- Ensure `onClick` prop is provided if badge should be clickable
- Check that badge is not hidden from screen readers
- Verify tab order is correct

---

## Final Verification

### Before Committing
- [ ] All tests pass
- [ ] No console errors or warnings
- [ ] TypeScript compiles successfully
- [ ] ESLint has no errors
- [ ] Prettier has formatted code
- [ ] Accessibility audit passes
- [ ] Tested on Chrome, Firefox, Safari
- [ ] Tested on mobile device
- [ ] Documentation is updated
- [ ] PR description is complete

### Before Merging
- [ ] Code review completed
- [ ] All feedback addressed
- [ ] Integration tests pass
- [ ] Visual regression tests pass (if applicable)
- [ ] Product owner approval
- [ ] Design team approval
- [ ] Accessibility team approval

---

## Post-Integration Tasks

### Documentation
- [ ] Update component usage docs
- [ ] Add screenshots to design system
- [ ] Update Storybook (if used)
- [ ] Write integration guide for future features

### Monitoring
- [ ] Set up analytics for badge clicks
- [ ] Monitor console errors in production
- [ ] Track user feedback
- [ ] Monitor performance metrics

### Future Work
- [ ] Plan for real API integration
- [ ] Discuss verification system requirements
- [ ] Consider A/B testing different designs
- [ ] Plan for internationalization (i18n)

---

## Support

If you encounter issues during integration:

1. **Check Documentation**: Review `TRUST_TIER_README.md`
2. **Review Examples**: Look at `TrustBadgeDemo.tsx`
3. **Check Mock Data**: Verify structure in `mockSchools.ts`
4. **Search Issues**: Look for similar problems in project issues
5. **Ask Team**: Reach out in team chat with:
   - Clear description of issue
   - Code snippet
   - Error messages
   - Screenshots (if visual issue)

---

## Quick Reference

### Import Statements
```typescript
// Components
import { TrustBadge, FSPSignalsPanel } from '../components';

// Types
import { TrustTier, type FSPSignals, type SchoolWithTrust } from '../types';

// Constants
import { TRUST_TIER_CONFIG, MOCK_SCHOOLS_WITH_TRUST } from '../constants';
```

### Basic Usage
```typescript
// Simple badge
<TrustBadge tier={TrustTier.PREMIER} />

// Clickable badge
<TrustBadge tier={school.trustTier} onClick={handleClick} />

// Signals panel
<FSPSignalsPanel
  schoolName={school.name}
  tier={school.trustTier}
  signals={school.fspSignals}
/>
```

---

**Good luck with your integration! 🚀**
