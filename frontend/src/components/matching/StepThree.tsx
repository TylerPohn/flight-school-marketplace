import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
  TextField,
  Typography,
  FormHelperText,
  Autocomplete,
} from '@mui/material';
import { Controller, type UseFormReturn } from 'react-hook-form';
import type { StepThreeFormData } from '../../schemas/matchingSchema';
import { CITY_COORDINATES } from '../../mock/mockSchools';

interface StepThreeProps {
  form: UseFormReturn<StepThreeFormData>;
}

export function StepThree({ form }: StepThreeProps) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const searchRadius = watch('searchRadius') || 50;

  // Parse city/state input and attempt to geocode from our known cities
  const handleLocationChange = (cityState: string) => {
    // Try to find matching coordinates
    const coordinates = CITY_COORDINATES[cityState];

    // Parse city and state
    const parts = cityState.split(',').map(s => s.trim());
    const city = parts[0] || '';
    const state = parts[1] || '';

    setValue('location', {
      city,
      state,
      lat: coordinates?.lat,
      lon: coordinates?.lon,
    });
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', py: 3 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Location Preferences
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Where would you like to train?
      </Typography>

      {/* Location Input */}
      <FormControl fullWidth error={!!errors.location} sx={{ mb: 2 }}>
        <FormLabel sx={{ mb: 1, fontWeight: 'medium' }}>
          Where would you prefer to train?
        </FormLabel>
        <Controller
          name="location"
          control={control}
          render={({ field }) => {
            const cityList = Object.keys(CITY_COORDINATES).sort();
            const currentValue = field.value?.city && field.value?.state
              ? `${field.value.city}, ${field.value.state}`
              : '';

            return (
              <Autocomplete
                options={cityList}
                value={currentValue || null}
                onChange={(_, newValue) => {
                  if (newValue) {
                    handleLocationChange(newValue);
                  } else {
                    setValue('location', { city: '', state: '' });
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="e.g., San Diego, CA or Denver, CO"
                    helperText="Select a city from the list"
                  />
                )}
                filterOptions={(options, { inputValue }) => {
                  return options.filter(option =>
                    option.toLowerCase().includes(inputValue.toLowerCase())
                  );
                }}
                noOptionsText="No cities found - try a different search"
              />
            );
          }}
        />
        {errors.location?.city && (
          <FormHelperText>{errors.location.city.message}</FormHelperText>
        )}
        {errors.location?.state && (
          <FormHelperText>{errors.location.state.message}</FormHelperText>
        )}
      </FormControl>

      {/* Suggested Cities */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          Popular locations:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {/* Open to Relocating Option */}
          <Typography
            variant="caption"
            sx={{
              px: 1.5,
              py: 0.5,
              bgcolor: 'secondary.50',
              borderRadius: 1,
              cursor: 'pointer',
              display: 'inline-block',
              fontWeight: 600,
              '&:hover': { bgcolor: 'secondary.100' },
            }}
            onClick={() => {
              setValue('location', { city: 'Anywhere', state: 'US' });
              setValue('searchRadius', 500);
            }}
          >
            Open to relocating
          </Typography>
          {/* Curated list of geographically diverse major cities */}
          {[
            'Phoenix, AZ', 'Los Angeles, CA', 'Denver, CO', 'Miami, FL',
            'Atlanta, GA', 'Chicago, IL', 'Boston, MA', 'Las Vegas, NV',
            'New York, NY', 'Dallas, TX', 'Seattle, WA', 'Orlando, FL'
          ].map((city) => (
            <Typography
              key={city}
              variant="caption"
              sx={{
                px: 1.5,
                py: 0.5,
                bgcolor: 'primary.50',
                borderRadius: 1,
                cursor: 'pointer',
                display: 'inline-block',
                '&:hover': { bgcolor: 'primary.100' },
              }}
              onClick={() => handleLocationChange(city)}
            >
              {city}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Search Radius */}
      <FormControl fullWidth error={!!errors.searchRadius} sx={{ mb: 4 }}>
        <FormLabel sx={{ mb: 2, fontWeight: 'medium' }}>
          How far are you willing to travel?
        </FormLabel>
        <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
          {searchRadius} miles
        </Typography>
        <Controller
          name="searchRadius"
          control={control}
          render={({ field }) => (
            <Slider
              {...field}
              min={0}
              max={500}
              step={10}
              marks={[
                { value: 0, label: '0' },
                { value: 100, label: '100' },
                { value: 200, label: '200' },
                { value: 300, label: '300' },
                { value: 400, label: '400' },
                { value: 500, label: '500 mi' },
              ]}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value} mi`}
            />
          )}
        />
        {errors.searchRadius && (
          <FormHelperText>{errors.searchRadius.message}</FormHelperText>
        )}
      </FormControl>

      {/* Housing Needed */}
      <FormControl fullWidth error={!!errors.housingNeeded} sx={{ mb: 2 }}>
        <FormLabel id="housing-label" sx={{ mb: 1, fontWeight: 'medium' }}>
          Do you need housing assistance?
        </FormLabel>
        <Controller
          name="housingNeeded"
          control={control}
          render={({ field }) => (
            <RadioGroup
              aria-labelledby="housing-label"
              value={field.value ? 'Yes' : 'No'}
              onChange={(e) => field.onChange(e.target.value === 'Yes')}
            >
              <FormControlLabel
                value="Yes"
                control={<Radio />}
                label="Yes, I need help finding housing"
              />
              <FormControlLabel
                value="No"
                control={<Radio />}
                label="No, I have housing arranged"
              />
            </RadioGroup>
          )}
        />
        {errors.housingNeeded && (
          <FormHelperText>{errors.housingNeeded.message}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
}
