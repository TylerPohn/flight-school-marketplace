import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
  Typography,
  FormHelperText,
} from '@mui/material';
import { Controller, type UseFormReturn } from 'react-hook-form';
import type { StepTwoFormData } from '../../schemas/matchingSchema';

interface StepTwoProps {
  form: UseFormReturn<StepTwoFormData>;
}

export function StepTwo({ form }: StepTwoProps) {
  const {
    control,
    watch,
    formState: { errors },
  } = form;

  const maxBudget = watch('maxBudget') || 30000;

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', py: 3 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Budget & Financing
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Help us understand your financial parameters
      </Typography>

      {/* Budget Slider */}
      <FormControl fullWidth error={!!errors.maxBudget} sx={{ mb: 4 }}>
        <FormLabel sx={{ mb: 2, fontWeight: 'medium' }}>
          What's your maximum budget for training?
        </FormLabel>
        <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
          ${maxBudget.toLocaleString()}
        </Typography>
        <Controller
          name="maxBudget"
          control={control}
          render={({ field }) => (
            <Slider
              {...field}
              min={5000}
              max={100000}
              step={1000}
              marks={[
                { value: 5000, label: '$5K' },
                { value: 25000, label: '$25K' },
                { value: 50000, label: '$50K' },
                { value: 75000, label: '$75K' },
                { value: 100000, label: '$100K' },
              ]}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `$${(value / 1000).toFixed(0)}K`}
            />
          )}
        />
        {errors.maxBudget && (
          <FormHelperText>{errors.maxBudget.message}</FormHelperText>
        )}
      </FormControl>

      {/* Financing Interest */}
      <FormControl fullWidth error={!!errors.financingInterest} sx={{ mb: 4 }}>
        <FormLabel id="financing-label" sx={{ mb: 1, fontWeight: 'medium' }}>
          Are you interested in financing options?
        </FormLabel>
        <Controller
          name="financingInterest"
          control={control}
          render={({ field }) => (
            <RadioGroup
              aria-labelledby="financing-label"
              value={field.value ? 'Yes' : 'No'}
              onChange={(e) => field.onChange(e.target.value === 'Yes')}
            >
              <FormControlLabel
                value="Yes"
                control={<Radio />}
                label="Yes, I'm interested in financing"
              />
              <FormControlLabel
                value="No"
                control={<Radio />}
                label="No, I will pay out of pocket"
              />
            </RadioGroup>
          )}
        />
        {errors.financingInterest && (
          <FormHelperText>{errors.financingInterest.message}</FormHelperText>
        )}
      </FormControl>

      {/* Military Benefits */}
      <FormControl fullWidth error={!!errors.militaryBenefits} sx={{ mb: 2 }}>
        <FormLabel id="military-label" sx={{ mb: 1, fontWeight: 'medium' }}>
          Do you have military benefits (GI Bill)?
        </FormLabel>
        <Controller
          name="militaryBenefits"
          control={control}
          render={({ field }) => (
            <RadioGroup
              aria-labelledby="military-label"
              {...field}
            >
              <FormControlLabel
                value="Yes"
                control={<Radio />}
                label="Yes, I have GI Bill benefits"
              />
              <FormControlLabel
                value="No"
                control={<Radio />}
                label="No"
              />
              <FormControlLabel
                value="Prefer not to say"
                control={<Radio />}
                label="Prefer not to say"
              />
            </RadioGroup>
          )}
        />
        {errors.militaryBenefits && (
          <FormHelperText>{errors.militaryBenefits.message}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
}
