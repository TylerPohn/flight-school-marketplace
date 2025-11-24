/**
 * useSchoolFilters Hook
 *
 * Custom hook for managing school filters and applying them to data.
 * Provides filter state, setters, and filtered results with memoization for performance.
 */

import { useState, useCallback, useMemo } from 'react';
import type { SchoolFilters } from '../types/filters';
import { DEFAULT_FILTERS } from '../types/filters';
import type { School } from '../types/school';

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
   * 1. Search filter (case-insensitive name/city match)
   * 2. Program type filter (school must have at least one selected program)
   * 3. Training type filter (school must match selected training type)
   * 4. Budget filter (school cost must overlap with range)
   * 5. Location filter (school state must match selected state)
   */
  const filteredSchools = useMemo(() => {
    const filtered = allSchools.filter((school) => {
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
        // School must exactly match the filter (Part61 or Part141)
        if (school.trainingType !== filters.trainingType) {
          return false;
        }
      }

      // 4. BUDGET RANGE FILTER
      const [minBudget, maxBudget] = filters.budgetRange;
      // Check if PPL cost (primary cost indicator) falls within budget range
      // A school is included if its PPL cost falls within the filter range
      const pplCost = school.costBand.ppl;
      if (pplCost < minBudget || pplCost > maxBudget) {
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

    // SORTING LOGIC
    // Sort the filtered results based on the selected sort option
    return filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return a.costBand.ppl - b.costBand.ppl;
        case 'price-desc':
          return b.costBand.ppl - a.costBand.ppl;
        case 'rating-desc':
          return b.rating.score - a.rating.score;
        case 'rating-asc':
          return a.rating.score - b.rating.score;
        case 'fleet-size-desc':
          return b.fleetSize - a.fleetSize;
        case 'fleet-size-asc':
          return a.fleetSize - b.fleetSize;
        default:
          return 0;
      }
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
      filters.budgetRange[0] !== 0 ||
      filters.budgetRange[1] !== 20000
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
