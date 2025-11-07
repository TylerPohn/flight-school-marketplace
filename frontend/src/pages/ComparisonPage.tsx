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
} from '@mui/material';
import { useSearchParams, Link as RouterLink } from 'react-router-dom';
import type { School, TrustTier } from '../types/school';
import { getSchoolsByIds } from '../mock/schools';

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
  const [schools, setSchools] = useState<School[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const schoolsParam = searchParams.get('schools');
    if (!schoolsParam) {
      setError('No schools selected for comparison. Please select at least 2 schools.');
      return;
    }

    const schoolIds = schoolsParam.split(',').filter(Boolean);
    
    if (schoolIds.length < 2) {
      setError('Please select at least 2 schools to compare.');
      return;
    }

    if (schoolIds.length > 4) {
      setError('Maximum 4 schools can be compared. Showing first 4.');
    }

    const selectedSchools = getSchoolsByIds(schoolIds.slice(0, 4));
    
    if (selectedSchools.length === 0) {
      setError('No valid schools found. Please return to the directory.');
      return;
    }

    if (selectedSchools.length < schoolIds.length) {
      setError('Some schools could not be found.');
    }

    setSchools(selectedSchools);
  }, [searchParams]);

  const getBestValueStyle = (index: number, bestIndex: number) => ({
    backgroundColor: index === bestIndex ? '#E8F5E9' : 'transparent',
    color: index === bestIndex ? '#1B5E20' : 'inherit',
    fontWeight: index === bestIndex ? 600 : 'normal',
  });

  const comparisonRows: ComparisonRow[] = [
    {
      label: 'Location',
      getValue: (school) => `${school.location.city}, ${school.location.state}`,
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

  if (error && schools.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button component={RouterLink} to="/" variant="contained">
          Return to Directory
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, pb: 12 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          School Comparison
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Comparing {schools.length} school{schools.length !== 1 ? 's' : ''}
        </Typography>
        {error && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Box>

      <TableContainer component={Paper} elevation={2}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ fontWeight: 'bold', color: 'white', minWidth: 200 }}>
                Metric
              </TableCell>
              {schools.map(school => (
                <TableCell
                  key={school.id}
                  align="center"
                  sx={{ fontWeight: 'bold', color: 'white', minWidth: 180 }}
                >
                  <Button
                    component={RouterLink}
                    to={`/schools/${school.id}`}
                    sx={{ color: 'white', textDecoration: 'underline', textTransform: 'none' }}
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
                  sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}
                >
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                    {row.label}
                  </TableCell>
                  {schools.map((school, schoolIndex) => (
                    <TableCell
                      key={school.id}
                      align="center"
                      sx={getBestValueStyle(schoolIndex, bestIndex)}
                    >
                      {row.getValue(school)}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 3 }}>
        <Button component={RouterLink} to="/" variant="outlined">
          Back to Directory
        </Button>
      </Box>
    </Container>
  );
};
