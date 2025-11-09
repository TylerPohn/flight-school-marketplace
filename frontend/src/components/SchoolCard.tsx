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
import { useNavigate } from 'react-router-dom';
import type { School } from '../types/school';
import { useComparison } from '../hooks/useComparison';

interface SchoolCardProps {
  school: School;
  gradientIndex?: number;
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

export const SchoolCard: React.FC<SchoolCardProps> = ({ school, gradientIndex = 0 }) => {
  const navigate = useNavigate();
  const { addSchool, removeSchool, isSchoolSelected, count, maxCount } = useComparison();
  const isSelected = isSchoolSelected(school.id);
  const isDisabled = count >= maxCount && !isSelected;

  // Create unique gradients for each card
  const gradients = [
    'linear-gradient(135deg, rgba(30, 60, 114, 0.3) 0%, rgba(42, 82, 152, 0.2) 100%)', // Blue
    'linear-gradient(135deg, rgba(46, 125, 50, 0.3) 0%, rgba(76, 175, 80, 0.2) 100%)', // Green
    'linear-gradient(135deg, rgba(123, 31, 162, 0.3) 0%, rgba(156, 39, 176, 0.2) 100%)', // Purple
    'linear-gradient(135deg, rgba(216, 67, 21, 0.3) 0%, rgba(255, 87, 34, 0.2) 100%)', // Orange
    'linear-gradient(135deg, rgba(0, 96, 100, 0.3) 0%, rgba(0, 150, 136, 0.2) 100%)', // Teal
    'linear-gradient(135deg, rgba(194, 24, 91, 0.3) 0%, rgba(233, 30, 99, 0.2) 100%)', // Pink
  ];

  const hoverGradients = [
    'linear-gradient(135deg, rgba(30, 60, 114, 0.4) 0%, rgba(42, 82, 152, 0.3) 100%)',
    'linear-gradient(135deg, rgba(46, 125, 50, 0.4) 0%, rgba(76, 175, 80, 0.3) 100%)',
    'linear-gradient(135deg, rgba(123, 31, 162, 0.4) 0%, rgba(156, 39, 176, 0.3) 100%)',
    'linear-gradient(135deg, rgba(216, 67, 21, 0.4) 0%, rgba(255, 87, 34, 0.3) 100%)',
    'linear-gradient(135deg, rgba(0, 96, 100, 0.4) 0%, rgba(0, 150, 136, 0.3) 100%)',
    'linear-gradient(135deg, rgba(194, 24, 91, 0.4) 0%, rgba(233, 30, 99, 0.3) 100%)',
  ];

  const gradient = gradients[gradientIndex % gradients.length];
  const hoverGradient = hoverGradients[gradientIndex % hoverGradients.length];

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (event.target.checked) {
      addSchool(school.id);
    } else {
      removeSchool(school.id);
    }
  };

  const handleCardClick = () => {
    navigate(`/schools/${school.id}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        border: isSelected ? 2 : 1,
        borderColor: isSelected ? 'primary.main' : 'divider',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        background: gradient,
        backdropFilter: 'blur(10px)',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
          transform: 'translateY(-8px)',
          background: hoverGradient,
          borderColor: isSelected ? 'primary.light' : 'rgba(255, 255, 255, 0.2)',
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
          {school.location?.city || (school as any).city}, {school.location?.state || (school as any).state}
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
