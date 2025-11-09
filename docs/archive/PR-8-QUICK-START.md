# PR-8: Contact & Inquiry Forms - Quick Start Guide

## What Was Implemented

This PR implements a complete contact and inquiry form system for the Flight School Marketplace with:
- Full Zod validation
- React Hook Form integration
- Material-UI styling
- Loading states
- Success confirmation modal
- Mock submission (2-second delay)

## Files Created

```
frontend/src/
├── schemas/
│   └── inquirySchema.ts          # Zod validation schema
├── components/
│   ├── InquiryForm.tsx           # Main form component
│   └── SuccessModal.tsx          # Success confirmation modal
└── pages/
    ├── SchoolProfilePage.tsx     # School profile with inquiry form
    └── InquiryPage.tsx           # Standalone inquiry page
```

## Quick Test

### Option 1: Use SchoolProfilePage (Recommended)
Update your `App.tsx`:

```tsx
import { SchoolProfilePage } from './pages/SchoolProfilePage';

function App() {
  return <SchoolProfilePage />;
}
```

### Option 2: Use Standalone InquiryPage
Update your `App.tsx`:

```tsx
import { InquiryPage } from './pages/InquiryPage';

function App() {
  return <InquiryPage />;
}
```

### Option 3: Integrate into Existing Page
```tsx
import { InquiryForm } from './components/InquiryForm';
import { SuccessModal } from './components/SuccessModal';
import { useState } from 'react';

function YourPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [name, setName] = useState('');

  return (
    <>
      <InquiryForm 
        onSubmitSuccess={(data) => {
          setName(data.name);
          setShowSuccess(true);
        }}
        schoolId="your-school-id"
      />
      <SuccessModal
        open={showSuccess}
        userName={name}
        onClose={() => setShowSuccess(false)}
      />
    </>
  );
}
```

## Form Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Name | Text | Yes | 2-100 characters |
| Email | Email | Yes | Valid email format |
| Phone | Text | Yes | US phone format |
| Program Interest | Dropdown | Yes | 6 predefined options |
| Message | Textarea | No | Max 1000 characters |
| Tour Request | Checkbox | No | Boolean |

## Program Options
- Private Pilot
- Commercial Pilot
- Multi-Engine
- Instrument Rating
- CFI (Certified Flight Instructor)
- Other

## Testing the Form

1. **Start the dev server**:
   ```bash
   cd frontend
   npm run dev
   ```

2. **Open in browser**: http://localhost:5173

3. **Test validation**:
   - Try submitting empty form (button should be disabled)
   - Enter invalid email (e.g., "test@")
   - Enter invalid phone (e.g., "123")
   - Enter name with 1 character
   - Check error messages appear

4. **Test successful submission**:
   - Fill all required fields correctly
   - Click "Send Inquiry"
   - Watch loading spinner appear (2 seconds)
   - See success modal with your name
   - Check console for logged data
   - Close modal and try again

## Valid Test Data

```
Name: John Doe
Email: john.doe@example.com
Phone: (555) 555-5555
Program: Private Pilot
Message: I'm very interested in learning to fly!
Tour Request: ✓ (checked)
```

## Phone Format Examples

All these formats are valid:
- `(555) 555-5555`
- `555-555-5555`
- `555.555.5555`
- `5555555555`
- `+1 555 555 5555`

## Console Output

When you submit the form, check the browser console for:

```
Form submitted (mock): {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "(555) 555-5555",
  programInterest: "private_pilot",
  message: "I'm very interested in learning to fly!",
  tourRequest: true
}
School ID: school-123
```

## Validation Behavior

- **On Blur**: Validation runs when you leave a field
- **On Submit**: All fields validated before submission
- **Real-time**: Error messages appear immediately
- **Submit Button**: Disabled until form is valid

## Loading State

During the 2-second mock submission:
- Button shows spinner
- Button text changes to "Sending..."
- All form fields are disabled
- Cannot submit again until complete

## Success Modal

After successful submission:
- Green checkmark icon appears
- Personalized message with user's name
- "Close" button to dismiss
- Form automatically resets
- Can submit another inquiry

## Customization

### Change Mock Delay
In `InquiryForm.tsx`, line 53:
```tsx
await new Promise(resolve => setTimeout(resolve, 2000)); // Change 2000 to desired ms
```

### Add More Program Options
In `inquirySchema.ts`:
```tsx
export const PROGRAM_OPTIONS = [
  // ... existing options
  { value: 'new_program', label: 'New Program' },
];

// Also update the enum:
programInterest: z.enum([
  'private_pilot', 
  'commercial_pilot', 
  // ... 
  'new_program'
])
```

### Modify Phone Validation
In `inquirySchema.ts`, update the regex:
```tsx
phone: z
  .string()
  .regex(
    /your-custom-regex/,
    'Your custom error message'
  ),
```

### Change Theme Colors
In your `App.tsx`:
```tsx
const theme = createTheme({
  palette: {
    primary: { main: '#your-color' },
    secondary: { main: '#your-color' },
  },
});
```

## Backend Integration (Future)

Replace the mock submission in `InquiryForm.tsx`:

```tsx
const onSubmit = async (data: InquiryFormData) => {
  setIsSubmitting(true);
  
  try {
    const response = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Failed');

    if (onSubmitSuccess) onSubmitSuccess(data);
    reset();
  } catch (error) {
    console.error('Error:', error);
    // Show error notification
  } finally {
    setIsSubmitting(false);
  }
};
```

## Troubleshooting

### Button stays disabled
- Make sure all required fields are filled
- Check email format is valid
- Check phone format matches regex
- Check name is 2-100 characters

### Validation not showing
- Click away from the field (validation runs on blur)
- Try submitting the form
- Check browser console for errors

### Success modal doesn't appear
- Make sure `onSubmitSuccess` callback is provided
- Check state management in parent component
- Look for console errors

### TypeScript errors
- Ensure all dependencies are installed: `npm install`
- Check `node_modules` exists
- Restart your IDE/editor

## Dependencies

These were automatically installed:
- `react-hook-form` - Form state management
- `@hookform/resolvers` - Zod integration
- `zod` - Schema validation
- `@mui/material` - UI components
- `@emotion/react` - MUI styling
- `@emotion/styled` - MUI styling
- `@mui/icons-material` - Icons

## Features Checklist

- [x] Zod validation schema with all field rules
- [x] React Hook Form integration
- [x] Material-UI components
- [x] Email format validation
- [x] Phone format validation (multiple formats)
- [x] Name length validation (2-100 chars)
- [x] Message length validation (max 1000 chars)
- [x] Program interest dropdown
- [x] Tour request checkbox
- [x] Loading state during submission
- [x] Disabled fields during submission
- [x] Submit button loading spinner
- [x] 2-second mock delay
- [x] Console logging of form data
- [x] Success modal with user's name
- [x] Form reset after success
- [x] Responsive design
- [x] Accessibility support
- [x] TypeScript type safety
- [x] Reusable components

## Next Steps

1. Test the form in browser
2. Verify all validation works
3. Check console output
4. Test success modal
5. Try submitting multiple times
6. When ready, integrate with backend API

## Support

For issues or questions:
- Check the full implementation summary: `PR-8-IMPLEMENTATION-SUMMARY.md`
- Review the PRD: `PR-8-contact-inquiry-form.md`
- Check browser console for errors
- Verify all dependencies are installed
