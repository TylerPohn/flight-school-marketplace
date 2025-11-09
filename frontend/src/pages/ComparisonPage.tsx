import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Alert,
  Button,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import { CompareArrows } from '@mui/icons-material';
import { useSearchParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import type { School, TrustTier } from '../types/school';
import { getSchoolsByIds, convertToSimpleSchool } from '../services/schoolsApi';

const trustTierLabels: Record<TrustTier, string> = {
  Premier: 'Premier',
  VerifiedFSP: 'Verified FSP',
  Community: 'Community',
  Unverified: 'Unverified',
};

const trustTierColors: Record<TrustTier, 'success' | 'primary' | 'default' | 'warning'> = {
  Premier: 'success',
  VerifiedFSP: 'primary',
  Community: 'default',
  Unverified: 'warning',
};

const trustTierRank: Record<TrustTier, number> = {
  Premier: 4,
  VerifiedFSP: 3,
  Community: 2,
  Unverified: 1,
};

interface ComparisonRow {
  label: string;
  getValue: (school: School) => React.ReactNode;
  getBestIndex?: (schools: School[]) => number;
}

export const ComparisonPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const schoolsParam = searchParams.get('schools');
    if (!schoolsParam) {
      // Redirect to schools page and show notification
      setShowNotification(true);
      setTimeout(() => {
        navigate('/schools');
      }, 100);
      return;
    }

    const schoolIds = schoolsParam.split(',').filter(Boolean);

    if (schoolIds.length < 2) {
      // Redirect to schools page and show notification
      setShowNotification(true);
      setTimeout(() => {
        navigate('/schools');
      }, 100);
      return;
    }

    if (schoolIds.length > 4) {
      setError('Maximum 4 schools can be compared. Showing first 4.');
    }

    setLoading(true);
    getSchoolsByIds(schoolIds.slice(0, 4))
      .then(detailedSchools => {
        const simpleSchools = detailedSchools.map(convertToSimpleSchool);

        if (simpleSchools.length === 0) {
          setError('No valid schools found. Please return to the directory.');
          setLoading(false);
          return;
        }

        if (simpleSchools.length < schoolIds.length) {
          setError('Some schools could not be found.');
        }

        setSchools(simpleSchools);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching comparison schools:', error);
        setError('Failed to load schools for comparison.');
        setLoading(false);
      });
  }, [searchParams]);


  const comparisonRows: ComparisonRow[] = [
    {
      label: 'Location',
      getValue: (school) => `${(school as any).location?.city || (school as any).city}, ${(school as any).location?.state || (school as any).state}`,
    },
    {
      label: 'Trust Tier',
      getValue: (school) => (
        <Chip
          label={trustTierLabels[school.trustTier]}
          color={trustTierColors[school.trustTier]}
          size="small"
        />
      ),
      getBestIndex: (schools) => {
        const ranks = schools.map(s => trustTierRank[s.trustTier]);
        const maxRank = Math.max(...ranks);
        return ranks.indexOf(maxRank);
      },
    },
    {
      label: 'Programs Offered',
      getValue: (school) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {school.programs.map(program => (
            <Chip key={program} label={program} size="small" variant="outlined" />
          ))}
        </Box>
      ),
    },
    {
      label: 'Training Type',
      getValue: (school) => school.trainingType === 'Part141' ? 'Part 141' : 'Part 61',
    },
    {
      label: 'Fleet Size',
      getValue: (school) => `${school.fleetSize} aircraft`,
      getBestIndex: (schools) => {
        const sizes = schools.map(s => s.fleetSize);
        const maxSize = Math.max(...sizes);
        return sizes.indexOf(maxSize);
      },
    },
    {
      label: 'Primary Aircraft',
      getValue: (school) => school.primaryAircraft.join(', '),
    },
    {
      label: 'Cost - PPL',
      getValue: (school) => `$${school.costBand.ppl.toLocaleString()}`,
      getBestIndex: (schools) => {
        const costs = schools.map(s => s.costBand.ppl);
        const minCost = Math.min(...costs);
        return costs.indexOf(minCost);
      },
    },
  ];

  // Conditionally add IR cost if at least one school offers it
  const hasIR = schools.some(s => s.programs.includes('IR') && s.costBand.ir);
  if (hasIR) {
    comparisonRows.push({
      label: 'Cost - IR',
      getValue: (school) => 
        school.costBand.ir ? `$${school.costBand.ir.toLocaleString()}` : 'Not Offered',
      getBestIndex: (schools) => {
        const costs = schools.map(s => s.costBand.ir || Infinity);
        const minCost = Math.min(...costs);
        return costs.indexOf(minCost);
      },
    });
  }

  // Conditionally add CPL cost if at least one school offers it
  const hasCPL = schools.some(s => s.programs.includes('CPL') && s.costBand.cpl);
  if (hasCPL) {
    comparisonRows.push({
      label: 'Cost - CPL',
      getValue: (school) => 
        school.costBand.cpl ? `$${school.costBand.cpl.toLocaleString()}` : 'Not Offered',
      getBestIndex: (schools) => {
        const costs = schools.map(s => s.costBand.cpl || Infinity);
        const minCost = Math.min(...costs);
        return costs.indexOf(minCost);
      },
    });
  }

  comparisonRows.push(
    {
      label: 'Estimated Hours to PPL',
      getValue: (school) => `${school.estimatedHoursToPPL} hours`,
      getBestIndex: (schools) => {
        const hours = schools.map(s => s.estimatedHoursToPPL);
        const minHours = Math.min(...hours);
        return hours.indexOf(minHours);
      },
    },
    {
      label: 'Instructor Count',
      getValue: (school) => `${school.instructorCount} instructors`,
      getBestIndex: (schools) => {
        const counts = schools.map(s => s.instructorCount);
        const maxCount = Math.max(...counts);
        return counts.indexOf(maxCount);
      },
    },
    {
      label: 'Financing Available',
      getValue: (school) => school.financingAvailable ? 'Yes' : 'No',
    },
    {
      label: 'School Rating',
      getValue: (school) => `${school.rating.score}/5.0 (${school.rating.reviewCount} reviews)`,
      getBestIndex: (schools) => {
        const ratings = schools.map(s => s.rating.score);
        const maxRating = Math.max(...ratings);
        return ratings.indexOf(maxRating);
      },
    }
  );

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #1a1f2e 0%, #252d3d 50%, #2f3947 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress sx={{ color: '#fff' }} />
      </Box>
    );
  }

  if (error && schools.length === 0) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #1a1f2e 0%, #252d3d 50%, #2f3947 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Container maxWidth="sm">
          <Alert
            severity="error"
            sx={{
              mb: 2,
              background: 'rgba(244, 67, 54, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(244, 67, 54, 0.3)',
              color: '#fff',
              '& .MuiAlert-icon': {
                color: '#ef5350',
              },
            }}
          >
            {error}
          </Alert>
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            fullWidth
            sx={{
              py: 1.5,
              background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%)',
              },
            }}
          >
            Return to Directory
          </Button>
        </Container>
      </Box>
    );
  }

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
          background: 'radial-gradient(circle at 20% 40%, rgba(100, 110, 130, 0.06) 0%, transparent 50%), radial-gradient(circle at 80% 60%, rgba(80, 95, 115, 0.06) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4, md: 5 }, pb: { xs: 8, sm: 10, md: 12 }, position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            mb: 4,
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
            <CompareArrows
              sx={{
                fontSize: { xs: 40, sm: 48, md: 56 },
                color: '#fff',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
              }}
            />
          </Box>
          <Typography
            variant="h4"
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
              fontSize: { xs: '1.75rem', sm: '2.125rem', md: '2.5rem' },
            }}
          >
            School Comparison
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.85)',
              fontSize: { xs: '1rem', sm: '1.1rem' },
            }}
          >
            Comparing {schools.length} school{schools.length !== 1 ? 's' : ''}
          </Typography>
          {error && (
            <Alert
              severity="warning"
              sx={{
                mt: 2,
                background: 'rgba(255, 152, 0, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 152, 0, 0.3)',
                color: '#fff',
                '& .MuiAlert-icon': {
                  color: '#ffb74d',
                },
              }}
            >
              {error}
            </Alert>
          )}
        </Box>

        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: { xs: '12px', sm: '16px' },
            animation: 'fadeInUp 0.8s ease-out 0.2s both',
            '@keyframes fadeInUp': {
              '0%': { opacity: 0, transform: 'translateY(30px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow
              sx={{
                background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
              }}
            >
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  color: 'white',
                  minWidth: 200,
                  fontSize: '1rem',
                }}
              >
                Metric
              </TableCell>
              {schools.map(school => (
                <TableCell
                  key={school.id}
                  align="center"
                  sx={{
                    fontWeight: 'bold',
                    color: 'white',
                    minWidth: 180,
                    p: 1,
                  }}
                >
                  <Button
                    component={RouterLink}
                    to={`/schools/${school.id}`}
                    sx={{
                      color: 'white',
                      textDecoration: 'none',
                      textTransform: 'none',
                      fontWeight: 700,
                      px: 2,
                      py: 1,
                      borderRadius: '8px',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                      border: '1px solid transparent',
                      '&:hover': {
                        color: 'white',
                        background: 'rgba(255, 255, 255, 0.15)',
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        transform: 'scale(1.02)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                      },
                    }}
                  >
                    {school.name}
                  </Button>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {comparisonRows.map((row, rowIndex) => {
              const bestIndex = row.getBestIndex ? row.getBestIndex(schools) : -1;
              return (
                <TableRow
                  key={rowIndex}
                  sx={{
                    '&:nth-of-type(odd)': {
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    },
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      fontWeight: 'bold',
                      color: 'rgba(255, 255, 255, 0.9)',
                    }}
                  >
                    {row.label}
                  </TableCell>
                  {schools.map((school, schoolIndex) => {
                    const isHighlighted = schoolIndex === bestIndex && bestIndex !== -1;
                    return (
                      <TableCell
                        key={school.id}
                        align="center"
                        sx={{
                          backgroundColor: isHighlighted ? 'rgba(76, 175, 80, 0.15)' : 'transparent',
                          color: isHighlighted ? '#81c784' : 'rgba(255, 255, 255, 0.85)',
                          fontWeight: isHighlighted ? 600 : 'normal',
                        }}
                      >
                        {row.getValue(school)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 3 }}>
        <Button
          component={RouterLink}
          to="/"
          variant="outlined"
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: '12px',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            color: '#fff',
            fontWeight: 600,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            backdropFilter: 'blur(10px)',
            background: 'rgba(255, 255, 255, 0.05)',
            '&:hover': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
              background: 'rgba(255, 255, 255, 0.1)',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          Back to Directory
        </Button>
      </Box>
      </Container>

      {/* Notification Snackbar */}
      <Snackbar
        open={showNotification}
        autoHideDuration={4000}
        onClose={() => setShowNotification(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowNotification(false)}
          severity="info"
          sx={{
            background: 'rgba(33, 150, 243, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#fff',
            '& .MuiAlert-icon': {
              color: '#fff',
            },
          }}
        >
          Please select at least 2 schools to compare. Use the checkboxes on school cards.
        </Alert>
      </Snackbar>
    </Box>
  );
};
