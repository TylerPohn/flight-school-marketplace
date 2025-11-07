/**
 * Constants Exports
 *
 * Central export file for all constant definitions and configurations.
 */

export {
  TRUST_TIER_CONFIG,
  INDUSTRY_BENCHMARKS,
  MOCK_FSP_SIGNALS,
  getMockSignalsForTier,
} from './trustTiers';
export type { TierConfig } from './trustTiers';

export {
  MOCK_SCHOOLS_WITH_TRUST,
  getSchoolsByTier,
  getRandomSchool,
  getSchoolById,
} from './mockSchools';
