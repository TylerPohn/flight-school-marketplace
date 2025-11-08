/**
 * Mock School Data for Demo Mode
 *
 * Provides realistic but fabricated school data for development and testing.
 * This data can be used throughout the application until real API integration.
 */

import { TrustTier, type SchoolWithTrust } from '../types/trustTier';

/**
 * Mock Schools with Trust Tier Data
 *
 * A collection of example schools representing all trust tiers.
 * Useful for testing UI components and demonstrating features.
 */
export const MOCK_SCHOOLS_WITH_TRUST: SchoolWithTrust[] = [
  {
    id: '1',
    name: 'Elite Flight Academy',
    trustTier: TrustTier.PREMIER as TrustTier,
    fspSignals: {
      avgHoursToPPL: 72,
      cancelRate: 8,
      onTimeRate: 96,
      studentSatisfaction: 4.8,
    },
  },
  {
    id: '2',
    name: 'SkyHigh Aviation Training Center',
    trustTier: TrustTier.PREMIER as TrustTier,
    fspSignals: {
      avgHoursToPPL: 70,
      cancelRate: 7,
      onTimeRate: 97,
      studentSatisfaction: 4.9,
    },
  },
  {
    id: '3',
    name: 'Certified Wings Flight School',
    trustTier: TrustTier.VERIFIED_FSP as TrustTier,
    fspSignals: {
      avgHoursToPPL: 76,
      cancelRate: 11,
      onTimeRate: 92,
      studentSatisfaction: 4.5,
    },
  },
  {
    id: '4',
    name: 'Horizon Aviation Institute',
    trustTier: TrustTier.VERIFIED_FSP as TrustTier,
    fspSignals: {
      avgHoursToPPL: 74,
      cancelRate: 10,
      onTimeRate: 93,
      studentSatisfaction: 4.6,
    },
  },
  {
    id: '5',
    name: 'Blue Sky Flight Training',
    trustTier: TrustTier.VERIFIED_FSP as TrustTier,
    fspSignals: {
      avgHoursToPPL: 77,
      cancelRate: 12,
      onTimeRate: 91,
      studentSatisfaction: 4.4,
    },
  },
  {
    id: '6',
    name: 'Community Verified Aviation',
    trustTier: TrustTier.COMMUNITY_VERIFIED as TrustTier,
    fspSignals: {
      avgHoursToPPL: 78,
      cancelRate: 14,
      onTimeRate: 88,
      studentSatisfaction: 4.2,
    },
  },
  {
    id: '7',
    name: 'Local Wings Flight School',
    trustTier: TrustTier.COMMUNITY_VERIFIED as TrustTier,
    fspSignals: {
      avgHoursToPPL: 80,
      cancelRate: 15,
      onTimeRate: 86,
      studentSatisfaction: 4.1,
    },
  },
  {
    id: '8',
    name: 'Freedom Flight Academy',
    trustTier: TrustTier.COMMUNITY_VERIFIED as TrustTier,
    fspSignals: {
      avgHoursToPPL: 79,
      cancelRate: 13,
      onTimeRate: 89,
      studentSatisfaction: 4.3,
    },
  },
  {
    id: '9',
    name: 'New Aviation School',
    trustTier: TrustTier.UNVERIFIED as TrustTier,
    // No fspSignals for unverified schools
  },
  {
    id: '10',
    name: 'Startup Flight Training',
    trustTier: TrustTier.UNVERIFIED as TrustTier,
    // No fspSignals for unverified schools
  },
];

/**
 * Get schools by trust tier
 *
 * Utility function to filter schools by their trust tier level.
 *
 * @param tier - The trust tier to filter by
 * @returns Array of schools with the specified trust tier
 */
export const getSchoolsByTier = (tier: TrustTier): SchoolWithTrust[] => {
  return MOCK_SCHOOLS_WITH_TRUST.filter((school) => school.trustTier === tier);
};

/**
 * Get a random school
 *
 * Returns a random school from the mock data.
 * Useful for testing and demonstrations.
 *
 * @returns A random school object
 */
export const getRandomSchool = (): SchoolWithTrust => {
  const randomIndex = Math.floor(Math.random() * MOCK_SCHOOLS_WITH_TRUST.length);
  return MOCK_SCHOOLS_WITH_TRUST[randomIndex];
};

/**
 * Get school by ID
 *
 * Find a school by its unique identifier.
 *
 * @param id - The school ID to search for
 * @returns The school object or undefined if not found
 */
export const getSchoolById = (id: string): SchoolWithTrust | undefined => {
  return MOCK_SCHOOLS_WITH_TRUST.find((school) => school.id === id);
};
