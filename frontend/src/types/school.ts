/**
 * School Type Definitions
 *
 * Core types for representing flight schools in the marketplace.
 */

/**
 * Trust tier levels for school verification
 * - PREMIER: Highest tier, extensively verified
 * - VERIFIED_FSP: FSP-verified schools with quality signals
 * - COMMUNITY_VERIFIED: Community-reviewed and verified
 * - UNVERIFIED: Basic listing, not yet verified
 */
export type TrustTier = 'PREMIER' | 'VERIFIED_FSP' | 'COMMUNITY_VERIFIED' | 'UNVERIFIED';

/**
 * FAA training regulation types
 * - Part141: Structured curriculum with FAA oversight
 * - Part61: More flexible training requirements
 */
export type TrainingType = 'Part141' | 'Part61';

/**
 * Available pilot certification programs
 * - PPL: Private Pilot License
 * - IR: Instrument Rating
 * - CPL: Commercial Pilot License
 * - CFII: Certified Flight Instructor Instrument
 * - ATPL: Airline Transport Pilot License
 */
export type Program = 'PPL' | 'IR' | 'CPL' | 'CFII' | 'ATPL';

/**
 * Fleet aircraft details from DetailedSchool
 */
export interface FleetDetail {
  aircraftType: string;
  count: number;
  availability: 'High' | 'Medium' | 'Low';
}

/**
 * Simplified school interface used for listings and comparisons
 * This is the format returned by convertToSimpleSchool()
 */
export interface School {
  id: string;
  name: string;
  location: {
    city: string;
    state: string;
    zip?: string;
  };
  programs: Program[];
  trainingType: TrainingType;
  fleetSize: number;
  primaryAircraft: string[];
  costBand: {
    ppl: number;
    ir?: number;
    cpl?: number;
  };
  estimatedHoursToPPL: number;
  instructorCount: number;
  financingAvailable: boolean;
  trustTier: TrustTier;
  rating: {
    score: number;
    reviewCount: number;
  };
}
