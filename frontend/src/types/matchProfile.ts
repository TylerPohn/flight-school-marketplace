/**
 * Match Profile Type Definitions
 *
 * Types used for the AI matching questionnaire and school matching algorithm.
 */

/**
 * Training goal/certification types
 * - PPL: Private Pilot License
 * - IR: Instrument Rating
 * - CPL: Commercial Pilot License
 * - ATPL: Airline Transport Pilot License
 * - Other: Custom training goals
 */
export type TrainingGoal = 'PPL' | 'IR' | 'CPL' | 'ATPL' | 'Other';

/**
 * Training regulation preference
 * - Part141: Structured FAA-approved curriculum
 * - Part61: Flexible training approach
 * - No Preference: Either type acceptable
 */
export type TrainingType = 'Part141' | 'Part61' | 'No Preference';

/**
 * Training schedule intensity preference
 * - Intensive: Full-time, accelerated training
 * - Part-time: Evening/weekend training
 * - Flexible: Adaptable schedule
 */
export type IntensityPreference = 'Intensive' | 'Part-time' | 'Flexible';

/**
 * Student's prior flight experience level
 */
export type PriorExperience = 'None' | 'Discovery' | '10-20 hours' | '20+ hours';

/**
 * Military benefits eligibility
 */
export type MilitaryBenefits = 'Yes' | 'No' | 'Prefer not to say';

/**
 * Trust tier for matching algorithm
 * Note: This uses different values than the School type's TrustTier
 */
export type TrustTier = 'Verified FSP' | 'Community-Verified' | 'Unverified';

/**
 * Geographic location with optional coordinates
 */
export interface Location {
  city: string;
  state: string;
  lat?: number;
  lon?: number;
}

/**
 * Complete user profile for school matching
 * Collected through multi-step questionnaire
 */
export interface MatchProfile {
  // Step 1: Training Goals & Programs
  trainingGoal: TrainingGoal;
  trainingTypePreference: TrainingType;
  aircraftPreference?: string;

  // Step 2: Budget
  maxBudget: number;
  financingInterest: boolean;
  militaryBenefits: MilitaryBenefits;

  // Step 3: Location
  location: Location;
  searchRadius: number; // miles
  housingNeeded: boolean;

  // Step 4: Training Preferences
  intensityPreference: IntensityPreference;
  preferences: string[]; // e.g., ["Low cost", "Fast completion", ...]
  priorExperience: PriorExperience;
}

/**
 * Price range for training programs
 */
export interface CostBand {
  min: number;
  max: number;
}

/**
 * School data format used by the matching algorithm
 * This is a simplified format optimized for matching calculations
 */
export interface MockSchool {
  id: string;
  name: string;
  location: Location;
  programs: TrainingGoal[];
  primaryProgram: TrainingGoal;
  costBand: CostBand;
  trainingType: TrainingType;
  intensityLevel: IntensityPreference;
  hasFinancing: boolean;
  hasHousing: boolean;
  fleetTypes: string[];
  fleetSize?: number; // Total aircraft count
  fleetDetails?: {
    aircraftType: string;
    count: number;
    availability: 'High' | 'Medium' | 'Low';
  }[];
  instructorCount: number;
  averageHoursToPPL: number;
  trustTier: TrustTier;
  preferences: string[]; // school's key strengths
  // Quality metrics for scoring
  avgRating?: number;
  reviewCount?: number;
  yearsInOperation?: number;
  fspSignals?: {
    avgHoursToPPL: number;
    scheduleConsistency: number;
    instructorReliability: number;
  };
}

/**
 * School with match score and AI-generated explanation
 * Returned by the matching algorithm
 */
export interface RankedSchool {
  school: MockSchool;
  matchScore: number; // 0-100 compatibility score
  explanation: string; // AI-generated explanation of why this school matches
  ranking: number; // 1-10 (top matches only)
  distance?: number; // Distance in miles from user's location
}

/**
 * City coordinates lookup for distance calculations
 * Maps "City, State" to lat/lon coordinates
 */
export interface CityCoordinates {
  [key: string]: {
    lat: number;
    lon: number;
  };
}
