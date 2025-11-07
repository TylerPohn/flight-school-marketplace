# PR-8: Contact & Inquiry Forms

## Goal
Enable users to express interest in flight schools by submitting contact and inquiry forms. This PR implements a **demo-mode** form system with full validation and user feedback, but does not actually send data to a backend or email service.

---

## Context

**DEMO MODE - Important:**
- Form validation works correctly
- Success messages display after submission
- Forms do NOT actually send data anywhere
- No real emails are sent
- No leads are stored in a database
- This is a complete UI/UX implementation with mock submission behavior
- Designed to be easily swapped out for real backend integration later

This PR builds on the foundation established in PR-3, which handles profile page layouts and school information display.

---

## Depends On

- **PR-3**: Contact forms appear on school profile pages and require proper page structure

---

## Requirements

### Form Fields
The inquiry form must collect the following information:

1. **Name** (required, string, 2-100 characters)
2. **Email** (required, valid email format)
3. **Phone** (required, valid phone format - accepts (555) 555-5555, 555-555-5555, or 5555555555)
4. **Message** (optional, string, max 1000 characters)
5. **Program Interest** (required, select from: Private Pilot, Commercial Pilot, Multi-Engine, Instrument Rating, CFI, Other)
6. **Tour/Discovery Flight Request** (optional, checkbox)

### Validation
- Client-side validation using **Zod** schema
- Real-time validation feedback on blur
- Submit button disabled until form is valid
- Clear error messages for each field

### Success State
- After form submission, display a success confirmation message
- Message should include user's name
- Show in either a modal dialog or snackbar notification
- Allow user to submit another inquiry or return to page

### Locations
Forms must appear in:
1. **School Profile Pages** - As a CTA section below school information
2. **Standalone Inquiry Page** - `/inquiry` or `/contact` route for direct access

### Mock Submission Behavior
- Simulate realistic API request with **2-second delay**
- Show loading state during submission (disable button, show spinner)
- After delay, show success message
- No actual HTTP request or data persistence

---

## Files to Create

### 1. `src/schemas/inquirySchema.ts`
Zod validation schema for the inquiry form with all validations

### 2. `src/components/InquiryForm.tsx`
Main reusable form component using React Hook Form and MUI components

### 3. `src/components/SuccessModal.tsx`
Modal/Snackbar component to display success confirmation

### Optional Updates:
- Update `SchoolProfilePage.tsx` to include inquiry form CTA
- Create `/src/pages/InquiryPage.tsx` for standalone inquiry form

---

## Step-by-Step Implementation

### Step 1: Create Zod Validation Schema
**File: `src/schemas/inquirySchema.ts`**

Create a Zod schema that validates all inquiry form fields with appropriate error messages:

```typescript
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
    .enum(
      ['private_pilot', 'commercial_pilot', 'multi_engine', 'instrument', 'cfi', 'other'],
      { errorMap: () => ({ message: 'Please select a program' }) }
    ),

  tourRequest: z
    .boolean()
    .default(false),
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
```

**Validation Details:**
- **Name**: 2-100 characters, catches empty or too-long values
- **Email**: Uses built-in email validation, clear feedback
- **Phone**: Regex accepts multiple formats: (555) 555-5555, 555-555-5555, 5555555555
- **Message**: Optional field, max 1000 chars
- **Program Interest**: Enum ensures valid selection from predefined list
- **Tour Request**: Boolean checkbox, defaults to false

### Step 2: Build InquiryForm Component with React Hook Form
**File: `src/components/InquiryForm.tsx`**

Create a reusable form component that:
- Uses `react-hook-form` for form state management
- Integrates `zod` validation with `zodResolver`
- Uses Material-UI components for consistent styling
- Shows validation errors inline
- Manages loading state during submission

```typescript
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Box,
  Stack,
} from '@mui/material';
import { inquirySchema, PROGRAM_OPTIONS, type InquiryFormData } from '../schemas/inquirySchema';

interface InquiryFormProps {
  onSubmitSuccess?: (data: InquiryFormData) => void;
  schoolId?: string;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({ onSubmitSuccess, schoolId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      programInterest: 'private_pilot',
      tourRequest: false,
    },
  });

  const onSubmit = async (data: InquiryFormData) => {
    setIsSubmitting(true);

    // Mock submission - simulate 2-second API request
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('Form submitted (mock):', data);

    setIsSubmitting(false);

    // Trigger success callback
    if (onSubmitSuccess) {
      onSubmitSuccess(data);
    }

    // Reset form for next submission
    reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={3}>
        {/* Name Field */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Full Name"
              variant="outlined"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
              disabled={isSubmitting}
            />
          )}
        />

        {/* Email Field */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={isSubmitting}
            />
          )}
        />

        {/* Phone Field */}
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone Number"
              variant="outlined"
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone?.message || '(555) 555-5555'}
              disabled={isSubmitting}
              placeholder="(555) 555-5555"
            />
          )}
        />

        {/* Program Interest Select */}
        <Controller
          name="programInterest"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.programInterest} disabled={isSubmitting}>
              <InputLabel>Program Interest</InputLabel>
              <Select
                {...field}
                label="Program Interest"
              >
                {PROGRAM_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        {/* Message Field */}
        <Controller
          name="message"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Additional Message"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              error={!!errors.message}
              helperText={errors.message?.message}
              disabled={isSubmitting}
              placeholder="Tell us more about your interest in aviation..."
            />
          )}
        />

        {/* Tour Request Checkbox */}
        <Controller
          name="tourRequest"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  {...field}
                  checked={field.value}
                  disabled={isSubmitting}
                />
              }
              label="I'm interested in scheduling a discovery flight or facility tour"
            />
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!isValid || isSubmitting}
          sx={{ position: 'relative', minHeight: '44px' }}
        >
          {isSubmitting ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              Sending...
            </>
          ) : (
            'Send Inquiry'
          )}
        </Button>
      </Stack>
    </Box>
  );
};
```

### Step 3: Add Form Fields with Proper Validation
Already implemented in Step 2 with `Controller` components for each field using react-hook-form integration.

Key points:
- Real-time validation with `mode: 'onBlur'`
- Field-specific error messages
- Helper text for formatting guidance (phone number)
- Disabled states during submission

### Step 4: Create Mock Submission Handler
Implemented in Step 2's `onSubmit` function:
- Uses `setTimeout` for 2-second delay
- Sets loading state before and after
- Logs data to console (development only)
- Resets form after success
- Calls optional callback for parent component to handle success UI

### Step 5: Build Success Modal/Snackbar
**File: `src/components/SuccessModal.tsx`**

Create a confirmation component that displays after successful submission:

```typescript
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CheckCircleIcon,
} from '@mui/material';

interface SuccessModalProps {
  open: boolean;
  userName: string;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ open, userName, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: 'center', pt: 3 }}>
        <CheckCircleIcon
          sx={{
            fontSize: 60,
            color: 'success.main',
            display: 'block',
            mx: 'auto',
            mb: 2,
          }}
        />
      </DialogTitle>
      <DialogContent sx={{ textAlign: 'center', pb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Thank you, {userName}!
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Your inquiry has been submitted successfully. Our team will review your request and
          get back to you soon.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
```

### Step 6: Integrate into Profile Pages
**Update: `src/pages/SchoolProfilePage.tsx`** (or equivalent)

Add inquiry form section to the school profile page:

```typescript
import { InquiryForm } from '../components/InquiryForm';
import { SuccessModal } from '../components/SuccessModal';

// In your SchoolProfilePage component:
const [showSuccessModal, setShowSuccessModal] = useState(false);
const [submittedName, setSubmittedName] = useState('');

const handleFormSuccess = (data) => {
  setSubmittedName(data.name);
  setShowSuccessModal(true);
};

// In JSX:
<Box sx={{ mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
  <Typography variant="h5" gutterBottom>
    Interested in Learning More?
  </Typography>
  <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
    Get in touch with {school.name} directly. Fill out the form below and they'll contact you soon.
  </Typography>
  <InquiryForm
    onSubmitSuccess={handleFormSuccess}
    schoolId={school.id}
  />
</Box>

<SuccessModal
  open={showSuccessModal}
  userName={submittedName}
  onClose={() => setShowSuccessModal(false)}
/>
```

### Step 7: Add Error Handling and Loading States
Implemented in the InquiryForm component:

**Error Handling:**
- Zod validation catches all errors before submission
- Form controls show validation errors inline
- Submit button disabled until all fields are valid
- No submission attempt if validation fails

**Loading States:**
- Button shows loading spinner during submission
- All form inputs disabled during submission
- Button text changes to "Sending..."
- Prevents double-submission

**User Feedback:**
- Real-time error messages appear on blur
- Success modal displays after 2-second delay
- Clear confirmation message with user's name

---

## Acceptance Criteria

- [x] **Validation Works**: All form fields validate according to Zod schema
- [x] **Required Fields**: Name, email, phone, and program interest are required
- [x] **Email Validation**: Accepts only valid email formats
- [x] **Phone Validation**: Accepts multiple phone formats
- [x] **Submit Button**: Disabled until all required fields are valid
- [x] **Loading State**: Shows spinner and "Sending..." during submission
- [x] **Mock Delay**: Form submission simulates 2-second API request
- [x] **Success Message**: Displays personalized confirmation with user's name
- [x] **Form Reset**: Form clears after successful submission
- [x] **Error Display**: Validation errors show inline on each field
- [x] **Disabled Inputs**: All form controls disabled during submission
- [x] **Success Modal**: User can dismiss and see confirmation

---

## Design Notes

### Material-UI Components Used
- **TextField**: All text input fields (name, email, phone, message)
- **Select & MenuItem**: Program interest dropdown
- **Checkbox & FormControlLabel**: Tour request checkbox
- **Button**: Submit button with loading state
- **CircularProgress**: Loading spinner during submission
- **Dialog**: Success confirmation modal
- **Stack & Box**: Layout and spacing
- **FormControl & InputLabel**: Proper form structure

### Styling Considerations
- Use consistent spacing with `Stack` component
- Error states should use `error` prop and show helper text
- Loading spinner should appear next to button text
- Success modal should be prominent and centered
- Disabled state should provide clear visual feedback

### Accessibility
- All form inputs have associated labels
- Error messages linked to inputs via `helperText`
- Submit button has clear, descriptive text
- Loading state clearly indicated
- Keyboard navigation support through MUI components

---

## Future Hook Points

### Backend Integration
When ready to connect to a real backend, modify the `onSubmit` function in `InquiryForm.tsx`:

```typescript
// Replace this:
const onSubmit = async (data: InquiryFormData) => {
  setIsSubmitting(true);
  await new Promise(resolve => setTimeout(resolve, 2000));
  console.log('Form submitted (mock):', data);
  setIsSubmitting(false);
  if (onSubmitSuccess) {
    onSubmitSuccess(data);
  }
  reset();
};

// With this:
const onSubmit = async (data: InquiryFormData) => {
  setIsSubmitting(true);
  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        schoolId: schoolId, // Add school context if needed
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit inquiry');
    }

    const result = await response.json();

    setIsSubmitting(false);
    if (onSubmitSuccess) {
      onSubmitSuccess(data);
    }
    reset();
  } catch (error) {
    setIsSubmitting(false);
    // Show error snackbar
    console.error('Inquiry submission error:', error);
  }
};
```

### API Endpoint: `POST /api/leads`
Expected payload structure:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "(555) 555-5555",
  "message": "I'm very interested in your programs",
  "programInterest": "private_pilot",
  "tourRequest": true,
  "schoolId": "school-123"
}
```

### Enhancements for Production
1. **Email Notifications**: Send confirmation email to user
2. **Lead Storage**: Save inquiries to database for school admins
3. **Email to School**: Notify school of new inquiry
4. **Follow-up**: Schedule automated follow-up emails
5. **Analytics**: Track inquiry source and conversion rates
6. **Error Recovery**: Better error messages and retry logic
7. **Rate Limiting**: Prevent spam submissions
8. **CAPTCHA**: Add verification for public forms

---

## Development Notes

### Required Dependencies
- `react-hook-form` (already should be in project)
- `@hookform/resolvers` (for Zod integration)
- `zod` (validation library)
- `@mui/material` (component library)

### Testing Considerations
- Test validation for all field combinations
- Test phone number regex with various formats
- Test email validation edge cases
- Test form reset after submission
- Test loading states and button behavior
- Test success modal display

### Browser Compatibility
- Works on all modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-responsive through MUI's responsive design
- Keyboard navigation fully supported

---

## References

- React Hook Form: https://react-hook-form.com/
- Zod: https://zod.dev/
- Material-UI: https://mui.com/
- PR-3 (School Profile Pages)

---

**Status**: Ready for Junior Developer Implementation
**Difficulty**: Beginner to Intermediate
**Estimated Time**: 2-3 hours
**Dependencies**: PR-3 completed
