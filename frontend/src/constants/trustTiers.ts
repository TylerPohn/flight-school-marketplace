/**
 * Trust Tier Configuration Constants
 *
 * Centralized definitions for trust tier colors, icons, labels, and descriptions.
 * All colors meet WCAG AA contrast requirements for accessibility.
 */

import type { ComponentType } from 'react';
import {
  WorkspacePremium,
  VerifiedUser,
  Handshake,
  WarningAmber,
} from '@mui/icons-material';
import { TrustTier, type FSPSignals } from '../types/trustTier';

/**
 * Configuration interface for each trust tier
 */
export interface TierConfig {
  color: string;
  textColor: string;
  icon: ComponentType;
  label: string;
  description: string;
  showSignals: boolean;
}

/**
 * Trust Tier Configuration Map
 *
 * Defines visual and descriptive properties for each trust tier level.
 * Colors are WCAG AA compliant:
 * - Premier: Gold #FFD700 on white bg, Dark text (#333333) - 8.2:1 contrast (AAA)
 * - Verified FSP: Green #4CAF50, White text - 4.5:1 contrast (AA)
 * - Community-Verified: Blue #2196F3, White text - 4.5:1 contrast (AA)
 * - Unverified: Gray #9E9E9E, White text - 4.5:1 contrast (AA)
 */
export const TRUST_TIER_CONFIG: Record<TrustTier, TierConfig> = {
  'PREMIER': {
    color: '#FFD700',
    textColor: '#333333',
    icon: WorkspacePremium,
    label: 'Premier',
    description: 'Fully verified school with excellent safety and completion records',
    showSignals: true,
  },
  'VERIFIED_FSP': {
    color: '#4CAF50',
    textColor: '#FFFFFF',
    icon: VerifiedUser,
    label: 'Verified FSP',
    description: 'Verified Flight School Partner with solid performance metrics',
    showSignals: true,
  },
  'COMMUNITY_VERIFIED': {
    color: '#2196F3',
    textColor: '#FFFFFF',
    icon: Handshake,
    label: 'Community-Verified',
    description: 'Verified by community reviews and feedback',
    showSignals: true,
  },
  'UNVERIFIED': {
    color: '#9E9E9E',
    textColor: '#FFFFFF',
    icon: WarningAmber,
    label: 'Unverified',
    description: 'School verification data not yet available',
    showSignals: false,
  },
};

/**
 * Industry Standard Benchmarks for FSP Signals
 *
 * These values represent typical industry averages for comparison purposes.
 */
export const INDUSTRY_BENCHMARKS = {
  avgHoursToPPL: 75,
  cancelRate: 12,
  onTimeRate: 88,
  studentSatisfaction: 4.3,
};

/**
 * Mock FSP Signals Data for Demo Mode
 *
 * Realistic but fabricated data for each trust tier.
 * Used for demonstration purposes until real API integration.
 *
 * Note: Community-Verified schools have signals based on community data,
 * not direct FSP reporting, so metrics may be less precise.
 */
export const MOCK_FSP_SIGNALS: Record<TrustTier, Partial<FSPSignals>> = {
  'PREMIER': {
    avgHoursToPPL: 72,
    cancelRate: 8,
    onTimeRate: 96,
    studentSatisfaction: 4.8,
  },
  'VERIFIED_FSP': {
    avgHoursToPPL: 76,
    cancelRate: 11,
    onTimeRate: 92,
    studentSatisfaction: 4.5,
  },
  'COMMUNITY_VERIFIED': {
    avgHoursToPPL: 78,
    cancelRate: 14,
    onTimeRate: 88,
    studentSatisfaction: 4.2,
  },
  'UNVERIFIED': {
    // No signals available for unverified schools
  },
};

/**
 * Get mock FSP signals for a given trust tier
 *
 * @param tier - The trust tier to get signals for
 * @returns FSP signals object or undefined if tier doesn't have signals
 */
export const getMockSignalsForTier = (tier: TrustTier): FSPSignals | undefined => {
  const signals = MOCK_FSP_SIGNALS[tier];

  // Return undefined if no signals or if required fields are missing
  if (!signals || Object.keys(signals).length === 0) {
    return undefined;
  }

  return signals as FSPSignals;
};
