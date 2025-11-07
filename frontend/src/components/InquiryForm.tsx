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
  FormHelperText,
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
    if (schoolId) {
      console.log('School ID:', schoolId);
    }

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
              required
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
              required
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
              required
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
            <FormControl fullWidth error={!!errors.programInterest} disabled={isSubmitting} required>
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
              {errors.programInterest && (
                <FormHelperText>{errors.programInterest.message}</FormHelperText>
              )}
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
