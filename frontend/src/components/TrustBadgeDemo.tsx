/**
 * Trust Badge and FSP Signals Demo Component
 *
 * This file demonstrates how to use the TrustBadge and FSPSignalsPanel components.
 * It can be used as a reference for implementing these components in SchoolCard
 * and school profile pages (PR-1 and PR-3).
 *
 * NOTE: This is a demo/example file for development reference only.
 */

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { TrustBadge } from './TrustBadge';
import { FSPSignalsPanel } from './FSPSignalsPanel';
import { TrustTier } from '../types/trustTier';
import type { SchoolWithTrust } from '../types/trustTier';

/**
 * Mock school data for demonstration
 */
const DEMO_SCHOOLS: SchoolWithTrust[] = [
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

/**
 * Demo School Card Component
 *
 * Example of how to integrate TrustBadge into a school card component.
 * This pattern can be used in PR-1's SchoolCard component.
 */
const DemoSchoolCard: React.FC<{ school: SchoolWithTrust }> = ({ school }) => {
  const [showSignals, setShowSignals] = useState(false);

  return (
    <>
      <Paper
        elevation={2}
        sx={{
          p: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.2s',
          '&:hover': {
            elevation: 4,
            transform: 'translateY(-4px)',
          },
        }}
      >
        {/* School Header with Badge */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {school.name}
          </Typography>
          <TrustBadge
            tier={school.trustTier}
            onClick={school.fspSignals ? () => setShowSignals(true) : undefined}
          />
        </Box>

        {/* Placeholder for other school info */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Location: Sample City, ST
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Aircraft: Cessna 172, Piper Warrior
        </Typography>

        {/* Clickable badge hint */}
        {school.fspSignals && (
          <Typography variant="caption" color="primary" sx={{ mt: 'auto', pt: 2 }}>
            Click badge to view performance metrics
          </Typography>
        )}
      </Paper>

      {/* FSP Signals Dialog */}
      <Dialog
        open={showSignals}
        onClose={() => setShowSignals(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <IconButton
            aria-label="close"
            onClick={() => setShowSignals(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
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
 * Main Demo Component
 *
 * Displays all trust tier variants and demonstrates component usage.
 */
export const TrustBadgeDemo: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
          Trust Tier Badges Demo
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Demonstration of trust tier badges and FSP signals panel components.
          This shows all four trust tier variants with their respective styling and features.
        </Typography>
      </Box>

      {/* Badge Variants Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          Badge Variants
        </Typography>
        <Stack spacing={2}>
          {/* Different Sizes */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
              Size Variants (Premier)
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <TrustBadge tier={TrustTier.PREMIER} size="small" />
              <TrustBadge tier={TrustTier.PREMIER} size="medium" />
              <TrustBadge tier={TrustTier.PREMIER} size="large" />
            </Stack>
          </Box>

          {/* All Trust Tiers */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
              All Trust Tiers (hover for tooltips)
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <TrustBadge tier={TrustTier.PREMIER} />
              <TrustBadge tier={TrustTier.VERIFIED_FSP} />
              <TrustBadge tier={TrustTier.COMMUNITY_VERIFIED} />
              <TrustBadge tier={TrustTier.UNVERIFIED} />
            </Stack>
          </Box>
        </Stack>
      </Paper>

      {/* School Cards Grid */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          School Cards with Trust Badges
        </Typography>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
          gap: 3
        }}>
          {DEMO_SCHOOLS.map((school) => (
            <DemoSchoolCard key={school.id} school={school} />
          ))}
        </Box>
      </Box>

      {/* FSP Signals Panels */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          FSP Signals Panels
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Click on school badges in the cards above, or view all panels below:
        </Typography>
        <Stack spacing={3}>
          {DEMO_SCHOOLS.map((school) => (
            <FSPSignalsPanel
              key={school.id}
              schoolName={school.name}
              tier={school.trustTier}
              signals={school.fspSignals}
            />
          ))}
        </Stack>
      </Box>

      {/* Implementation Notes */}
      <Paper sx={{ p: 3, mt: 4, backgroundColor: 'rgba(33, 150, 243, 0.05)' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Implementation Notes
        </Typography>
        <Typography variant="body2" component="div" sx={{ '& ul': { mt: 1, pl: 2 } }}>
          <strong>For PR-1 (School Cards):</strong>
          <ul>
            <li>Import TrustBadge component into SchoolCard</li>
            <li>Add trust tier badge to card header or top-right corner</li>
            <li>Optional: Add click handler to open FSPSignalsPanel in a modal</li>
          </ul>
          <strong>For PR-3 (School Profile):</strong>
          <ul>
            <li>Display trust badge prominently in profile header</li>
            <li>Show FSPSignalsPanel below or beside main school info</li>
            <li>Consider making signals panel always visible on profile pages</li>
          </ul>
          <strong>Accessibility:</strong>
          <ul>
            <li>All colors meet WCAG AA contrast requirements</li>
            <li>Badges are keyboard accessible (Tab to focus)</li>
            <li>Tooltips appear on both hover and keyboard focus</li>
            <li>Screen readers announce tier information via aria-label</li>
          </ul>
        </Typography>
      </Paper>
    </Container>
  );
};

export default TrustBadgeDemo;
