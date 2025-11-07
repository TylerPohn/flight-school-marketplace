import { z } from 'zod';

// Step 1: Training Goals & Programs
export const stepOneSchema = z.object({
  trainingGoal: z.enum(['PPL', 'IR', 'CPL', 'ATPL', 'Other']),
  trainingTypePreference: z.enum(['Part141', 'Part61', 'No Preference']),
  aircraftPreference: z.string().optional(),
});

export type StepOneFormData = z.infer<typeof stepOneSchema>;

// Step 2: Budget
export const stepTwoSchema = z.object({
  maxBudget: z
    .number()
    .min(5000, 'Minimum budget is $5,000')
    .max(100000, 'Maximum budget is $100,000'),
  financingInterest: z.boolean(),
  militaryBenefits: z.enum(['Yes', 'No', 'Prefer not to say']),
});

export type StepTwoFormData = z.infer<typeof stepTwoSchema>;

// Step 3: Location
export const stepThreeSchema = z.object({
  location: z.object({
    city: z.string().min(1, 'City is required'),
    state: z.string().min(2, 'State is required'),
    lat: z.number().optional(),
    lon: z.number().optional(),
  }),
  searchRadius: z
    .number()
    .min(0, 'Minimum radius is 0 miles')
    .max(500, 'Maximum radius is 500 miles'),
  housingNeeded: z.boolean(),
});

export type StepThreeFormData = z.infer<typeof stepThreeSchema>;

// Step 4: Training Preferences
export const stepFourSchema = z.object({
  intensityPreference: z.enum(['Intensive', 'Part-time', 'Flexible']),
  preferences: z
    .array(z.string())
    .min(1, 'Please select at least one preference')
    .max(3, 'Please select no more than 3 preferences'),
  priorExperience: z.enum(['None', 'Discovery', '10-20 hours', '20+ hours']),
});

export type StepFourFormData = z.infer<typeof stepFourSchema>;

// Complete match profile schema (all steps combined)
export const matchProfileSchema = z.object({
  ...stepOneSchema.shape,
  ...stepTwoSchema.shape,
  ...stepThreeSchema.shape,
  ...stepFourSchema.shape,
});

export type MatchProfileFormData = z.infer<typeof matchProfileSchema>;
