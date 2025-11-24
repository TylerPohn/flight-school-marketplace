import { z } from 'zod';

/**
 * Step 1 Schema - Training Goals & Programs
 *
 * Validates user's aviation training objectives and preferences.
 * This schema ensures users specify their certification goals and training approach.
 */
export const stepOneSchema = z.object({
  /**
   * Primary training goal/certification level
   * - PPL: Private Pilot License (entry level)
   * - IR: Instrument Rating (fly in IMC conditions)
   * - CPL: Commercial Pilot License (fly for compensation)
   * - ATPL: Airline Transport Pilot License (airline career path)
   * - Other: Specialized training (e.g., tailwheel, seaplane)
   *
   * Required field - drives the matching algorithm's primary weighting
   */
  trainingGoal: z.enum(['PPL', 'IR', 'CPL', 'ATPL', 'Other']),

  /**
   * Training regulation preference
   * - Part141: FAA-approved structured curriculum (faster, more expensive)
   * - Part61: Flexible customizable training (slower, potentially cheaper)
   * - No Preference: Algorithm considers both types
   *
   * Required field - impacts school filtering since not all schools offer both types
   */
  trainingTypePreference: z.enum(['Part141', 'Part61', 'No Preference']),

  /**
   * Preferred aircraft type for training (optional)
   * Users can specify aircraft preference (e.g., Cessna 172, Diamond DA40)
   * Used as a bonus factor in matching, not a hard filter
   */
  aircraftPreference: z.string().optional(),
});

export type StepOneFormData = z.infer<typeof stepOneSchema>;

/**
 * Step 2 Schema - Budget & Financing
 *
 * Validates financial information to match users with affordable schools.
 * Budget is a critical filter as it eliminates incompatible schools early.
 */
export const stepTwoSchema = z.object({
  /**
   * Maximum training budget in USD
   * Range: $5,000 - $100,000
   *
   * Validation rationale:
   * - $5,000 minimum: Even basic discovery/intro courses cost this much
   * - $100,000 maximum: Covers even the most expensive ATP programs
   *
   * This is a hard filter - schools outside this range are excluded from results
   */
  maxBudget: z
    .number()
    .min(5000, 'Minimum budget is $5,000')
    .max(100000, 'Maximum budget is $100,000'),

  /**
   * Whether user is interested in financing options
   * Used to prioritize schools with financing partnerships/programs
   * Boolean flag - no validation beyond type checking
   */
  financingInterest: z.boolean(),

  /**
   * Military benefits eligibility (GI Bill, VA benefits, etc.)
   * - Yes: User has military benefits to apply
   * - No: User does not have military benefits
   * - Prefer not to say: User wants privacy on military status
   *
   * Affects matching by prioritizing VA-approved schools for eligible users
   */
  militaryBenefits: z.enum(['Yes', 'No', 'Prefer not to say']),
});

export type StepTwoFormData = z.infer<typeof stepTwoSchema>;

/**
 * Step 3 Schema - Location & Geography
 *
 * Validates location preferences and search parameters.
 * Location is used for distance-based matching and filtering.
 */
export const stepThreeSchema = z.object({
  /**
   * User's preferred location for training
   * Can be current location or desired relocation destination
   */
  location: z.object({
    /**
     * City name - must be non-empty
     * Used with state for geocoding to get coordinates
     */
    city: z.string().min(1, 'City is required'),

    /**
     * State code (e.g., "CA", "TX")
     * Minimum 2 characters to accommodate state abbreviations
     * Used with city for geocoding
     */
    state: z.string().min(2, 'State is required'),

    /**
     * Latitude coordinate (optional)
     * Populated by geocoding service if not provided
     * Used for distance calculations
     */
    lat: z.number().optional(),

    /**
     * Longitude coordinate (optional)
     * Populated by geocoding service if not provided
     * Used for distance calculations
     */
    lon: z.number().optional(),
  }),

  /**
   * Maximum distance willing to travel (in miles)
   * Range: 0 - 500 miles
   *
   * Validation rationale:
   * - 0 miles: User wants schools in their exact city only
   * - 500 miles: Maximum practical distance (cross-country flight range)
   *
   * This creates a radius filter around the user's location
   */
  searchRadius: z
    .number()
    .min(0, 'Minimum radius is 0 miles')
    .max(500, 'Maximum radius is 500 miles'),

  /**
   * Whether user needs housing assistance
   * Some schools offer housing, others have partnerships with local rentals
   * Boolean flag used to boost schools with housing options in results
   */
  housingNeeded: z.boolean(),
});

export type StepThreeFormData = z.infer<typeof stepThreeSchema>;

/**
 * Step 4 Schema - Training Preferences & Experience
 *
 * Validates user's training style preferences and experience level.
 * These factors fine-tune the matching algorithm for personalized results.
 */
export const stepFourSchema = z.object({
  /**
   * Training schedule intensity preference
   * - Intensive: Full-time accelerated programs (2-6 months)
   * - Part-time: Weekend/evening training (6-12 months)
   * - Flexible: Self-paced with no fixed schedule
   *
   * Required field - helps match users with schools that support their timeline
   */
  intensityPreference: z.enum(['Intensive', 'Part-time', 'Flexible']),

  /**
   * Additional preferences/priorities (e.g., "Modern fleet", "Small class sizes")
   * Range: 1-3 selections
   *
   * Validation rationale:
   * - Minimum 1: Ensures user provides at least one priority
   * - Maximum 3: Prevents over-specification which could eliminate good matches
   *   Too many preferences can make matching overly restrictive
   *
   * These act as tiebreakers when match scores are similar
   */
  preferences: z
    .array(z.string())
    .min(1, 'Please select at least one preference')
    .max(3, 'Please select no more than 3 preferences'),

  /**
   * Prior flight training experience level
   * - None: Complete beginner, never flown
   * - Discovery: Taken a discovery flight only
   * - 10-20 hours: Some training but not soloed yet
   * - 20+ hours: Significant experience, possibly soloed
   *
   * Required field - helps recommend schools appropriate for skill level
   * Beginners may benefit from more structured programs, experienced
   * students may prefer flexible options
   */
  priorExperience: z.enum(['None', 'Discovery', '10-20 hours', '20+ hours']),
});

export type StepFourFormData = z.infer<typeof stepFourSchema>;

/**
 * Complete Match Profile Schema
 *
 * Combines all four step schemas into a single validation schema.
 * This represents the complete user profile used for matching.
 *
 * The schema is constructed by spreading all individual step schemas,
 * creating a unified object with all fields from steps 1-4.
 *
 * Used for:
 * - Final validation before submission
 * - Type checking the complete profile
 * - Ensuring all required fields are present before matching
 */
export const matchProfileSchema = z.object({
  ...stepOneSchema.shape,
  ...stepTwoSchema.shape,
  ...stepThreeSchema.shape,
  ...stepFourSchema.shape,
});

export type MatchProfileFormData = z.infer<typeof matchProfileSchema>;
