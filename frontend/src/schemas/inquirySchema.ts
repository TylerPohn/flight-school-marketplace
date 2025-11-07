import { z } from 'zod';

export const inquirySchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),

  email: z
    .string()
    .email('Please enter a valid email address'),

  phone: z
    .string()
    .regex(
      /^(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/,
      'Please enter a valid phone number (e.g., (555) 555-5555)'
    ),

  message: z
    .string()
    .max(1000, 'Message must not exceed 1000 characters')
    .optional()
    .or(z.literal('')),

  programInterest: z
    .enum(['private_pilot', 'commercial_pilot', 'multi_engine', 'instrument', 'cfi', 'other'])
    .refine((val) => val !== undefined, { message: 'Please select a program' }),

  tourRequest: z.boolean(),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;

// Program options for select dropdown
export const PROGRAM_OPTIONS = [
  { value: 'private_pilot', label: 'Private Pilot' },
  { value: 'commercial_pilot', label: 'Commercial Pilot' },
  { value: 'multi_engine', label: 'Multi-Engine' },
  { value: 'instrument', label: 'Instrument Rating' },
  { value: 'cfi', label: 'CFI (Certified Flight Instructor)' },
  { value: 'other', label: 'Other' },
];
