/**
 * FinancingCalculatorPage
 *
 * Main page that orchestrates the financing calculator feature.
 * Combines LoanCalculator, VACalculator, and displays sorted lenders.
 */

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Alert,
} from '@mui/material';
import { Calculate } from '@mui/icons-material';
import LoanCalculator from '../components/financing/LoanCalculator';
import type { CalculationResults } from '../components/financing/LoanCalculator';
import VACalculator from '../components/financing/VACalculator';
import LenderCard from '../components/financing/LenderCard';
import { mockLenders } from '../mock/lenders';
import {
  getApplicableLenders,
  calculateMonthlyPayment,
  calculateTotalInterest,
  calculateTotalCost,
} from '../utils/loanCalculations';

export const FinancingCalculatorPage: React.FC = () => {
  const [calculationResults, setCalculationResults] =
    useState<CalculationResults | null>(null);

  const handleCalculate = (results: CalculationResults) => {
    setCalculationResults(results);
  };

  // Get sorted lenders with their rates and payments
  const getLenderDetails = () => {
    if (!calculationResults || !calculationResults.isValid) {
      return [];
    }

    const { principal, loanTermMonths, creditTier, trainingCost, vaBenefitAmount } =
      calculationResults;

    // Get lenders sorted by APR
    const sortedLenders = getApplicableLenders(mockLenders, creditTier);

    // Calculate payment details for each lender
    return sortedLenders.map((lender, index) => {
      const monthlyPayment = calculateMonthlyPayment(
        principal,
        lender.apr,
        loanTermMonths
      );
      const totalInterest = calculateTotalInterest(
        monthlyPayment,
        loanTermMonths,
        principal
      );
      const totalCost = calculateTotalCost(
        trainingCost,
        totalInterest,
        vaBenefitAmount
      );

      return {
        ...lender,
        monthlyPayment,
        totalCost,
        isLowestRate: index === 0, // First lender has lowest rate
      };
    });
  };

  const lenderDetails = getLenderDetails();

  // Calculate monthly savings for VA benefits display
  const calculateMonthlySavings = () => {
    if (
      !calculationResults ||
      !calculationResults.isValid ||
      calculationResults.vaCoveragePercentage === 0
    ) {
      return 0;
    }

    // Calculate payment without VA benefits
    const principalWithoutVA =
      calculationResults.trainingCost - calculationResults.downPayment;

    // Use mid-range APR for estimation
    const sampleAPR =
      calculationResults.creditTier === 'excellent'
        ? 4.5
        : calculationResults.creditTier === 'good'
          ? 6.5
          : 9.0;

    const paymentWithoutVA = calculateMonthlyPayment(
      principalWithoutVA,
      sampleAPR,
      calculationResults.loanTermMonths
    );

    const paymentWithVA = calculateMonthlyPayment(
      calculationResults.principal,
      sampleAPR,
      calculationResults.loanTermMonths
    );

    return paymentWithoutVA - paymentWithVA;
  };

  const monthlySavings = calculateMonthlySavings();

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Calculate sx={{ fontSize: 48, mr: 2 }} />
            <Box>
              <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 0 }}>
                Financing Calculator
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Estimate your monthly payments for flight training
              </Typography>
            </Box>
          </Box>
          <Typography variant="body1" sx={{ mt: 2, opacity: 0.95 }}>
            Use this calculator to explore financing options and compare lenders.
            Adjust the parameters to see real-time estimates of your monthly
            payments, total costs, and available VA benefits.
          </Typography>
        </Paper>

        {/* Demo Notice */}
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>Demo Mode:</strong> This calculator uses mock lender data for
            demonstration purposes. For actual financing, please contact lenders
            directly.
          </Typography>
        </Alert>

        {/* Main Calculator */}
        <LoanCalculator onCalculate={handleCalculate} />

        {/* VA Benefits Calculator */}
        {calculationResults &&
          calculationResults.vaCoveragePercentage > 0 &&
          calculationResults.isValid && (
            <VACalculator
              trainingCost={calculationResults.trainingCost}
              vaCoveragePercentage={calculationResults.vaCoveragePercentage}
              vaBenefitAmount={calculationResults.vaBenefitAmount}
              userResponsibility={
                calculationResults.trainingCost -
                calculationResults.vaBenefitAmount
              }
              monthlySavings={monthlySavings}
            />
          )}

        {/* Lenders Section */}
        {lenderDetails.length > 0 && (
          <>
            <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4, mb: 2 }}>
              Compare Lenders
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Here are {lenderDetails.length} lenders sorted by APR (lowest to
              highest). Monthly payments and total costs are calculated based on
              your inputs above.
            </Typography>

            <Box sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
              gap: 3
            }}>
              {lenderDetails.map((lender) => (
                <Box key={lender.id}>
                  <LenderCard
                    lender={lender}
                    apr={lender.apr}
                    monthlyPayment={lender.monthlyPayment}
                    totalCost={lender.totalCost}
                    isLowestRate={lender.isLowestRate}
                  />
                </Box>
              ))}
            </Box>
          </>
        )}

        {/* Show message when inputs are invalid */}
        {calculationResults && !calculationResults.isValid && (
          <Alert severity="warning" sx={{ mt: 3 }}>
            <Typography variant="body2">
              Please correct the errors in the calculator above to see lender
              options.
            </Typography>
          </Alert>
        )}

        {/* Footer Information */}
        <Paper sx={{ p: 3, mt: 4, bgcolor: 'grey.100' }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <strong>Important Information:</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            All calculations are estimates only and are based on the amortized loan
            formula. Actual loan terms, rates, fees, and monthly payments may vary
            based on your credit history, income, debt-to-income ratio, and lender
            policies.
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            APR ranges shown are based on your selected credit tier. Individual
            lenders may offer different rates based on their underwriting criteria.
            Some lenders may charge origination fees, application fees, or other
            costs not reflected in these estimates.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            VA benefits calculations are estimates based on typical coverage
            percentages. Actual VA benefits depend on your eligibility status,
            program approval, and benefit cap. Please consult with a VA
            representative for exact benefit amounts.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default FinancingCalculatorPage;
