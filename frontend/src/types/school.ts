// School type definition for flight school marketplace
export type TrustTier = 'PREMIER' | 'VERIFIED_FSP' | 'COMMUNITY_VERIFIED' | 'UNVERIFIED';
export type TrainingType = 'Part141' | 'Part61';
export type Program = 'PPL' | 'IR' | 'CPL' | 'CFII' | 'ATPL';

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
