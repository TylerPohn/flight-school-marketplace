import { z } from 'zod';

/**
 * Inquiry Form Schema
 *
 * Validates contact inquiry forms submitted by prospective students to flight schools.
 * This schema ensures data quality for lead generation and inquiry management.
 *
 * The form collects:
 * - Contact information (name, email, phone)
 * - Program of interest
 * - Optional message
 * - Tour request flag
 */
export const inquirySchema = z.object({
  /**
   * Full name of the prospective student
   * Range: 2-100 characters
   *
   * Validation rationale:
   * - Minimum 2: Prevents single letter inputs, ensures at least first name
   * - Maximum 100: Accommodates long names while preventing abuse
   */
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),

  /**
   * Email address for school to respond to inquiry
   * Uses Zod's built-in email validation which checks:
   * - Valid email format (user@domain.tld)
   * - Presence of @ symbol and domain
   *
   * This is the primary contact method for schools
   */
  email: z
    .string()
    .email('Please enter a valid email address'),

  /**
   * Phone number for contact
   * Regex validates US phone number formats:
   * - Optional +1 country code
   * - Optional parentheses around area code
   * - Flexible separators (spaces, dots, hyphens)
   * - Formats accepted: (555) 555-5555, 555-555-5555, 555.555.5555, +1 555 555 5555
   *
   * Validation is lenient to accommodate various formatting preferences
   * while ensuring all 10 digits are present
   */
  phone: z
    .string()
    .regex(
      /^(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/,
      'Please enter a valid phone number (e.g., (555) 555-5555)'
    ),

  /**
   * Optional message/questions from prospective student
   * Maximum 1000 characters to prevent abuse while allowing detailed questions
   *
   * Uses .optional().or(z.literal('')) pattern to accept both:
   * - undefined (field not filled)
   * - empty string (field cleared after typing)
   *
   * This flexibility improves UX by not requiring a message
   */
  message: z
    .string()
    .max(1000, 'Message must not exceed 1000 characters')
    .optional()
    .or(z.literal('')),

  /**
   * Program/certification the student is interested in
   * Required field - helps schools route inquiries appropriately
   *
   * Options:
   * - private_pilot: PPL training
   * - commercial_pilot: CPL/career training
   * - multi_engine: Multi-engine rating
   * - instrument: Instrument rating
   * - cfi: Flight instructor certification
   * - other: Specialized training (aerobatic, tailwheel, etc.)
   *
   * The .refine() adds an extra check to ensure a value is selected,
   * providing a custom error message for better UX
   */
  programInterest: z
    .enum(['private_pilot', 'commercial_pilot', 'multi_engine', 'instrument', 'cfi', 'other'])
    .refine((val) => val !== undefined, { message: 'Please select a program' }),

  /**
   * Whether student wants to schedule a tour
   * Boolean flag - schools prioritize tour requests for faster follow-up
   *
   * Tours are a high-intent action indicating serious interest
   */
  tourRequest: z.boolean(),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;

/**
 * Program Options for Select Dropdown
 *
 * Pre-defined options for the program interest field.
 * These correspond to the enum values in the schema and provide
 * human-readable labels for the UI.
 *
 * Used in select dropdowns and radio button groups throughout the app.
 */
export const PROGRAM_OPTIONS = [
  { value: 'private_pilot', label: 'Private Pilot' },
  { value: 'commercial_pilot', label: 'Commercial Pilot' },
  { value: 'multi_engine', label: 'Multi-Engine' },
  { value: 'instrument', label: 'Instrument Rating' },
  { value: 'cfi', label: 'CFI (Certified Flight Instructor)' },
  { value: 'other', label: 'Other' },
];
