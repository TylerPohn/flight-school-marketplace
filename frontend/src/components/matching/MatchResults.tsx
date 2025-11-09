import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Typography,
  LinearProgress,
  Divider,
  Stack,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
  LocationOn,
  AttachMoney,
  School,
  TrendingUp,
  Refresh,
} from '@mui/icons-material';
import type { RankedSchool } from '../../types/matchProfile';

interface MatchResultsProps {
  results: RankedSchool[];
  onRefine?: () => void;
}

export function MatchResults({ results, onRefine }: MatchResultsProps) {
  const getScoreColor = (score: number): string => {
    if (score >= 90) return 'success.main';
    if (score >= 80) return 'info.main';
    if (score >= 70) return 'warning.main';
    return 'text.secondary';
  };

  const getTrustTierColor = (tier: string): 'success' | 'info' | 'default' => {
    if (tier === 'Verified FSP') return 'success';
    if (tier === 'Community-Verified') return 'info';
    return 'default';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Your Top {results.length} Matches
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Based on your profile, here are the best flight schools for you
        </Typography>
        {onRefine && (
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={onRefine}
            sx={{ mt: 2 }}
          >
            Refine Results
          </Button>
        )}
      </Box>

      {/* Results List */}
      <Stack spacing={3}>
        {results.map((result) => {
          const { school, matchScore, explanation, ranking } = result;

          return (
            <Box key={school.id}>
              <Card
                elevation={ranking <= 3 ? 4 : 2}
                sx={{
                  position: 'relative',
                  border: ranking === 1 ? '2px solid' : 'none',
                  borderColor: 'primary.main',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                }}
              >
                {/* Ranking Badge */}
                {ranking <= 3 && (
                  <Chip
                    label={`#${ranking} Match`}
                    color={ranking === 1 ? 'primary' : 'secondary'}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      fontWeight: 'bold',
                    }}
                  />
                )}

                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                    {/* Left Column - School Info */}
                    <Box sx={{ flex: { md: '1 1 66%' } }}>
                      {/* School Name & Trust Tier */}
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                          {school.name}
                        </Typography>
                        <Chip
                          label={school.trustTier}
                          color={getTrustTierColor(school.trustTier)}
                          size="small"
                          sx={{ mr: 1 }}
                        />
                        <Chip
                          label={school.trainingType}
                          variant="outlined"
                          size="small"
                        />
                      </Box>

                      {/* Quick Stats */}
                      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocationOn fontSize="small" color="action" />
                          <Typography variant="body2">
                            {(school as any).location?.city || (school as any).city}, {(school as any).location?.state || (school as any).state}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <AttachMoney fontSize="small" color="action" />
                          <Typography variant="body2">
                            ${school.costBand.min.toLocaleString()} - ${school.costBand.max.toLocaleString()}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <School fontSize="small" color="action" />
                          <Typography variant="body2">
                            {school.instructorCount} instructors
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <TrendingUp fontSize="small" color="action" />
                          <Typography variant="body2">
                            Avg {school.averageHoursToPPL}hrs to PPL
                          </Typography>
                        </Box>
                      </Box>

                      {/* Programs */}
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Programs: {school.programs.join(', ')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Fleet: {school.fleetTypes.join(', ')}
                        </Typography>
                      </Box>

                      {/* AI Explanation */}
                      <Box sx={{ bgcolor: 'rgba(33, 150, 243, 0.1)', border: '1px solid rgba(33, 150, 243, 0.3)', p: 2, borderRadius: 1, mb: 2 }}>
                        <Typography
                          variant="body2"
                          sx={{ fontStyle: 'italic', color: 'text.primary' }}
                        >
                          {explanation}
                        </Typography>
                      </Box>

                      {/* Action Buttons */}
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Button
                          variant="contained"
                          size="small"
                          component={RouterLink}
                          to={`/schools/${school.id}`}
                        >
                          Learn More
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                        >
                          Request Tour
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                        >
                          Quick Message
                        </Button>
                      </Box>
                    </Box>

                    {/* Right Column - Match Score */}
                    <Box sx={{ flex: { md: '1 1 33%' } }}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '100%',
                          bgcolor: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: 2,
                          p: 2,
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        <Typography variant="h2" fontWeight="bold" sx={{ color: getScoreColor(matchScore) }}>
                          {Math.round(matchScore)}%
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }} gutterBottom>
                          Match Score
                        </Typography>

                        <Box sx={{ width: '100%', mt: 2 }}>
                          <LinearProgress
                            variant="determinate"
                            value={matchScore}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              bgcolor: 'rgba(255, 255, 255, 0.2)',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: getScoreColor(matchScore),
                              },
                            }}
                          />
                        </Box>

                        {/* Key Strengths */}
                        <Box sx={{ mt: 3, width: '100%' }}>
                          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }} gutterBottom display="block">
                            Key Strengths:
                          </Typography>
                          {school.preferences.slice(0, 3).map((pref, i) => (
                            <Chip
                              key={i}
                              label={pref}
                              size="small"
                              sx={{ m: 0.5 }}
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          );
        })}
      </Stack>

      {/* Footer Note */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="caption" color="text.secondary">
          These results are generated using a deterministic matching algorithm based on your preferences.
          Contact schools directly for the most accurate and up-to-date information.
        </Typography>
      </Box>
    </Container>
  );
}
