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

/**
 * Props for the SchoolCard component
 */
interface SchoolCardProps {
  /** The school data to display */
  school: School;
  /** Index used to select gradient color (0-5), defaults to 0 */
  gradientIndex?: number;
}

/**
 * Mapping of trust tier enum values to Material-UI color variants
 * These colors provide visual hierarchy for school verification levels
 */
const trustTierColors: Record<string, 'success' | 'primary' | 'default' | 'warning'> = {
  PREMIER: 'success',        // Green - highest tier
  VERIFIED_FSP: 'primary',   // Blue - verified by Flight School Portal
  COMMUNITY_VERIFIED: 'default', // Gray - community verified
  UNVERIFIED: 'warning',     // Orange - not yet verified
};

/**
 * Human-readable labels for trust tier enum values
 */
const trustTierLabels: Record<string, string> = {
  PREMIER: 'Premier',
  VERIFIED_FSP: 'Verified FSP',
  COMMUNITY_VERIFIED: 'Community-Verified',
  UNVERIFIED: 'Unverified',
};

/**
 * School Card Component
 *
 * Displays a flight school's key information in a card format with interactive features.
 * This is the primary component for browsing and comparing schools.
 *
 * Features:
 * - Comparison checkbox: Select up to 4 schools for side-by-side comparison
 * - Trust tier badge: Visual indicator of school verification status
 * - Click to navigate: Card click opens detailed school page
 * - Unique gradients: Each card has a distinct color scheme based on gradientIndex
 * - Hover effects: Animated lift and glow on hover for interactivity
 *
 * The card displays:
 * - School name and location
 * - Trust tier and training type (Part 141/61)
 * - Available programs
 * - Fleet size
 * - PPL cost estimate
 * - Rating and review count
 * - Instructor count and estimated hours to PPL
 *
 * @param props - Component props
 * @param props.school - School data object containing all display information
 * @param props.gradientIndex - Optional index (0-5) to select background gradient color
 *
 * @example
 * <SchoolCard school={schoolData} gradientIndex={0} />
 */
export const SchoolCard: React.FC<SchoolCardProps> = ({ school, gradientIndex = 0 }) => {
  const navigate = useNavigate();
  const { addSchool, removeSchool, isSchoolSelected, count, maxCount } = useComparison();
  const isSelected = isSchoolSelected(school.id);
  // Disable checkbox if max selections reached (unless this school is already selected)
  const isDisabled = count >= maxCount && !isSelected;

  // Create unique gradients for each card - cycles through 6 distinct color schemes
  // This provides visual distinction in grid layouts while maintaining readability
  const gradients = [
    'linear-gradient(135deg, rgba(30, 60, 114, 0.3) 0%, rgba(42, 82, 152, 0.2) 100%)', // Blue
    'linear-gradient(135deg, rgba(46, 125, 50, 0.3) 0%, rgba(76, 175, 80, 0.2) 100%)', // Green
    'linear-gradient(135deg, rgba(123, 31, 162, 0.3) 0%, rgba(156, 39, 176, 0.2) 100%)', // Purple
    'linear-gradient(135deg, rgba(216, 67, 21, 0.3) 0%, rgba(255, 87, 34, 0.2) 100%)', // Orange
    'linear-gradient(135deg, rgba(0, 96, 100, 0.3) 0%, rgba(0, 150, 136, 0.2) 100%)', // Teal
    'linear-gradient(135deg, rgba(194, 24, 91, 0.3) 0%, rgba(233, 30, 99, 0.2) 100%)', // Pink
  ];

  // Hover gradients are slightly more opaque for visual feedback
  const hoverGradients = [
    'linear-gradient(135deg, rgba(30, 60, 114, 0.4) 0%, rgba(42, 82, 152, 0.3) 100%)',
    'linear-gradient(135deg, rgba(46, 125, 50, 0.4) 0%, rgba(76, 175, 80, 0.3) 100%)',
    'linear-gradient(135deg, rgba(123, 31, 162, 0.4) 0%, rgba(156, 39, 176, 0.3) 100%)',
    'linear-gradient(135deg, rgba(216, 67, 21, 0.4) 0%, rgba(255, 87, 34, 0.3) 100%)',
    'linear-gradient(135deg, rgba(0, 96, 100, 0.4) 0%, rgba(0, 150, 136, 0.3) 100%)',
    'linear-gradient(135deg, rgba(194, 24, 91, 0.4) 0%, rgba(233, 30, 99, 0.3) 100%)',
  ];

  // Use modulo to cycle through gradients for any index value
  const gradient = gradients[gradientIndex % gradients.length];
  const hoverGradient = hoverGradients[gradientIndex % hoverGradients.length];

  /**
   * Handles comparison checkbox toggle
   * Stops event propagation to prevent card click navigation when checking/unchecking
   */
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (event.target.checked) {
      addSchool(school.id);
    } else {
      removeSchool(school.id);
    }
  };

  /**
   * Handles card click navigation to school detail page
   */
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
          {school.location.city}, {school.location.state}
        </Typography>

        <Box sx={{ mt: 2, mb: 2 }}>
          {school.trustTier && trustTierLabels[school.trustTier] && (
            <Chip
              label={trustTierLabels[school.trustTier]}
              color={trustTierColors[school.trustTier] || 'default'}
              size="small"
              sx={{ mr: 1 }}
            />
          )}
          {school.trainingType && (
            <Chip
              label={school.trainingType === 'Part141' ? 'Part 141' : 'Part 61'}
              size="small"
              variant="outlined"
            />
          )}
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
