/**
 * Trust Tier Types and Interfaces
 *
 * Defines the trust tier system used throughout the application to indicate
 * the verification status and trustworthiness of flight schools.
 */

/**
 * Trust tier type defining the four levels of school verification.
 *
 * PREMIER: Gold-tier, fully verified schools with excellent track records
 * VERIFIED_FSP: Verified flight school partners with solid performance metrics
 * COMMUNITY_VERIFIED: Schools verified through community reviews and feedback
 * UNVERIFIED: New or unverified schools with no verification data yet
 */
export type TrustTier = 'PREMIER' | 'VERIFIED_FSP' | 'COMMUNITY_VERIFIED' | 'UNVERIFIED';

/**
 * Trust tier constants for use as values
 */
export const TrustTier = {
  PREMIER: 'PREMIER',
  VERIFIED_FSP: 'VERIFIED_FSP',
  COMMUNITY_VERIFIED: 'COMMUNITY_VERIFIED',
  UNVERIFIED: 'UNVERIFIED',
};

/**
 * FSP (Flight School Partner) Signals Interface
 *
 * These are objective, measurable indicators of school quality and reliability
 * reported by verified flight school partners.
 *
 * @property avgHoursToPPL - Average hours from enrollment to Private Pilot License completion
 *                           Industry average: 70-80 hours. Lower is typically better.
 * @property cancelRate - Percentage of scheduled lessons that are canceled (0-100)
 *                       Industry average: 10-15%. Lower is better.
 * @property onTimeRate - Percentage of scheduled lessons that start on time (0-100)
 *                       Industry average: 85-90%. Higher is better.
 * @property studentSatisfaction - Student satisfaction rating on a 0-5 scale
 *                                Industry average: 4.0-4.5. Higher is better.
 */
export interface FSPSignals {
  avgHoursToPPL: number;
  cancelRate: number;
  onTimeRate: number;
  studentSatisfaction: number;
}

/**
 * School with Trust Information Interface
 *
 * Extends basic school data with trust tier and optional FSP signals.
 * Only Premier and Verified FSP tiers include FSP signals data.
 *
 * @property id - Unique identifier for the school
 * @property name - School name
 * @property trustTier - Current trust tier level
 * @property fspSignals - Optional FSP performance metrics (only for Premier and Verified tiers)
 */
export interface SchoolWithTrust {
  id: string;
  name: string;
  trustTier: TrustTier;
  fspSignals?: FSPSignals;
}
