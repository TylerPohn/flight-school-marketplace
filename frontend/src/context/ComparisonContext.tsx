import React, { createContext, useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { School } from '../types/school';
import { getSchoolsByIds, convertToSimpleSchool } from '../services/schoolsApi';

/**
 * Comparison Context Type Definition
 *
 * Defines the shape of the comparison context that manages school selection
 * for side-by-side comparison functionality. This context provides a centralized
 * state management solution for multi-school comparison across the app.
 */
interface ComparisonContextType {
  /** Array of currently selected schools for comparison */
  selectedSchools: School[];

  /**
   * Add a school to the comparison list
   * @param schoolId - The unique identifier of the school to add
   * @returns boolean - True if added successfully, false if limit reached or already selected
   */
  addSchool: (schoolId: string) => boolean;

  /**
   * Remove a school from the comparison list
   * @param schoolId - The unique identifier of the school to remove
   */
  removeSchool: (schoolId: string) => void;

  /**
   * Clear all schools from the comparison list
   */
  clearComparison: () => void;

  /**
   * Check if a school is currently selected
   * @param schoolId - The unique identifier of the school to check
   * @returns boolean - True if the school is in the comparison list
   */
  isSchoolSelected: (schoolId: string) => boolean;

  /** Number of currently selected schools */
  count: number;

  /** Maximum number of schools that can be compared at once (4) */
  maxCount: number;
}

/**
 * Comparison Context
 *
 * React Context for managing flight school comparison state across the application.
 * This context allows users to select up to 4 schools from anywhere in the app
 * and compare them side-by-side.
 *
 * Key Features:
 * - URL synchronization: Selected schools persist in URL query params
 * - Maximum 4 schools: Prevents UI clutter and keeps comparisons meaningful
 * - Automatic data fetching: School details are fetched when selections change
 * - Global accessibility: Any component can add/remove schools via useComparison hook
 *
 * @example
 * // Wrap your app with the provider
 * <ComparisonProvider>
 *   <App />
 * </ComparisonProvider>
 *
 * @example
 * // Use in any component via the useComparison hook
 * function SchoolCard({ school }) {
 *   const { addSchool, removeSchool, isSchoolSelected } = useComparison();
 *   const isSelected = isSchoolSelected(school.id);
 *
 *   return (
 *     <Card>
 *       <Checkbox
 *         checked={isSelected}
 *         onChange={(e) => e.target.checked ? addSchool(school.id) : removeSchool(school.id)}
 *       />
 *       {school.name}
 *     </Card>
 *   );
 * }
 */
export const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

interface ComparisonProviderProps {
  children: ReactNode;
}

/**
 * Comparison Provider Component
 *
 * Provider component that wraps the application and manages school comparison state.
 * This component handles three key responsibilities:
 *
 * 1. URL Synchronization: Maintains selected school IDs in URL query params
 *    - On mount: Reads ?schools=id1,id2,id3 from URL and restores selection
 *    - On change: Updates URL to reflect current selection (enables sharing/bookmarking)
 *
 * 2. Data Fetching: Automatically fetches full school details when IDs change
 *    - Converts school IDs to complete School objects
 *    - Handles loading states and errors gracefully
 *
 * 3. State Management: Provides comparison state via context to all children
 *    - Tracks both IDs (for URL) and full School objects (for display)
 *    - Enforces maximum 4 schools limit
 *
 * @param props - Component props
 * @param props.children - Child components that will have access to comparison context
 */
export const ComparisonProvider: React.FC<ComparisonProviderProps> = ({ children }) => {
  // Track school IDs separately for URL synchronization
  const [selectedSchoolIds, setSelectedSchoolIds] = useState<string[]>([]);
  // Track full school objects for rendering
  const [selectedSchools, setSelectedSchools] = useState<School[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const maxCount = 4;

  // Initialize from URL params on mount
  // This allows users to share/bookmark comparison pages
  useEffect(() => {
    const schoolsParam = searchParams.get('schools');
    if (schoolsParam) {
      // Parse comma-separated IDs and enforce maximum
      const ids = schoolsParam.split(',').filter(Boolean).slice(0, maxCount);
      setSelectedSchoolIds(ids);
    }
  }, []);

  // Update URL when selection changes (bidirectional sync)
  // This keeps the URL in sync with state for shareable links
  useEffect(() => {
    if (selectedSchoolIds.length > 0) {
      // Add/update schools param
      setSearchParams({ schools: selectedSchoolIds.join(',') }, { replace: true });
    } else {
      // Remove schools param if no schools selected (clean URL)
      const params = new URLSearchParams(searchParams);
      params.delete('schools');
      setSearchParams(params, { replace: true });
    }
  }, [selectedSchoolIds]);

  // Fetch full school details when IDs change
  // This effect handles the async data loading for selected schools
  useEffect(() => {
    if (selectedSchoolIds.length > 0) {
      getSchoolsByIds(selectedSchoolIds)
        .then(detailedSchools => {
          // Convert detailed school objects to simplified format for display
          const simpleSchools = detailedSchools.map(convertToSimpleSchool);
          setSelectedSchools(simpleSchools);
        })
        .catch(error => {
          console.error('Error fetching comparison schools:', error);
          // On error, clear the schools but keep the IDs (user can retry)
          setSelectedSchools([]);
        });
    } else {
      setSelectedSchools([]);
    }
  }, [selectedSchoolIds]);

  /**
   * Add a school to the comparison list
   *
   * This function validates before adding:
   * - Returns false if maximum (4) schools already selected
   * - Returns false if school is already in the list (prevent duplicates)
   * - Returns true on successful addition
   *
   * The function is memoized with useCallback to prevent unnecessary re-renders
   * of components that consume this context.
   */
  const addSchool = useCallback((schoolId: string): boolean => {
    // Enforce maximum limit of 4 schools
    if (selectedSchoolIds.length >= maxCount) {
      return false;
    }
    // Prevent duplicate selections
    if (selectedSchoolIds.includes(schoolId)) {
      return false;
    }
    setSelectedSchoolIds(prev => [...prev, schoolId]);
    return true;
  }, [selectedSchoolIds, maxCount]);

  /**
   * Remove a school from the comparison list
   *
   * Filters out the specified school ID from the selection.
   * Memoized to prevent unnecessary re-renders.
   */
  const removeSchool = useCallback((schoolId: string): void => {
    setSelectedSchoolIds(prev => prev.filter(id => id !== schoolId));
  }, []);

  /**
   * Clear all schools from comparison
   *
   * Resets the comparison list to empty state.
   * Useful for "Start Over" functionality.
   */
  const clearComparison = useCallback((): void => {
    setSelectedSchoolIds([]);
  }, []);

  /**
   * Check if a school is currently selected
   *
   * Used to determine checkbox states and button states in UI.
   * Memoized for performance in lists where many schools are rendered.
   */
  const isSchoolSelected = useCallback((schoolId: string): boolean => {
    return selectedSchoolIds.includes(schoolId);
  }, [selectedSchoolIds]);

  const value: ComparisonContextType = {
    selectedSchools,
    addSchool,
    removeSchool,
    clearComparison,
    isSchoolSelected,
    count: selectedSchoolIds.length,
    maxCount
  };

  return (
    <ComparisonContext.Provider value={value}>
      {children}
    </ComparisonContext.Provider>
  );
};
