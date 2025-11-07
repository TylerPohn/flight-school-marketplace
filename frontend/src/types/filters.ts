/**
 * Filter Types and Interfaces
 *
 * Defines the structure of filter state used for searching and filtering flight schools.
 */

/**
 * Shape of the filter state
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
  budgetRange: [0, 20000], // PPL costs typically range from $8k-$20k
  selectedState: '',
};
