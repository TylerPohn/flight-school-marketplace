/**
 * SchoolFilters Component
 *
 * Displays all filter controls for narrowing down flight schools.
 * All filters are applied client-side to mock data.
 */

import React, { useCallback, useState, useEffect } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Chip,
  Stack,
  Typography,
  Paper,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import type { SchoolFilters } from '../types/filters';

interface SchoolFiltersProps {
  filters: SchoolFilters;
  onSearchChange: (query: string) => void;
  onProgramTypesChange: (programs: string[]) => void;
  onTrainingTypeChange: (type: 'Part61' | 'Part141' | 'Both') => void;
  onBudgetRangeChange: (range: [number, number]) => void;
  onStateChange: (state: string) => void;
  onClearAll: () => void;
  activeFilterCount: number;
  availableStates: string[];
  availablePrograms: Array<[string, number]>;
  filteredCount: number;
  totalCount: number;
}

/**
 * SchoolFilters Component
 *
 * Displays all filter controls for narrowing down flight schools.
 * All filters are applied client-side to mock data.
 */
export const SchoolFiltersComponent: React.FC<SchoolFiltersProps> = ({
  filters,
  onSearchChange,
  onProgramTypesChange,
  onTrainingTypeChange,
  onBudgetRangeChange,
  onStateChange,
  onClearAll,
  activeFilterCount,
  availableStates,
  availablePrograms,
  filteredCount,
  totalCount,
}) => {
  // Local state for debounced search
  const [searchInput, setSearchInput] = useState(filters.searchQuery);

  // Debounce search input (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(searchInput);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput, onSearchChange]);

  // Sync with external filter changes
  useEffect(() => {
    setSearchInput(filters.searchQuery);
  }, [filters.searchQuery]);

  /**
   * Handle program type checkbox toggle
   */
  const handleProgramToggle = useCallback(
    (program: string) => {
      const updated = filters.programTypes.includes(program)
        ? filters.programTypes.filter((p) => p !== program)
        : [...filters.programTypes, program];
      onProgramTypesChange(updated);
    },
    [filters.programTypes, onProgramTypesChange]
  );

  /**
   * Handle budget slider change
   */
  const handleBudgetChange = useCallback(
    (_event: Event, newValue: number | number[]) => {
      if (Array.isArray(newValue) && newValue.length === 2) {
        onBudgetRangeChange([newValue[0], newValue[1]]);
      }
    },
    [onBudgetRangeChange]
  );

  /**
   * Remove individual filter via chip
   */
  const handleRemoveChip = useCallback(
    (filterType: string) => {
      switch (filterType) {
        case 'search':
          setSearchInput('');
          onSearchChange('');
          break;
        case 'programs':
          onProgramTypesChange([]);
          break;
        case 'trainingType':
          onTrainingTypeChange('Both');
          break;
        case 'budget':
          onBudgetRangeChange([0, 20000]);
          break;
        case 'state':
          onStateChange('');
          break;
      }
    },
    [
      onSearchChange,
      onProgramTypesChange,
      onTrainingTypeChange,
      onBudgetRangeChange,
      onStateChange,
    ]
  );

  return (
    <Paper elevation={0} sx={{ p: 3, backgroundColor: 'background.default' }}>
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            Filters
          </Typography>
          {activeFilterCount > 0 && (
            <Button
              variant="text"
              size="small"
              startIcon={<ClearIcon />}
              onClick={onClearAll}
              sx={{ textTransform: 'none' }}
            >
              Clear All ({activeFilterCount})
            </Button>
          )}
        </Box>

        {/* Results summary */}
        <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 2 }}>
          Showing {filteredCount} of {totalCount} schools
        </Typography>

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {filters.searchQuery && (
              <Chip
                label={`Search: "${filters.searchQuery}"`}
                onDelete={() => handleRemoveChip('search')}
                variant="outlined"
                size="small"
              />
            )}
            {filters.programTypes.length > 0 && (
              <Chip
                label={`Programs: ${filters.programTypes.join(', ')}`}
                onDelete={() => handleRemoveChip('programs')}
                variant="outlined"
                size="small"
              />
            )}
            {filters.trainingType !== 'Both' && (
              <Chip
                label={`Type: ${filters.trainingType}`}
                onDelete={() => handleRemoveChip('trainingType')}
                variant="outlined"
                size="small"
              />
            )}
            {(filters.budgetRange[0] > 0 || filters.budgetRange[1] < 20000) && (
              <Chip
                label={`Budget: $${filters.budgetRange[0].toLocaleString()}-$${filters.budgetRange[1].toLocaleString()}`}
                onDelete={() => handleRemoveChip('budget')}
                variant="outlined"
                size="small"
              />
            )}
            {filters.selectedState && (
              <Chip
                label={`State: ${filters.selectedState}`}
                onDelete={() => handleRemoveChip('state')}
                variant="outlined"
                size="small"
              />
            )}
          </Box>
        )}
      </Box>

      <Stack spacing={3}>
        {/* SEARCH BAR */}
        <TextField
          fullWidth
          label="Search by school name or city"
          placeholder="e.g., AeroFlight Academy or Phoenix"
          variant="outlined"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          size="small"
        />

        {/* PROGRAM TYPE FILTER */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Program Type
          </Typography>
          <FormGroup>
            {availablePrograms.map(([program, count]) => (
              <FormControlLabel
                key={program}
                control={
                  <Checkbox
                    checked={filters.programTypes.includes(program)}
                    onChange={() => handleProgramToggle(program)}
                  />
                }
                label={`${program} (${count})`}
              />
            ))}
          </FormGroup>
        </Box>

        {/* TRAINING TYPE FILTER */}
        <FormControl fullWidth size="small">
          <InputLabel>Training Type</InputLabel>
          <Select
            value={filters.trainingType}
            label="Training Type"
            onChange={(e) =>
              onTrainingTypeChange(e.target.value as 'Part61' | 'Part141' | 'Both')
            }
          >
            <MenuItem value="Both">Both (Part 61 & 141)</MenuItem>
            <MenuItem value="Part61">Part 61</MenuItem>
            <MenuItem value="Part141">Part 141</MenuItem>
          </Select>
        </FormControl>

        {/* BUDGET RANGE FILTER */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            Budget Range
          </Typography>
          <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 1 }}>
            ${filters.budgetRange[0].toLocaleString()} - ${filters.budgetRange[1].toLocaleString()}
          </Typography>
          <Slider
            value={filters.budgetRange}
            onChange={handleBudgetChange}
            valueLabelDisplay="off"
            min={0}
            max={20000}
            step={500}
            marks={[
              { value: 0, label: '$0' },
              { value: 10000, label: '$10k' },
              { value: 20000, label: '$20k' },
            ]}
          />
        </Box>

        {/* LOCATION/STATE FILTER */}
        <FormControl fullWidth size="small">
          <InputLabel>State</InputLabel>
          <Select
            value={filters.selectedState}
            label="State"
            onChange={(e) => onStateChange(e.target.value)}
          >
            <MenuItem value="">All States</MenuItem>
            {availableStates.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Paper>
  );
};
