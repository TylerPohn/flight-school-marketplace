import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { School as SchoolIcon } from '@mui/icons-material';
import { SchoolCard } from '../components/SchoolCard';
import { SchoolFiltersComponent } from '../components/SchoolFilters';
import { useSchoolFilters } from '../hooks/useSchoolFilters';
import { getAllSchools, convertToSimpleSchool } from '../services/schoolsApi';
import type { School } from '../types/school';

export const SchoolDirectory: React.FC = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllSchools()
      .then(detailedSchools => {
        // Convert DetailedSchool[] to School[] format for compatibility
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

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1f2e 0%, #252d3d 50%, #2f3947 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 10% 20%, rgba(63, 81, 181, 0.08) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(25, 118, 210, 0.08) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="xl" sx={{ py: { xs: 3, sm: 4, md: 5 }, pb: { xs: 8, sm: 10, md: 12 }, position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            mb: { xs: 4, sm: 5 },
            textAlign: 'center',
            animation: 'fadeInDown 0.8s ease-out',
            '@keyframes fadeInDown': {
              '0%': { opacity: 0, transform: 'translateY(-30px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
              p: 2,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            }}
          >
            <SchoolIcon
              sx={{
                fontSize: { xs: 40, sm: 48, md: 56 },
                color: '#fff',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
              }}
            />
          </Box>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #fff 0%, #e3f2fd 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              textShadow: '0 0 30px rgba(227, 242, 253, 0.2)',
              letterSpacing: '-0.5px',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            Flight School Directory
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.85)',
              fontSize: { xs: '1rem', sm: '1.1rem' },
              maxWidth: '700px',
              mx: 'auto',
              px: { xs: 2, sm: 0 },
            }}
          >
            Browse and compare flight schools across the country. Select up to 4 schools to compare side-by-side.
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: '#fff' }} />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            {/* Left Column: Filters */}
            <Box sx={{ flex: { md: '0 0 300px' } }}>
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

            {/* Right Column: School Cards */}
            <Box sx={{ flex: 1 }}>
            {filteredSchools.length > 0 ? (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
                  gap: { xs: 2, sm: 2.5, md: 3 },
                  animation: 'fadeInUp 0.8s ease-out 0.2s both',
                  '@keyframes fadeInUp': {
                    '0%': { opacity: 0, transform: 'translateY(30px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                  },
                }}
              >
                {filteredSchools.map((school, index) => (
                  <Box
                    key={school.id}
                    sx={{
                      animation: `fadeInScale 0.5s ease-out ${0.1 * index}s both`,
                      '@keyframes fadeInScale': {
                        '0%': { opacity: 0, transform: 'scale(0.9)' },
                        '100%': { opacity: 1, transform: 'scale(1)' },
                      },
                    }}
                  >
                    <SchoolCard school={school} gradientIndex={index} />
                  </Box>
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
                <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.7)' }} gutterBottom>
                  No schools match your filters
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  Try adjusting your search criteria or clearing some filters.
                </Typography>
              </Box>
            )}
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};
