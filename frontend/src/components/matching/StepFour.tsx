import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Checkbox,
  FormGroup,
  Typography,
  FormHelperText,
} from '@mui/material';
import { Controller, type UseFormReturn } from 'react-hook-form';
import type { StepFourFormData } from '../../schemas/matchingSchema';

interface StepFourProps {
  form: UseFormReturn<StepFourFormData>;
}

const PREFERENCE_OPTIONS = [
  'Low cost',
  'Fast completion',
  'Best instructors',
  'Modern fleet',
  'Small class sizes',
  'Financing',
  'Location',
];

export function StepFour({ form }: StepFourProps) {
  const {
    control,
    watch,
    formState: { errors },
  } = form;

  const selectedPreferences = watch('preferences') || [];

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', py: 3 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Training Preferences
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Tell us what matters most to you
      </Typography>

      {/* Intensity Preference */}
      <FormControl fullWidth error={!!errors.intensityPreference} sx={{ mb: 4 }}>
        <FormLabel id="intensity-label" sx={{ mb: 1, fontWeight: 'medium' }}>
          How quickly do you want to complete training?
        </FormLabel>
        <Controller
          name="intensityPreference"
          control={control}
          render={({ field }) => (
            <RadioGroup
              aria-labelledby="intensity-label"
              {...field}
            >
              <FormControlLabel
                value="Intensive"
                control={<Radio />}
                label="Intensive (3-6 months) - Full-time commitment"
              />
              <FormControlLabel
                value="Part-time"
                control={<Radio />}
                label="Part-time (6-12 months) - Balanced schedule"
              />
              <FormControlLabel
                value="Flexible"
                control={<Radio />}
                label="Flexible/No preference - Train at my own pace"
              />
            </RadioGroup>
          )}
        />
        {errors.intensityPreference && (
          <FormHelperText>{errors.intensityPreference.message}</FormHelperText>
        )}
      </FormControl>

      {/* Preferences (Multi-select) */}
      <FormControl fullWidth error={!!errors.preferences} sx={{ mb: 4 }}>
        <FormLabel sx={{ mb: 1, fontWeight: 'medium' }}>
          What matters most to you? (Select 1-3)
        </FormLabel>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
          Selected: {selectedPreferences.length} / 3
        </Typography>
        <Controller
          name="preferences"
          control={control}
          render={({ field }) => (
            <FormGroup>
              {PREFERENCE_OPTIONS.map((option) => {
                const isChecked = field.value?.includes(option) || false;
                const isDisabled = !isChecked && field.value?.length >= 3;

                return (
                  <FormControlLabel
                    key={option}
                    control={
                      <Checkbox
                        checked={isChecked}
                        disabled={isDisabled}
                        onChange={(e) => {
                          const currentValue = field.value || [];
                          if (e.target.checked) {
                            // Add preference
                            if (currentValue.length < 3) {
                              field.onChange([...currentValue, option]);
                            }
                          } else {
                            // Remove preference
                            field.onChange(currentValue.filter((v) => v !== option));
                          }
                        }}
                      />
                    }
                    label={option}
                  />
                );
              })}
            </FormGroup>
          )}
        />
        {errors.preferences && (
          <FormHelperText>{errors.preferences.message}</FormHelperText>
        )}
      </FormControl>

      {/* Prior Experience */}
      <FormControl fullWidth error={!!errors.priorExperience} sx={{ mb: 2 }}>
        <FormLabel id="experience-label" sx={{ mb: 1, fontWeight: 'medium' }}>
          Do you have any prior flight experience?
        </FormLabel>
        <Controller
          name="priorExperience"
          control={control}
          render={({ field }) => (
            <RadioGroup
              aria-labelledby="experience-label"
              {...field}
            >
              <FormControlLabel
                value="None"
                control={<Radio />}
                label="No experience"
              />
              <FormControlLabel
                value="Discovery"
                control={<Radio />}
                label="Discovery flight only"
              />
              <FormControlLabel
                value="10-20 hours"
                control={<Radio />}
                label="10-20 hours of flight time"
              />
              <FormControlLabel
                value="20+ hours"
                control={<Radio />}
                label="20+ hours of flight time"
              />
            </RadioGroup>
          )}
        />
        {errors.priorExperience && (
          <FormHelperText>{errors.priorExperience.message}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
}
