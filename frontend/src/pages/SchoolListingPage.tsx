/**
 * SchoolListingPage
 *
 * Main page for browsing and filtering flight schools.
 * Displays filter panel on the left and school listings on the right.
 */

import { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { getAllSchools, convertToSimpleSchool } from '../services/schoolsApi';
import { SchoolCard } from '../components/SchoolCard';
import { SchoolFiltersComponent } from '../components/SchoolFilters';
import { useSchoolFilters } from '../hooks/useSchoolFilters';

export function SchoolListingPage() {
  const [schools, setSchools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllSchools()
      .then(detailedSchools => {
        const simpleSchools = detailedSchools.map(convertToSimpleSchool);
        setSchools(simpleSchools);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching schools:', error);
        setSchools([]);
        setLoading(false);
      });
  }, []);

  // Initialize filter hook with API school data
  const {
    filters,
    updateFilter,
    clearAllFilters,
    filteredSchools,
    activeFilterCount,
    availableStates,
    availablePrograms,
  } = useSchoolFilters(schools);

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Flight Schools Marketplace
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        {/* Left Column: Filters */}
        <Box sx={{ flex: { md: '0 0 25%' } }}>
          <SchoolFiltersComponent
            filters={filters}
            onSearchChange={(query) => updateFilter('searchQuery', query)}
            onProgramTypesChange={(programs) => updateFilter('programTypes', programs)}
            onTrainingTypeChange={(type) => updateFilter('trainingType', type)}
            onBudgetRangeChange={(range) => updateFilter('budgetRange', range)}
            onStateChange={(state) => updateFilter('selectedState', state)}
            onSortChange={(sortBy) => updateFilter('sortBy', sortBy)}
            onClearAll={clearAllFilters}
            activeFilterCount={activeFilterCount}
            availableStates={availableStates}
            availablePrograms={availablePrograms}
            filteredCount={filteredSchools.length}
            totalCount={schools.length}
          />
        </Box>

        {/* Right Column: School Listings */}
        <Box sx={{ flex: 1 }}>
          {/* Results Summary Bar */}
          <Box
            sx={{
              mb: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {filteredSchools.length === schools.length
                ? `Showing all ${filteredSchools.length} schools`
                : `Found ${filteredSchools.length} of ${schools.length} schools`}
            </Typography>
          </Box>

          {filteredSchools.length > 0 ? (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)',
                },
                gap: 3,
              }}
            >
              {filteredSchools.map((school) => (
                <SchoolCard key={school.id} school={school} />
              ))}
            </Box>
          ) : (
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
                px: 2,
              }}
            >
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No schools match your filters
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your search criteria or clearing some filters.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}
