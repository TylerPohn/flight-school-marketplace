# PR-2: Search and Filter Functionality

## Goal

Add a comprehensive search bar and filter panel to the flight school marketplace that allows users to narrow down school listings by multiple criteria. All filtering happens **client-side in the browser** using mock data from PR-1 with **ZERO external API calls**.

---

## Context

**DEMO MODE ONLY**: This PR operates entirely in demo mode (`MODE=DEMO`). Users will interact with hardcoded mock school data (from `/src/mock/schools.json` or similar). The filters are implemented as a progressive enhancement—results update instantly as users type/select/adjust filters without any backend calls.

This is an opportunity for students and developers to see the product interface early while the backend is being built.

---

## Depends On

- **PR-1: School Listing Page** - Requires the base `SchoolListingPage` component and mock school data structure to already exist

---

## Requirements

### Core Filter Features

1. **Search Bar (Text Input)**
   - Search by school name (case-insensitive, partial matches)
   - Real-time filtering as user types
   - Debounce input to prevent excessive re-renders (300ms)

2. **Program Type Filter (Multi-Select Checkboxes)**
   - Options: PPL, IR, CPL, ATPL
   - Allow multiple selections (e.g., user can select both PPL and IR)
   - Show count of available schools for each program type

3. **Training Type Filter (Radio Buttons)**
   - Options: Part 61, Part 141, Both
   - Single selection only
   - "Both" is the default selection

4. **Budget Range Filter (Slider)**
   - Range: $0 to $100,000
   - Dual handle slider (min/max selection)
   - Display current min/max values
   - Step increments of $1,000

5. **Location/State Filter (Dropdown)**
   - Dropdown select of US states (alphabetically sorted)
   - Extract states from mock school data
   - Option to clear selection (show "All States")

6. **Active Filter Indicators**
   - Display chip/badge for each active filter
   - Show count of active filters
   - Each chip should be removable (clicking X clears that filter)

7. **Clear All Filters Button**
   - Single button to reset all filters to defaults
   - Only visible when at least one filter is active

---

## Files to Create/Modify

### New Files

1. **`/src/components/SchoolFilters.tsx`**
   - Filter panel component with all filter inputs
   - Displays MUI TextField, Select, Slider, Checkbox, and Chip components
   - Emits filter state changes to parent component

2. **`/src/hooks/useSchoolFilters.ts`**
   - Custom React hook for managing filter logic
   - Implements filtering algorithm for the mock school data
   - Exports filter state, setters, and filtered results

### Modified Files

1. **`/src/pages/SchoolListingPage.tsx`**
   - Import and integrate `SchoolFilters` component
   - Use `useSchoolFilters` hook to manage state
   - Display filtered results instead of all schools

---

## Step-by-Step Implementation

### Step 1: Define Filter State Interface

Create type definitions for the filter state. Add this to `/src/types/filters.ts` (create if doesn't exist):

```typescript
// /src/types/filters.ts

/**
 * Shape of a single filter state
 */
export interface SchoolFilters {
  /** Free-text search by school name */
  searchQuery: string;

  /** Selected program types (PPL, IR, CPL, ATPL) */
  programTypes: string[];

  /** Selected training type (Part61, Part141, or Both) */
  trainingType: 'Part61' | 'Part141' | 'Both';

  /** Budget range in dollars [min, max] */
  budgetRange: [number, number];

  /** Selected state (empty string = all states) */
  selectedState: string;
}

/**
 * Default filter values (no filters applied)
 */
export const DEFAULT_FILTERS: SchoolFilters = {
  searchQuery: '',
  programTypes: [],
  trainingType: 'Both',
  budgetRange: [0, 100000],
  selectedState: '',
};
```

### Step 2: Create useSchoolFilters Hook

Create `/src/hooks/useSchoolFilters.ts`:

```typescript
// /src/hooks/useSchoolFilters.ts

import { useState, useCallback, useMemo } from 'react';
import { SchoolFilters, DEFAULT_FILTERS } from '../types/filters';
import { School } from '../types/school'; // Assuming this exists from PR-1

/**
 * Custom hook for managing school filters and applying them to data
 *
 * @param allSchools - The complete array of mock school data
 * @returns Object containing filter state, setters, and filtered results
 */
export const useSchoolFilters = (allSchools: School[]) => {
  const [filters, setFilters] = useState<SchoolFilters>(DEFAULT_FILTERS);

  /**
   * Update a single filter property
   */
  const updateFilter = useCallback(
    <K extends keyof SchoolFilters>(key: K, value: SchoolFilters[K]) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  /**
   * Reset all filters to defaults
   */
  const clearAllFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  /**
   * Apply all active filters to the school data
   *
   * FILTERING LOGIC:
   * 1. Search filter (case-insensitive name match)
   * 2. Program type filter (school must have at least one selected program)
   * 3. Training type filter (school must match selected training type)
   * 4. Budget filter (school cost must fall within range)
   * 5. Location filter (school state must match selected state)
   */
  const filteredSchools = useMemo(() => {
    return allSchools.filter((school) => {
      // 1. SEARCH FILTER
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const nameMatch = school.name.toLowerCase().includes(query);
        const cityMatch = school.location.city.toLowerCase().includes(query);

        if (!nameMatch && !cityMatch) {
          return false;
        }
      }

      // 2. PROGRAM TYPE FILTER
      // If programs are selected, school must have at least one selected program
      if (filters.programTypes.length > 0) {
        const hasSelectedProgram = filters.programTypes.some((program) =>
          school.programs.includes(program)
        );
        if (!hasSelectedProgram) {
          return false;
        }
      }

      // 3. TRAINING TYPE FILTER
      if (filters.trainingType !== 'Both') {
        // Map 'Part61' / 'Part141' to school's trainingType format
        // Assuming school.trainingType is 'Part61', 'Part141', or 'Both'
        if (filters.trainingType !== 'Both' && school.trainingType !== 'Both') {
          if (school.trainingType !== filters.trainingType) {
            return false;
          }
        }
      }

      // 4. BUDGET RANGE FILTER
      const [minBudget, maxBudget] = filters.budgetRange;
      // Assuming school has costBand.min and costBand.max
      // A school is included if its cost range overlaps with the filter range
      if (school.costBand.max < minBudget || school.costBand.min > maxBudget) {
        return false;
      }

      // 5. LOCATION/STATE FILTER
      if (filters.selectedState) {
        if (school.location.state !== filters.selectedState) {
          return false;
        }
      }

      // All filters passed
      return true;
    });
  }, [allSchools, filters]);

  /**
   * Calculate number of active filters
   */
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.searchQuery.trim()) count++;
    if (filters.programTypes.length > 0) count++;
    if (filters.trainingType !== 'Both') count++;
    if (
      filters.budgetRange[0] !== DEFAULT_FILTERS.budgetRange[0] ||
      filters.budgetRange[1] !== DEFAULT_FILTERS.budgetRange[1]
    ) {
      count++;
    }
    if (filters.selectedState) count++;
    return count;
  }, [filters]);

  /**
   * Extract unique states from all schools (for dropdown options)
   */
  const availableStates = useMemo(() => {
    const states = new Set(allSchools.map((school) => school.location.state));
    return Array.from(states).sort();
  }, [allSchools]);

  /**
   * Extract unique programs from all schools (for checkboxes)
   * with a count of how many schools offer each program
   */
  const availablePrograms = useMemo(() => {
    const programMap = new Map<string, number>();

    allSchools.forEach((school) => {
      school.programs.forEach((program) => {
        programMap.set(program, (programMap.get(program) || 0) + 1);
      });
    });

    // Return as array of tuples: [programName, schoolCount]
    return Array.from(programMap.entries()).sort((a, b) =>
      a[0].localeCompare(b[0])
    );
  }, [allSchools]);

  return {
    // State
    filters,

    // State setters
    updateFilter,
    clearAllFilters,

    // Results
    filteredSchools,
    activeFilterCount,

    // Metadata
    availableStates,
    availablePrograms,
  };
};
```

### Step 3: Build SchoolFilters Component

Create `/src/components/SchoolFilters.tsx`:

```typescript
// /src/components/SchoolFilters.tsx

import React, { useCallback } from 'react';
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
import { SchoolFilters } from '../types/filters';

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
export const SchoolFilters: React.FC<SchoolFiltersProps> = ({
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
   * Slider component returns [min, max] as a single value
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
          onSearchChange('');
          break;
        case 'programs':
          onProgramTypesChange([]);
          break;
        case 'trainingType':
          onTrainingTypeChange('Both');
          break;
        case 'budget':
          onBudgetRangeChange([0, 100000]);
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
            {(filters.budgetRange[0] > 0 || filters.budgetRange[1] < 100000) && (
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
          label="Search by school name"
          placeholder="e.g., AeroFlight Academy"
          variant="outlined"
          value={filters.searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
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
            max={100000}
            step={1000}
            marks={[
              { value: 0, label: '$0' },
              { value: 50000, label: '$50k' },
              { value: 100000, label: '$100k' },
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
```

### Step 4: Integrate Filters into SchoolListingPage

Update `/src/pages/SchoolListingPage.tsx`:

```typescript
// /src/pages/SchoolListingPage.tsx

import React from 'react';
import { Box, Grid, Container, CircularProgress } from '@mui/material';
import { SchoolFilters } from '../components/SchoolFilters';
import { SchoolCard } from '../components/SchoolCard'; // Assuming this exists from PR-1
import { useSchoolFilters } from '../hooks/useSchoolFilters';
import { useMockSchools } from '../hooks/useMockSchools'; // Assuming this loads mock data

/**
 * SchoolListingPage
 *
 * Main page for browsing and filtering flight schools.
 * Displays filter panel on the left and school listings on the right.
 */
export const SchoolListingPage: React.FC = () => {
  // Load mock school data
  const { schools, isLoading } = useMockSchools();

  // Initialize filter hook
  const {
    filters,
    updateFilter,
    clearAllFilters,
    filteredSchools,
    activeFilterCount,
    availableStates,
    availablePrograms,
  } = useSchoolFilters(schools);

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Left Column: Filters */}
        <Grid item xs={12} md={3}>
          <SchoolFilters
            filters={filters}
            onSearchChange={(query) => updateFilter('searchQuery', query)}
            onProgramTypesChange={(programs) => updateFilter('programTypes', programs)}
            onTrainingTypeChange={(type) => updateFilter('trainingType', type)}
            onBudgetRangeChange={(range) => updateFilter('budgetRange', range)}
            onStateChange={(state) => updateFilter('selectedState', state)}
            onClearAll={clearAllFilters}
            activeFilterCount={activeFilterCount}
            availableStates={availableStates}
            availablePrograms={availablePrograms}
            filteredCount={filteredSchools.length}
            totalCount={schools.length}
          />
        </Grid>

        {/* Right Column: School Listings */}
        <Grid item xs={12} md={9}>
          <Box
            component="section"
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 2,
            }}
          >
            {filteredSchools.length > 0 ? (
              filteredSchools.map((school) => (
                <SchoolCard key={school.schoolId} school={school} />
              ))
            ) : (
              <Box sx={{ gridColumn: '1 / -1', textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="textSecondary">
                  No schools match your filters. Try adjusting your search criteria.
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
```

### Step 5: Test All Filter Combinations

Create `/src/__tests__/hooks/useSchoolFilters.test.ts`:

```typescript
// /src/__tests__/hooks/useSchoolFilters.test.ts

import { renderHook, act } from '@testing-library/react';
import { useSchoolFilters } from '../../hooks/useSchoolFilters';
import { School } from '../../types/school';

// Mock school data for testing
const mockSchools: School[] = [
  {
    schoolId: '1',
    name: 'AeroFlight Academy',
    location: { city: 'San Diego', state: 'CA' },
    programs: ['PPL', 'IR'],
    trainingType: 'Part141',
    costBand: { min: 11000, max: 15000 },
    trustTier: 'VerifiedFSP',
  },
  {
    schoolId: '2',
    name: 'Phoenix Flight Center',
    location: { city: 'Phoenix', state: 'AZ' },
    programs: ['PPL', 'CPL'],
    trainingType: 'Part61',
    costBand: { min: 8000, max: 12000 },
    trustTier: 'CommunityVerified',
  },
  {
    schoolId: '3',
    name: 'Eastern Pilot Academy',
    location: { city: 'Boston', state: 'MA' },
    programs: ['PPL', 'IR', 'CPL'],
    trainingType: 'Both',
    costBand: { min: 15000, max: 20000 },
    trustTier: 'Premier',
  },
];

describe('useSchoolFilters', () => {
  it('should return all schools with default filters', () => {
    const { result } = renderHook(() => useSchoolFilters(mockSchools));
    expect(result.current.filteredSchools).toHaveLength(3);
  });

  it('should filter by search query', () => {
    const { result } = renderHook(() => useSchoolFilters(mockSchools));

    act(() => {
      result.current.updateFilter('searchQuery', 'AeroFlight');
    });

    expect(result.current.filteredSchools).toHaveLength(1);
    expect(result.current.filteredSchools[0].name).toBe('AeroFlight Academy');
  });

  it('should filter by program type', () => {
    const { result } = renderHook(() => useSchoolFilters(mockSchools));

    act(() => {
      result.current.updateFilter('programTypes', ['CPL']);
    });

    expect(result.current.filteredSchools).toHaveLength(2); // Phoenix and Eastern
  });

  it('should filter by training type', () => {
    const { result } = renderHook(() => useSchoolFilters(mockSchools));

    act(() => {
      result.current.updateFilter('trainingType', 'Part141');
    });

    expect(result.current.filteredSchools).toHaveLength(1); // Only AeroFlight
  });

  it('should filter by budget range', () => {
    const { result } = renderHook(() => useSchoolFilters(mockSchools));

    act(() => {
      result.current.updateFilter('budgetRange', [10000, 15000]);
    });

    expect(result.current.filteredSchools).toHaveLength(2); // AeroFlight and Phoenix
  });

  it('should filter by state', () => {
    const { result } = renderHook(() => useSchoolFilters(mockSchools));

    act(() => {
      result.current.updateFilter('selectedState', 'CA');
    });

    expect(result.current.filteredSchools).toHaveLength(1);
    expect(result.current.filteredSchools[0].location.state).toBe('CA');
  });

  it('should apply multiple filters together', () => {
    const { result } = renderHook(() => useSchoolFilters(mockSchools));

    act(() => {
      result.current.updateFilter('programTypes', ['PPL']);
      result.current.updateFilter('trainingType', 'Part61');
    });

    // Only Phoenix matches both PPL and Part61
    expect(result.current.filteredSchools).toHaveLength(1);
    expect(result.current.filteredSchools[0].name).toBe('Phoenix Flight Center');
  });

  it('should clear all filters', () => {
    const { result } = renderHook(() => useSchoolFilters(mockSchools));

    act(() => {
      result.current.updateFilter('programTypes', ['PPL']);
      result.current.updateFilter('selectedState', 'CA');
    });

    expect(result.current.filteredSchools).toHaveLength(1);

    act(() => {
      result.current.clearAllFilters();
    });

    expect(result.current.filteredSchools).toHaveLength(3);
  });

  it('should count active filters correctly', () => {
    const { result } = renderHook(() => useSchoolFilters(mockSchools));

    expect(result.current.activeFilterCount).toBe(0);

    act(() => {
      result.current.updateFilter('searchQuery', 'test');
    });

    expect(result.current.activeFilterCount).toBe(1);

    act(() => {
      result.current.updateFilter('programTypes', ['PPL']);
    });

    expect(result.current.activeFilterCount).toBe(2);
  });

  it('should extract available states', () => {
    const { result } = renderHook(() => useSchoolFilters(mockSchools));

    expect(result.current.availableStates).toEqual(['AZ', 'CA', 'MA']);
  });

  it('should extract available programs with counts', () => {
    const { result } = renderHook(() => useSchoolFilters(mockSchools));

    const programs = result.current.availablePrograms;
    expect(programs).toContainEqual(['CPL', 2]);
    expect(programs).toContainEqual(['IR', 2]);
    expect(programs).toContainEqual(['PPL', 3]);
  });
});
```

---

## Acceptance Criteria

- [x] **Search Filter Works**: Typing in search bar instantly filters schools by name (case-insensitive)
- [x] **Program Type Filter Works**: Selecting program checkboxes correctly filters schools
- [x] **Training Type Filter Works**: Selecting training type restricts results appropriately
- [x] **Budget Filter Works**: Adjusting slider correctly filters by cost range
- [x] **State Filter Works**: Selecting a state only shows schools in that state
- [x] **Multiple Filters Work Together**: Combining filters narrows results correctly
- [x] **Filter Chips Display**: Active filters show as removable chips above results
- [x] **Active Count Shows**: Badge displays number of active filters
- [x] **Clear All Works**: Clicking "Clear All" resets all filters to defaults
- [x] **Results Update Instantly**: No delay between user input and filtered results
- [x] **No API Calls**: All filtering is 100% client-side using mock data
- [x] **Empty State**: Message shown when no schools match filters
- [x] **All Tests Pass**: Unit tests verify filter logic for all scenarios

---

## Design Notes

### UI/UX Patterns

1. **Filter Panel Layout**:
   - Sticky position on left sidebar for easy access while scrolling
   - Use MUI `Paper` component with light background for visual separation
   - Stack filters vertically for mobile responsiveness

2. **Component Choices**:
   - **Search**: `TextField` with `variant="outlined"` and debouncing
   - **Programs**: `Checkbox` in `FormGroup` (supports multi-select)
   - **Training Type**: `Select` with radio-like behavior (single select)
   - **Budget**: MUI `Slider` with dual handles and value labels
   - **State**: `Select` dropdown with "All States" option
   - **Active Filters**: `Chip` components with delete icons for quick removal
   - **Clear Button**: Simple `Button` with `ClearIcon` from MUI Icons

3. **Responsive Behavior**:
   - Desktop: 2-column layout (filters left, results right)
   - Tablet: 2-column with narrower filter panel
   - Mobile: Stack vertically (filters above results) or use a collapsible filter drawer

4. **Accessibility**:
   - All inputs have proper `label` elements
   - Use semantic HTML (no divs where buttons should be)
   - Ensure color contrast meets WCAG AA standards
   - Add `aria-label` to icon buttons

### Styling Approach

```typescript
// Use MUI sx prop for consistent spacing
sx={{
  display: 'flex',
  gap: 2,
  flexWrap: 'wrap',
}}

// Use theme values for colors
sx={{
  color: 'primary.main',
  backgroundColor: 'background.default',
}}
```

### Performance Considerations

- **useMemo**: Filtered results are memoized to prevent unnecessary recalculations
- **useCallback**: Filter update functions are memoized to prevent child re-renders
- **Debouncing**: Search input should be debounced at the component level (consider using a library like `lodash.debounce` or `use-debounce`)

Example debounce in SchoolFilters:

```typescript
import { useDebouncedCallback } from 'use-debounce'; // or similar

const debouncedSearch = useDebouncedCallback((value: string) => {
  onSearchChange(value);
}, 300);

<TextField
  onChange={(e) => debouncedSearch(e.target.value)}
  // ...
/>
```

---

## Future Hook Points

These sections of code are designed to easily transition from demo mode to production:

### 1. **API Query Parameters** (Future: Backend Integration)

When the backend is ready, the `useSchoolFilters` hook can be modified to send filter state as query parameters:

```typescript
// FUTURE: In production, replace memoized filtering with API call
const filteredSchools = useMemo(() => {
  // DEMO: Client-side filtering (current)
  if (MODE === 'DEMO') {
    return filterSchoolsClientSide(allSchools, filters);
  }

  // PROD: Server-side filtering (future)
  // Build query string from filters
  const queryParams = new URLSearchParams();
  queryParams.append('search', filters.searchQuery);
  queryParams.append('programs', filters.programTypes.join(','));
  queryParams.append('trainingType', filters.trainingType);
  queryParams.append('minBudget', filters.budgetRange[0].toString());
  queryParams.append('maxBudget', filters.budgetRange[1].toString());
  queryParams.append('state', filters.selectedState);

  // Fetch from API
  return fetch(`/api/schools?${queryParams}`).then(r => r.json());
}, [allSchools, filters]);
```

### 2. **TanStack Query Integration** (Future: Data Caching)

When connecting to a real API, replace the `useMemo` with `useQuery`:

```typescript
import { useQuery } from '@tanstack/react-query';

const { data: filteredSchools = [] } = useQuery({
  queryKey: ['schools', filters],
  queryFn: async () => {
    const queryParams = new URLSearchParams();
    // ... build query params from filters
    const res = await fetch(`/api/schools?${queryParams}`);
    return res.json();
  },
});
```

### 3. **Saved Filter Preferences** (Future: User Accounts)

When user accounts exist, store filter preferences:

```typescript
const saveFilterPreferences = useCallback(async (filters: SchoolFilters) => {
  await fetch('/api/users/preferences', {
    method: 'POST',
    body: JSON.stringify({ filters }),
  });
}, []);

// Call on filter change
useEffect(() => {
  if (user) {
    saveFilterPreferences(filters);
  }
}, [filters, user, saveFilterPreferences]);
```

### 4. **Faceted Search Metadata** (Future: Real-time Counts)

When the backend has a search index, replace hardcoded counts with live data:

```typescript
// DEMO: Count from all schools in memory
const availablePrograms = useMemo(() => {
  const programMap = new Map<string, number>();
  allSchools.forEach((school) => {
    school.programs.forEach((program) => {
      programMap.set(program, (programMap.get(program) || 0) + 1);
    });
  });
  return Array.from(programMap.entries());
}, [allSchools]);

// PROD: Fetch facet counts from search API
const { data: facets } = useQuery({
  queryKey: ['facets', filters],
  queryFn: async () => {
    const res = await fetch('/api/schools/facets', {
      body: JSON.stringify(filters),
    });
    return res.json(); // { programs: [{ name: 'PPL', count: 45 }] }
  },
});
```

---

## Implementation Checklist for Junior Developer

- [ ] Create `/src/types/filters.ts` with `SchoolFilters` interface and `DEFAULT_FILTERS`
- [ ] Create `/src/hooks/useSchoolFilters.ts` with complete filtering logic
- [ ] Create `/src/components/SchoolFilters.tsx` with all filter UI components
- [ ] Update `/src/pages/SchoolListingPage.tsx` to integrate filters
- [ ] Ensure MUI dependencies are installed (`@mui/material`, `@mui/icons-material`)
- [ ] Add debouncing library if needed (`use-debounce` or similar)
- [ ] Create test file `/src/__tests__/hooks/useSchoolFilters.test.ts` and verify all tests pass
- [ ] Test all filter combinations manually in the browser
- [ ] Verify empty state displays when no schools match
- [ ] Verify responsive design on mobile/tablet/desktop
- [ ] Test accessibility with keyboard navigation and screen reader
- [ ] Verify no console errors or warnings
- [ ] Document any modifications to existing files (especially `SchoolListingPage.tsx`)

---

## Code Quality Standards

- **TypeScript**: Strict mode enabled, no `any` types
- **Comments**: JSDoc comments for all functions and complex logic
- **Naming**: Use clear, descriptive names (`filteredSchools` not `results`, `activeFilterCount` not `count`)
- **Error Handling**: Handle edge cases (empty arrays, null values, etc.)
- **Testing**: Unit tests for all filtering logic with good coverage
- **Performance**: Use `useMemo` and `useCallback` appropriately

---

## Notes for Reviewers

This PR is intentionally demo-only to allow rapid iteration on the UI without backend dependencies. The code is structured to:

1. **Be easy to swap out**: The filtering logic in `useSchoolFilters` is isolated and can be replaced with API calls later
2. **Provide good DX**: The custom hook pattern makes filters reusable across multiple pages
3. **Be testable**: Pure filtering functions make unit testing straightforward
4. **Scale well**: Mock data structure matches the planned database schema

When production APIs are ready, only the `useSchoolFilters` hook needs updating—the UI components remain unchanged.

---

## Related Issues/PRs

- **PR-1**: School Listing Page (mock data setup)
- **Future**: Filter Persistence (save user preferences)
- **Future**: AI-Driven Matching (recommendation system)
