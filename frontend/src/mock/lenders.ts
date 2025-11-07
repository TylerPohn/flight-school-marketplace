/**
 * Mock Lender Data
 *
 * This file contains mock lender data, credit tier definitions,
 * and VA benefit tier definitions for the financing calculator.
 */

// Type Definitions

export interface Lender {
  id: string;
  name: string;
  logo?: string;
  description: string;
  ratesByTier: {
    excellent: { min: number; max: number };
    good: { min: number; max: number };
    fair: { min: number; max: number };
  };
  features: string[];
  applyUrl: string;
}

export interface CreditTier {
  id: 'excellent' | 'good' | 'fair';
  label: string;
  description: string;
  scoreRange: string;
  percentile: string;
}

export interface VABenefit {
  id: string;
  label: string;
  coveragePercentage: number;
  description: string;
}

// Mock Lenders

export const mockLenders: Lender[] = [
  {
    id: 'skyfund',
    name: 'SkyFund Credit Union',
    logo: undefined,
    description: 'Community-focused credit union specializing in aviation financing',
    ratesByTier: {
      excellent: { min: 3.5, max: 4.5 },
      good: { min: 5.5, max: 6.5 },
      fair: { min: 8.5, max: 9.5 },
    },
    features: ['Member benefits', 'No origination fee', 'Local branches'],
    applyUrl: 'https://example.com/skyfund/apply',
  },
  {
    id: 'cloudwings',
    name: 'CloudWings Financial',
    logo: undefined,
    description: 'Fast and flexible aviation loans with nationwide service',
    ratesByTier: {
      excellent: { min: 4.0, max: 5.0 },
      good: { min: 6.0, max: 7.5 },
      fair: { min: 9.0, max: 11.0 },
    },
    features: ['Fast approval', 'Flexible terms', '24/7 online access'],
    applyUrl: 'https://example.com/cloudwings/apply',
  },
  {
    id: 'altitude',
    name: 'AltitudeLoan Partners',
    logo: undefined,
    description: 'Competitive rates with no hidden fees or penalties',
    ratesByTier: {
      excellent: { min: 3.8, max: 4.8 },
      good: { min: 5.8, max: 7.0 },
      fair: { min: 8.8, max: 10.5 },
    },
    features: ['No prepayment penalty', 'Loyalty discounts', 'Rate matching'],
    applyUrl: 'https://example.com/altitude/apply',
  },
  {
    id: 'pilotfinance',
    name: 'PilotFinance Direct',
    logo: undefined,
    description: 'Specialized financing exclusively for pilot training programs',
    ratesByTier: {
      excellent: { min: 4.2, max: 5.2 },
      good: { min: 6.5, max: 8.0 },
      fair: { min: 9.5, max: 12.0 },
    },
    features: [
      'Specialized for pilots',
      'Deferred payments option',
      'Career placement support',
    ],
    applyUrl: 'https://example.com/pilotfinance/apply',
  },
  {
    id: 'veteransfirst',
    name: 'VeteransFirst Lending',
    logo: undefined,
    description:
      'Dedicated to serving military veterans and their families with special benefits',
    ratesByTier: {
      excellent: { min: 3.0, max: 4.0 },
      good: { min: 5.0, max: 6.0 },
      fair: { min: 7.5, max: 9.0 },
    },
    features: ['VA specialist', 'Military discount', 'Veteran support team'],
    applyUrl: 'https://example.com/veteransfirst/apply',
  },
];

// Credit Tier Definitions

export const creditTiers: CreditTier[] = [
  {
    id: 'excellent',
    label: 'Excellent',
    description: 'Very strong credit history',
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

// VA Benefit Tier Definitions

export const vaBenefits: VABenefit[] = [
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

// Helper Functions

/**
 * Get lenders filtered by credit tier (all lenders available for all tiers)
 *
 * @param _creditTier - Credit tier to filter by
 * @returns Array of lenders
 */
export function getLendersByTier(
  _creditTier: 'excellent' | 'good' | 'fair'
): Lender[] {
  // All lenders support all credit tiers in this mock implementation
  return mockLenders;
}

/**
 * Get credit tier label by ID
 *
 * @param id - Credit tier ID
 * @returns Credit tier label or empty string if not found
 */
export function getCreditTierLabel(id: string): string {
  const tier = creditTiers.find((t) => t.id === id);
  return tier ? tier.label : '';
}

/**
 * Get VA benefit by ID
 *
 * @param id - VA benefit ID
 * @returns VA benefit object or undefined if not found
 */
export function getVABenefitById(id: string): VABenefit | undefined {
  return vaBenefits.find((b) => b.id === id);
}
