/**
 * FSP Signals Panel Component
 *
 * Displays detailed Flight School Partner (FSP) performance metrics and signals.
 * Shows objective, measurable indicators of school quality and reliability.
 *
 * Features:
 * - Displays 4 key metrics: avg hours to PPL, cancel rate, on-time rate, satisfaction
 * - Compares metrics against industry benchmarks
 * - Visual status indicators (good, neutral, warning)
 * - Responsive layout for mobile and desktop
 * - Handles "not available" state for unverified schools
 */

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Box,
  Typography,
  LinearProgress,
  Divider,
  Stack,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Cancel as CancelIcon,
  Star as StarIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';
import { TrustTier, type FSPSignals } from '../types/trustTier';
import { TRUST_TIER_CONFIG, INDUSTRY_BENCHMARKS, getMockSignalsForTier } from '../constants/trustTiers';

/**
 * Props interface for FSPSignalsPanel
 */
export interface FSPSignalsPanelProps {
  /** Name of the school */
  schoolName: string;
  /** Trust tier of the school */
  tier: TrustTier;
  /** Optional FSP signals data (uses mock data if not provided) */
  signals?: FSPSignals;
}

/**
 * Props interface for individual metric display
 */
interface SignalMetricProps {
  /** Icon to display */
  icon: React.ReactNode;
  /** Metric label */
  label: string;
  /** Metric value to display */
  value: string | number;
  /** Explanation or context about the metric */
  explanation: string;
  /** Status indicator (good, neutral, warning) */
  status: 'good' | 'neutral' | 'warning';
  /** Optional progress bar value (0-100) */
  progressValue?: number;
}

/**
 * SignalMetric Component
 *
 * Displays an individual FSP metric with icon, value, explanation, and status indicator.
 */
const SignalMetric: React.FC<SignalMetricProps> = ({
  icon,
  label,
  value,
  explanation,
  status,
  progressValue,
}) => {
  // Define colors for status indicators
  const statusColors = {
    good: '#4CAF50',
    neutral: '#2196F3',
    warning: '#FF9800',
  };

  const statusLabels = {
    good: 'Excellent',
    neutral: 'Average',
    warning: 'Needs Improvement',
  };

  const statusColor = statusColors[status];

  return (
    <Box sx={{ mb: 3 }}>
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
        <Box sx={{ color: statusColor, display: 'flex' }}>{icon}</Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {label}
        </Typography>
      </Stack>

      <Box sx={{ pl: 5 }}>
        <Typography variant="h6" sx={{ mb: 0.5, color: statusColor }}>
          {value}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {explanation}
        </Typography>

        {progressValue !== undefined && (
          <Box sx={{ mb: 1 }}>
            <LinearProgress
              variant="determinate"
              value={progressValue}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'rgba(0,0,0,0.1)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: statusColor,
                  borderRadius: 4,
                },
              }}
            />
          </Box>
        )}

        <Stack direction="row" spacing={0.5} alignItems="center">
          <CheckCircleIcon sx={{ fontSize: 16, color: statusColor }} />
          <Typography variant="caption" sx={{ color: statusColor, fontWeight: 600 }}>
            {statusLabels[status]}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

/**
 * FSPSignalsPanel Component
 *
 * Main panel component that displays all FSP metrics for a verified school.
 * Shows "not available" message for unverified schools.
 *
 * @example
 * ```tsx
 * // With mock data
 * <FSPSignalsPanel
 *   schoolName="Elite Flight Academy"
 *   tier={TrustTier.PREMIER}
 * />
 *
 * // With custom signals
 * <FSPSignalsPanel
 *   schoolName="Custom Aviation"
 *   tier={TrustTier.VERIFIED_FSP}
 *   signals={customSignalsData}
 * />
 * ```
 */
export const FSPSignalsPanel: React.FC<FSPSignalsPanelProps> = ({
  schoolName,
  tier,
  signals,
}) => {
  // Use provided signals or get mock data for the tier
  const fspSignals = signals || getMockSignalsForTier(tier);
  const tierConfig = TRUST_TIER_CONFIG[tier];

  // If no signals available (unverified schools)
  if (!fspSignals) {
    return (
      <Card sx={{ maxWidth: 600, mx: 'auto' }}>
        <CardHeader
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {tierConfig.icon && <tierConfig.icon />}
              <span>{schoolName}</span>
            </Box>
          }
          subheader={`Trust Tier: ${tierConfig.label}`}
        />
        <CardContent>
          <Box
            sx={{
              textAlign: 'center',
              py: 4,
              px: 2,
              backgroundColor: 'rgba(0,0,0,0.03)',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              Verification Data Not Yet Available
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This school has not been verified and FSP performance metrics are not available.
              Check back later for updated information.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  // Determine status for each metric by comparing to industry benchmarks
  const getHoursToPPLStatus = (hours: number): 'good' | 'neutral' | 'warning' => {
    if (hours < INDUSTRY_BENCHMARKS.avgHoursToPPL - 3) return 'good';
    if (hours <= INDUSTRY_BENCHMARKS.avgHoursToPPL + 3) return 'neutral';
    return 'warning';
  };

  const getCancelRateStatus = (rate: number): 'good' | 'neutral' | 'warning' => {
    if (rate < INDUSTRY_BENCHMARKS.cancelRate - 2) return 'good';
    if (rate <= INDUSTRY_BENCHMARKS.cancelRate + 2) return 'neutral';
    return 'warning';
  };

  const getOnTimeRateStatus = (rate: number): 'good' | 'neutral' | 'warning' => {
    if (rate > 90) return 'good';
    if (rate >= 85) return 'neutral';
    return 'warning';
  };

  const getSatisfactionStatus = (rating: number): 'good' | 'neutral' | 'warning' => {
    if (rating >= 4.5) return 'good';
    if (rating >= 4.0) return 'neutral';
    return 'warning';
  };

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto' }}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {tierConfig.icon && <tierConfig.icon />}
            <span>{schoolName}</span>
          </Box>
        }
        subheader={`Trust Tier: ${tierConfig.label}`}
        sx={{
          backgroundColor: `${tierConfig.color}15`,
          borderBottom: `3px solid ${tierConfig.color}`,
        }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          The following metrics are objective performance indicators reported by the school and
          verified through our Flight School Partner program.
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* Average Hours to PPL */}
        <SignalMetric
          icon={<TimelineIcon />}
          label="Average Hours to PPL"
          value={`${fspSignals.avgHoursToPPL} hours`}
          explanation={`Industry average: ${INDUSTRY_BENCHMARKS.avgHoursToPPL} hours. Lower numbers indicate efficient training programs.`}
          status={getHoursToPPLStatus(fspSignals.avgHoursToPPL)}
          progressValue={Math.min(100, (fspSignals.avgHoursToPPL / 100) * 100)}
        />

        {/* Cancellation Rate */}
        <SignalMetric
          icon={<CancelIcon />}
          label="Cancellation Rate"
          value={`${fspSignals.cancelRate}%`}
          explanation={`Industry average: ${INDUSTRY_BENCHMARKS.cancelRate}%. Lower rates mean more reliable scheduling.`}
          status={getCancelRateStatus(fspSignals.cancelRate)}
          progressValue={100 - fspSignals.cancelRate}
        />

        {/* On-Time Rate */}
        <SignalMetric
          icon={<ScheduleIcon />}
          label="On-Time Rate"
          value={`${fspSignals.onTimeRate}%`}
          explanation={`Industry average: ${INDUSTRY_BENCHMARKS.onTimeRate}%. Higher rates reflect operational excellence.`}
          status={getOnTimeRateStatus(fspSignals.onTimeRate)}
          progressValue={fspSignals.onTimeRate}
        />

        {/* Student Satisfaction */}
        <SignalMetric
          icon={<StarIcon />}
          label="Student Satisfaction"
          value={`${fspSignals.studentSatisfaction.toFixed(1)}/5.0 stars`}
          explanation={`Industry average: ${INDUSTRY_BENCHMARKS.studentSatisfaction.toFixed(1)}/5.0. Based on verified student feedback.`}
          status={getSatisfactionStatus(fspSignals.studentSatisfaction)}
          progressValue={(fspSignals.studentSatisfaction / 5) * 100}
        />

        <Divider sx={{ mb: 2 }} />

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
          Data is updated monthly based on school-reported metrics and verified student reviews.
          Industry benchmarks are based on nationwide averages for Part 61 and Part 141 flight schools.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FSPSignalsPanel;
