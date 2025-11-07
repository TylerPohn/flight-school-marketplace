import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  FormHelperText,
} from '@mui/material';
import { Controller, type UseFormReturn } from 'react-hook-form';
import type { StepOneFormData } from '../../schemas/matchingSchema';

interface StepOneProps {
  form: UseFormReturn<StepOneFormData>;
}

export function StepOne({ form }: StepOneProps) {
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', py: 3 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Training Goals & Programs
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Tell us about your aviation training goals
      </Typography>

      {/* Training Goal */}
      <FormControl fullWidth error={!!errors.trainingGoal} sx={{ mb: 4 }}>
        <FormLabel id="training-goal-label" sx={{ mb: 1, fontWeight: 'medium' }}>
          What is your primary training goal?
        </FormLabel>
        <Controller
          name="trainingGoal"
          control={control}
          render={({ field }) => (
            <RadioGroup
              aria-labelledby="training-goal-label"
              {...field}
            >
              <FormControlLabel
                value="PPL"
                control={<Radio />}
                label="PPL (Private Pilot License)"
              />
              <FormControlLabel
                value="IR"
                control={<Radio />}
                label="IR (Instrument Rating)"
              />
              <FormControlLabel
                value="CPL"
                control={<Radio />}
                label="CPL (Commercial Pilot License)"
              />
              <FormControlLabel
                value="ATPL"
                control={<Radio />}
                label="ATPL (Airline Transport Pilot License)"
              />
              <FormControlLabel
                value="Other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          )}
        />
        {errors.trainingGoal && (
          <FormHelperText>{errors.trainingGoal.message}</FormHelperText>
        )}
      </FormControl>

      {/* Training Type Preference */}
      <FormControl fullWidth error={!!errors.trainingTypePreference} sx={{ mb: 4 }}>
        <FormLabel id="training-type-label" sx={{ mb: 1, fontWeight: 'medium' }}>
          Do you prefer Part 141 or Part 61 training?
        </FormLabel>
        <Controller
          name="trainingTypePreference"
          control={control}
          render={({ field }) => (
            <RadioGroup
              aria-labelledby="training-type-label"
              {...field}
            >
              <FormControlLabel
                value="Part141"
                control={<Radio />}
                label="Part 141 (Structured curriculum, FAA-approved)"
              />
              <FormControlLabel
                value="Part61"
                control={<Radio />}
                label="Part 61 (Flexible, customizable training)"
              />
              <FormControlLabel
                value="No Preference"
                control={<Radio />}
                label="No Preference"
              />
            </RadioGroup>
          )}
        />
        {errors.trainingTypePreference && (
          <FormHelperText>{errors.trainingTypePreference.message}</FormHelperText>
        )}
      </FormControl>

      {/* Aircraft Preference (Optional) */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <FormLabel sx={{ mb: 1, fontWeight: 'medium' }}>
          What aircraft type interests you? (Optional)
        </FormLabel>
        <Controller
          name="aircraftPreference"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              SelectProps={{ native: true }}
              fullWidth
              variant="outlined"
            >
              <option value="">No Preference</option>
              <option value="Cessna 172">Cessna 172</option>
              <option value="Piper Cherokee">Piper Cherokee</option>
              <option value="Diamond DA40">Diamond DA40</option>
              <option value="Complex">Complex Aircraft</option>
            </TextField>
          )}
        />
      </FormControl>
    </Box>
  );
}
