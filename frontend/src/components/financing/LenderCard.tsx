/**
 * LenderCard Component
 *
 * Displays a single lender option with APR, monthly payment, and features.
 * Shows "Apply Now" button that links to the lender's application page.
 */

import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Avatar,
} from '@mui/material';
import { AccountBalance, Star } from '@mui/icons-material';
import type { Lender } from '../../mock/lenders';
import { formatCurrency } from '../../utils/loanCalculations';

interface LenderCardProps {
  lender: Lender;
  apr: number;
  monthlyPayment: number;
  totalCost: number;
  isLowestRate?: boolean;
}

export const LenderCard: React.FC<LenderCardProps> = ({
  lender,
  apr,
  monthlyPayment,
  totalCost,
  isLowestRate = false,
}) => {
  const handleApplyClick = () => {
    window.open(lender.applyUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: isLowestRate ? 2 : 1,
        borderColor: isLowestRate ? 'success.main' : 'divider',
        position: 'relative',
      }}
    >
      {isLowestRate && (
        <Chip
          icon={<Star />}
          label="Best Rate"
          color="success"
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            fontWeight: 'bold',
          }}
        />
      )}

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        {/* Lender Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            sx={{
              bgcolor: isLowestRate ? 'success.light' : 'primary.light',
              mr: 2,
            }}
          >
            <AccountBalance />
          </Avatar>
          <Box>
            <Typography variant="h6" component="h3" gutterBottom sx={{ mb: 0 }}>
              {lender.name}
            </Typography>
          </Box>
        </Box>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, minHeight: '40px' }}
        >
          {lender.description}
        </Typography>

        {/* APR Display */}
        <Box sx={{ mb: 2, bgcolor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', p: 2, borderRadius: 1 }}>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 500 }}>
            Annual Percentage Rate
          </Typography>
          <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
            {apr.toFixed(2)}%
          </Typography>
        </Box>

        {/* Payment Details */}
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Monthly Payment:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {formatCurrency(monthlyPayment)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Total Cost:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {formatCurrency(totalCost)}
            </Typography>
          </Box>
        </Box>

        {/* Features */}
        <Box sx={{ mb: 1 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 1, fontWeight: 'bold' }}
          >
            Features:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {lender.features.map((feature, index) => (
              <Chip
                key={index}
                label={feature}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.75rem' }}
              />
            ))}
          </Box>
        </Box>
      </CardContent>

      {/* Actions */}
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          variant={isLowestRate ? 'contained' : 'outlined'}
          color={isLowestRate ? 'success' : 'primary'}
          fullWidth
          onClick={handleApplyClick}
          sx={{ py: 1.5, fontWeight: 'bold' }}
        >
          Apply Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default LenderCard;
