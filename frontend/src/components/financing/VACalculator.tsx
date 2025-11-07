/**
 * VACalculator Component
 *
 * Displays VA benefits information and savings calculations.
 * Shows the breakdown of original cost vs. user responsibility after VA coverage.
 */

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Alert,
} from '@mui/material';
import { MilitaryTech } from '@mui/icons-material';
import { formatCurrency } from '../../utils/loanCalculations';

interface VACalculatorProps {
  trainingCost: number;
  vaCoveragePercentage: number;
  vaBenefitAmount: number;
  userResponsibility: number;
  monthlySavings?: number;
}

export const VACalculator: React.FC<VACalculatorProps> = ({
  trainingCost,
  vaCoveragePercentage,
  vaBenefitAmount,
  userResponsibility,
  monthlySavings,
}) => {
  // Don't display if no VA benefits
  if (vaCoveragePercentage === 0) {
    return null;
  }

  return (
    <Card sx={{ mb: 3, border: 1, borderColor: 'info.main' }}>
      <CardContent>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <MilitaryTech sx={{ fontSize: 40, color: 'info.main', mr: 2 }} />
          <Box>
            <Typography variant="h6" component="h3">
              VA Benefits Calculator
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your estimated VA benefit coverage
            </Typography>
          </Box>
        </Box>

        <Alert severity="info" sx={{ mb: 2 }}>
          You are eligible for {vaCoveragePercentage}% VA coverage
        </Alert>

        {/* Cost Breakdown */}
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 1.5,
            }}
          >
            <Typography variant="body1" color="text.secondary">
              Original Training Cost:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {formatCurrency(trainingCost)}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 1.5,
            }}
          >
            <Typography variant="body1" color="success.main">
              VA Coverage ({vaCoveragePercentage}%):
            </Typography>
            <Typography
              variant="body1"
              color="success.main"
              sx={{ fontWeight: 'bold' }}
            >
              - {formatCurrency(vaBenefitAmount)}
            </Typography>
          </Box>

          <Divider sx={{ my: 1.5 }} />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              bgcolor: 'info.lighter',
              p: 2,
              borderRadius: 1,
            }}
          >
            <Typography variant="h6" color="primary">
              Your Responsibility:
            </Typography>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
              {formatCurrency(userResponsibility)}
            </Typography>
          </Box>
        </Box>

        {/* Monthly Savings Display (if provided) */}
        {monthlySavings !== undefined && monthlySavings > 0 && (
          <Alert severity="success" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Estimated Monthly Savings:</strong>{' '}
              {formatCurrency(monthlySavings)}
            </Typography>
            <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
              Compared to financing the full amount without VA benefits
            </Typography>
          </Alert>
        )}

        {/* Information Note */}
        <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
          Note: This is an estimate only. Actual VA benefits may vary based on
          eligibility, program approval, and other factors. Please consult with a
          VA representative for exact benefit amounts.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VACalculator;
