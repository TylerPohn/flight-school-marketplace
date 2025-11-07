/**
 * Trust Tier Usage Examples
 *
 * Quick reference examples showing how to use Trust Tier components
 * in different scenarios. Copy-paste these patterns into your components.
 */

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  Typography,
  Stack,
} from '@mui/material';
import { TrustBadge } from './TrustBadge';
import { FSPSignalsPanel } from './FSPSignalsPanel';
import { TrustTier, type SchoolWithTrust } from '../types/trustTier';

/**
 * Example 1: Basic Badge Usage
 * Just display a badge with tooltip - simplest use case
 */
export const Example1_BasicBadge: React.FC = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Example 1: Basic Badge with Tooltip
      </Typography>
      <TrustBadge tier={TrustTier.PREMIER} />
    </Box>
  );
};

/**
 * Example 2: Badge in School Card
 * Common pattern for school listing cards
 */
export const Example2_BadgeInCard: React.FC<{ school: SchoolWithTrust }> = ({ school }) => {
  return (
    <Card>
      <CardHeader
        title={school.name}
        action={<TrustBadge tier={school.trustTier} size="small" />}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          School information goes here...
        </Typography>
      </CardContent>
    </Card>
  );
};

/**
 * Example 3: Clickable Badge with Modal
 * Opens FSP signals in a modal when badge is clicked
 */
export const Example3_ClickableBadgeModal: React.FC<{ school: SchoolWithTrust }> = ({ school }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TrustBadge
        tier={school.trustTier}
        onClick={() => setOpen(true)}
      />

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <FSPSignalsPanel
            schoolName={school.name}
            tier={school.trustTier}
            signals={school.fspSignals}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

/**
 * Example 4: Badge with Inline Signals Panel
 * Shows badge and signals panel together (good for profile pages)
 */
export const Example4_BadgeWithInlinePanel: React.FC<{ school: SchoolWithTrust }> = ({ school }) => {
  return (
    <Box>
      {/* Header with Badge */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Typography variant="h4">{school.name}</Typography>
        <TrustBadge tier={school.trustTier} size="large" />
      </Box>

      {/* FSP Signals Panel */}
      {school.fspSignals && (
        <FSPSignalsPanel
          schoolName={school.name}
          tier={school.trustTier}
          signals={school.fspSignals}
        />
      )}
    </Box>
  );
};

/**
 * Example 5: Multiple Badges (Comparison View)
 * Display badges for multiple schools side by side
 */
export const Example5_MultipleBadges: React.FC<{ schools: SchoolWithTrust[] }> = ({ schools }) => {
  return (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      {schools.map((school) => (
        <Box key={school.id}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {school.name}
          </Typography>
          <TrustBadge tier={school.trustTier} />
        </Box>
      ))}
    </Stack>
  );
};

/**
 * Example 6: Conditional Badge Display
 * Only show badge if school has a trust tier
 */
export const Example6_ConditionalBadge: React.FC<{ school: Partial<SchoolWithTrust> }> = ({
  school,
}) => {
  return (
    <Box>
      <Typography variant="h6">{school.name}</Typography>
      {school.trustTier && (
        <TrustBadge tier={school.trustTier} showTooltip={true} />
      )}
    </Box>
  );
};

/**
 * Example 7: Badge with Custom Action
 * Badge click triggers custom logic (e.g., analytics, navigation)
 */
export const Example7_BadgeWithCustomAction: React.FC<{ school: SchoolWithTrust }> = ({
  school,
}) => {
  const handleBadgeClick = () => {
    // Example: Track analytics
    console.log('Trust badge clicked:', school.id, school.trustTier);

    // Example: Navigate to verification page
    // navigate(`/schools/${school.id}/verification`);

    // Example: Show toast notification
    // showToast('View detailed verification metrics');
  };

  return (
    <TrustBadge
      tier={school.trustTier}
      onClick={handleBadgeClick}
    />
  );
};

/**
 * Example 8: FSP Signals Only (No Badge)
 * Just display the signals panel without the badge
 */
export const Example8_SignalsPanelOnly: React.FC<{ school: SchoolWithTrust }> = ({ school }) => {
  return (
    <FSPSignalsPanel
      schoolName={school.name}
      tier={school.trustTier}
      signals={school.fspSignals}
    />
  );
};

/**
 * Example 9: Responsive Badge Sizing
 * Different sizes for different screen sizes
 */
export const Example9_ResponsiveBadge: React.FC<{ school: SchoolWithTrust }> = ({ school }) => {
  return (
    <Box
      sx={{
        // Small on mobile, medium on tablet, large on desktop
        '& .trust-badge-small': { display: { xs: 'inline-flex', sm: 'none' } },
        '& .trust-badge-medium': { display: { xs: 'none', sm: 'inline-flex', md: 'none' } },
        '& .trust-badge-large': { display: { xs: 'none', md: 'inline-flex' } },
      }}
    >
      <TrustBadge tier={school.trustTier} size="small" className="trust-badge-small" />
      <TrustBadge tier={school.trustTier} size="medium" className="trust-badge-medium" />
      <TrustBadge tier={school.trustTier} size="large" className="trust-badge-large" />
    </Box>
  );
};

/**
 * Example 10: Badge Without Tooltip
 * When tooltip would be redundant or distracting
 */
export const Example10_BadgeNoTooltip: React.FC<{ school: SchoolWithTrust }> = ({ school }) => {
  return (
    <Box>
      <TrustBadge tier={school.trustTier} showTooltip={false} />
      {/* Explanation shown elsewhere */}
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
        {school.name} is a Premier verified school
      </Typography>
    </Box>
  );
};

/**
 * Quick Copy-Paste Template
 * Start with this and customize as needed
 */
export const QuickStartTemplate: React.FC = () => {
  const [showSignals, setShowSignals] = useState(false);

  // Example school data
  const school: SchoolWithTrust = {
    id: '1',
    name: 'Example Flight School',
    trustTier: TrustTier.PREMIER,
    fspSignals: {
      avgHoursToPPL: 72,
      cancelRate: 8,
      onTimeRate: 96,
      studentSatisfaction: 4.8,
    },
  };

  return (
    <Box>
      {/* 1. Display badge */}
      <TrustBadge
        tier={school.trustTier}
        onClick={() => setShowSignals(true)}
      />

      {/* 2. Show signals when clicked */}
      {showSignals && (
        <Box sx={{ mt: 3 }}>
          <FSPSignalsPanel
            schoolName={school.name}
            tier={school.trustTier}
            signals={school.fspSignals}
          />
        </Box>
      )}
    </Box>
  );
};

/**
 * Integration Checklist
 *
 * When adding trust badges to your component:
 *
 * ✅ 1. Import TrustBadge and/or FSPSignalsPanel from './components'
 * ✅ 2. Import TrustTier enum from './types'
 * ✅ 3. Ensure your school data has a 'trustTier' property
 * ✅ 4. Add <TrustBadge tier={school.trustTier} /> where you want the badge
 * ✅ 5. Optional: Add onClick handler to show FSP signals
 * ✅ 6. Optional: Add FSPSignalsPanel component for detailed metrics
 * ✅ 7. Test keyboard navigation (Tab to focus, Enter to click)
 * ✅ 8. Verify tooltips appear on hover
 * ✅ 9. Check responsive behavior on mobile
 * ✅ 10. Verify colors match tier specifications
 */

export default {
  Example1_BasicBadge,
  Example2_BadgeInCard,
  Example3_ClickableBadgeModal,
  Example4_BadgeWithInlinePanel,
  Example5_MultipleBadges,
  Example6_ConditionalBadge,
  Example7_BadgeWithCustomAction,
  Example8_SignalsPanelOnly,
  Example9_ResponsiveBadge,
  Example10_BadgeNoTooltip,
  QuickStartTemplate,
};
