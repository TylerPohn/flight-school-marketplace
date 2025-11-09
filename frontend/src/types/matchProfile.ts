// Type definitions for AI matching questionnaire

export type TrainingGoal = 'PPL' | 'IR' | 'CPL' | 'ATPL' | 'Other';
export type TrainingType = 'Part141' | 'Part61' | 'No Preference';
export type IntensityPreference = 'Intensive' | 'Part-time' | 'Flexible';
export type PriorExperience = 'None' | 'Discovery' | '10-20 hours' | '20+ hours';
export type MilitaryBenefits = 'Yes' | 'No' | 'Prefer not to say';
export type TrustTier = 'Verified FSP' | 'Community-Verified' | 'Unverified';

export interface Location {
  city: string;
  state: string;
  lat?: number;
  lon?: number;
}

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

export interface CostBand {
  min: number;
  max: number;
}

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

export interface RankedSchool {
  school: MockSchool;
  matchScore: number;
  explanation: string;
  ranking: number; // 1-10 (top matches only)
  distance?: number; // Distance in miles from user's location
}

// For geocoding common cities
export interface CityCoordinates {
  [key: string]: {
    lat: number;
    lon: number;
  };
}
