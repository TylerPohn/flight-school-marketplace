/**
 * LoanCalculator Component
 *
 * Main calculator form with inputs for training cost, down payment, loan term,
 * credit tier, and VA benefits. Displays real-time calculation results with
 * visual breakdown using a pie chart.
 */

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Box,
  InputAdornment,
  Alert,
  Button,
  Divider,
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import {
  calculateMonthlyPayment,
  calculateTotalInterest,
  calculateVABenefit,
  validateInputs,
  formatCurrency,
  formatLoanTerm,
} from '../../utils/loanCalculations';
import { creditTiers, vaBenefits } from '../../mock/lenders';

interface LoanCalculatorProps {
  onCalculate: (results: CalculationResults) => void;
}

export interface CalculationResults {
  trainingCost: number;
  downPayment: number;
  loanTermMonths: number;
  creditTier: 'excellent' | 'good' | 'fair';
  vaCoveragePercentage: number;
  vaBenefitAmount: number;
  principal: number;
  isValid: boolean;
}

export const LoanCalculator: React.FC<LoanCalculatorProps> = ({
  onCalculate,
}) => {
  // Form state
  const [trainingCost, setTrainingCost] = useState<number>(50000);
  const [downPayment, setDownPayment] = useState<number>(10000);
  const [loanTermMonths, setLoanTermMonths] = useState<number>(60);
  const [creditTier, setCreditTier] = useState<'excellent' | 'good' | 'fair'>(
    'good'
  );
  const [vaBenefitId, setVaBenefitId] = useState<string>('none');

  // Validation errors
  const [errors, setErrors] = useState<string[]>([]);

  // Calculate VA benefit
  const selectedVABenefit = vaBenefits.find((b) => b.id === vaBenefitId);
  const vaCoveragePercentage = selectedVABenefit?.coveragePercentage || 0;
  const vaBenefitAmount = calculateVABenefit(trainingCost, vaCoveragePercentage);

  // Calculate effective training cost after VA benefits
  const effectiveTrainingCost = trainingCost - vaBenefitAmount;

  // Calculate principal (amount to finance)
  const principal = Math.max(0, effectiveTrainingCost - downPayment);

  // Validate inputs
  const validation = validateInputs(trainingCost, downPayment, loanTermMonths);

  // Update parent component whenever inputs change
  useEffect(() => {
    const results: CalculationResults = {
      trainingCost,
      downPayment,
      loanTermMonths,
      creditTier,
      vaCoveragePercentage,
      vaBenefitAmount,
      principal,
      isValid: validation.isValid,
    };
    onCalculate(results);
    setErrors(validation.errors);
  }, [
    trainingCost,
    downPayment,
    loanTermMonths,
    creditTier,
    vaCoveragePercentage,
    vaBenefitAmount,
    principal,
  ]);

  // Calculate sample payment for display (using mid-range APR)
  const sampleAPR = creditTier === 'excellent' ? 4.5 : creditTier === 'good' ? 6.5 : 9.0;
  const monthlyPayment = calculateMonthlyPayment(principal, sampleAPR, loanTermMonths);
  const totalInterest = calculateTotalInterest(monthlyPayment, loanTermMonths, principal);
  const totalCost = effectiveTrainingCost + totalInterest;

  // Prepare data for pie chart
  const chartData = [
    { name: 'Down Payment', value: downPayment, color: '#4caf50' },
    { name: 'Principal', value: principal, color: '#2196f3' },
    { name: 'Interest', value: totalInterest, color: '#ff9800' },
  ];

  // Filter out zero values for chart
  const filteredChartData = chartData.filter((item) => item.value > 0);

  // Preset buttons for down payment
  const handleDownPaymentPreset = (percentage: number) => {
    const presetAmount = Math.round((effectiveTrainingCost * percentage) / 100);
    setDownPayment(Math.min(presetAmount, effectiveTrainingCost));
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Loan Calculator
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Adjust the parameters below to estimate your monthly payment
        </Typography>

        {/* Display validation errors */}
        {errors.length > 0 && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errors.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          {/* Left Column - Inputs */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Training Cost */}
            <TextField
              fullWidth
              label="Training Cost"
              type="number"
              value={trainingCost}
              onChange={(e) => setTrainingCost(Number(e.target.value))}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              helperText="Range: $10,000 - $250,000"
              sx={{ mb: 3 }}
            />

            {/* VA Benefits */}
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>VA Benefits Eligibility</InputLabel>
              <Select
                value={vaBenefitId}
                label="VA Benefits Eligibility"
                onChange={(e) => setVaBenefitId(e.target.value)}
              >
                {vaBenefits.map((benefit) => (
                  <MenuItem key={benefit.id} value={benefit.id}>
                    {benefit.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Down Payment */}
            <TextField
              fullWidth
              label="Down Payment"
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              helperText={`Max: ${formatCurrency(effectiveTrainingCost)}`}
              sx={{ mb: 2 }}
            />

            {/* Down Payment Presets */}
            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleDownPaymentPreset(0)}
              >
                0%
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleDownPaymentPreset(10)}
              >
                10%
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleDownPaymentPreset(20)}
              >
                20%
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleDownPaymentPreset(25)}
              >
                25%
              </Button>
            </Box>

            {/* Credit Tier */}
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Credit Tier</InputLabel>
              <Select
                value={creditTier}
                label="Credit Tier"
                onChange={(e) =>
                  setCreditTier(e.target.value as 'excellent' | 'good' | 'fair')
                }
              >
                {creditTiers.map((tier) => (
                  <MenuItem key={tier.id} value={tier.id}>
                    {tier.label} ({tier.scoreRange}) - {tier.description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Loan Term Slider */}
            <Box sx={{ mb: 2 }}>
              <Typography gutterBottom>
                Loan Term: {formatLoanTerm(loanTermMonths)}
              </Typography>
              <Slider
                value={loanTermMonths}
                onChange={(_, value) => setLoanTermMonths(value as number)}
                min={12}
                max={180}
                step={6}
                marks={[
                  { value: 12, label: '1yr' },
                  { value: 36, label: '3yr' },
                  { value: 60, label: '5yr' },
                  { value: 84, label: '7yr' },
                  { value: 120, label: '10yr' },
                  { value: 180, label: '15yr' },
                ]}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value} mo`}
              />
            </Box>
          </Box>

          {/* Right Column - Results */}
          <Box sx={{ flex: 1 }}>
            <Card variant="outlined" sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Estimated Results
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                  Based on approximate {sampleAPR}% APR
                </Typography>

                <Divider sx={{ my: 2 }} />

                {/* Key Metrics */}
                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1.5,
                    }}
                  >
                    <Typography variant="body2">Financed Amount:</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {formatCurrency(principal)}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1.5,
                    }}
                  >
                    <Typography variant="body2">Monthly Payment:</Typography>
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{ fontWeight: 'bold' }}
                    >
                      {formatCurrency(monthlyPayment)}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1.5,
                    }}
                  >
                    <Typography variant="body2">Total Interest:</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {formatCurrency(totalInterest)}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1.5,
                    }}
                  >
                    <Typography variant="body2">Total Cost:</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {formatCurrency(totalCost)}
                    </Typography>
                  </Box>
                </Box>

                {/* Pie Chart */}
                {filteredChartData.length > 0 && validation.isValid && (
                  <Box sx={{ mt: 3, height: 250 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={filteredChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={(entry: { name: string; percent?: number }) =>
                            `${entry.name}: ${((entry.percent || 0) * 100).toFixed(0)}%`
                          }
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {filteredChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value: number) => formatCurrency(value)}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LoanCalculator;
