import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import type { School } from '../types/school';
import { useComparison } from '../hooks/useComparison';

interface SchoolCardProps {
  school: School;
}

const trustTierColors: Record<string, 'success' | 'primary' | 'default' | 'warning'> = {
  Premier: 'success',
  VerifiedFSP: 'primary',
  Community: 'default',
  Unverified: 'warning',
};

const trustTierLabels: Record<string, string> = {
  Premier: 'Premier',
  VerifiedFSP: 'Verified FSP',
  Community: 'Community',
  Unverified: 'Unverified',
};

export const SchoolCard: React.FC<SchoolCardProps> = ({ school }) => {
  const { addSchool, removeSchool, isSchoolSelected, count, maxCount } = useComparison();
  const isSelected = isSchoolSelected(school.id);
  const isDisabled = count >= maxCount && !isSelected;

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      addSchool(school.id);
    } else {
      removeSchool(school.id);
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        border: isSelected ? 2 : 1,
        borderColor: isSelected ? 'primary.main' : 'divider',
        transition: 'all 0.2s',
        '&:hover': {
          boxShadow: 4,
          transform: 'translateY(-4px)',
        },
      }}
    >
      <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isSelected}
              onChange={handleCheckboxChange}
              disabled={isDisabled}
              size="small"
            />
          }
          label={
            <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
              {count}/{maxCount}
            </Typography>
          }
          sx={{ m: 0 }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, pt: 5 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {school.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          {school.location.city}, {school.location.state}
        </Typography>

        <Box sx={{ mt: 2, mb: 2 }}>
          <Chip
            label={trustTierLabels[school.trustTier]}
            color={trustTierColors[school.trustTier]}
            size="small"
            sx={{ mr: 1 }}
          />
          <Chip
            label={school.trainingType === 'Part141' ? 'Part 141' : 'Part 61'}
            size="small"
            variant="outlined"
          />
        </Box>

        <Typography variant="body2" gutterBottom>
          <strong>Programs:</strong> {school.programs.join(', ')}
        </Typography>

        <Typography variant="body2" gutterBottom>
          <strong>Fleet Size:</strong> {school.fleetSize} aircraft
        </Typography>

        <Typography variant="body2" gutterBottom>
          <strong>PPL Cost:</strong> ${school.costBand.ppl.toLocaleString()}
        </Typography>

        <Typography variant="body2" gutterBottom>
          <strong>Rating:</strong> {school.rating.score}/5.0 ({school.rating.reviewCount} reviews)
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: '0.75rem' }}>
          {school.instructorCount} instructors • {school.estimatedHoursToPPL} hours to PPL
        </Typography>
      </CardContent>
    </Card>
  );
};
