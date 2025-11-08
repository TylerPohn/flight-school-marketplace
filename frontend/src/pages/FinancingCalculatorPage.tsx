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
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e2a27 0%, #253831 50%, #2d423a 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 15% 30%, rgba(76, 175, 80, 0.08) 0%, transparent 50%), radial-gradient(circle at 85% 70%, rgba(46, 125, 50, 0.08) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4, md: 5 }, pb: { xs: 12, sm: 14, md: 16 }, position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box
          sx={{
            mb: 4,
            textAlign: 'center',
            animation: 'fadeInDown 0.8s ease-out',
            '@keyframes fadeInDown': {
              '0%': { opacity: 0, transform: 'translateY(-30px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
              p: 2,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              animation: 'float 3s ease-in-out infinite',
              '@keyframes float': {
                '0%, 100%': { transform: 'translateY(0px)' },
                '50%': { transform: 'translateY(-10px)' },
              },
            }}
          >
            <Calculate
              sx={{
                fontSize: { xs: 40, sm: 48, md: 56 },
                color: '#fff',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
              }}
            />
          </Box>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #fff 0%, #e8f5e9 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              textShadow: '0 0 30px rgba(232, 245, 233, 0.2)',
              letterSpacing: '-0.5px',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            Financing Calculator
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.85)',
              fontSize: { xs: '1rem', sm: '1.1rem' },
              maxWidth: '700px',
              mx: 'auto',
              px: { xs: 2, sm: 0 },
              mb: 2,
            }}
          >
            Estimate your monthly payments for flight training
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: { xs: '0.9rem', sm: '0.95rem' },
              maxWidth: '800px',
              mx: 'auto',
              px: { xs: 2, sm: 0 },
            }}
          >
            Use this calculator to explore financing options and compare lenders. Adjust the parameters to see real-time estimates of your monthly payments, total costs, and available VA benefits.
          </Typography>
        </Box>

        {/* Main Calculator */}
        <Box
          sx={{
            animation: 'fadeInUp 0.8s ease-out 0.4s both',
          }}
        >
          <LoanCalculator onCalculate={handleCalculate} />
        </Box>

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
          <Box
            sx={{
              animation: 'fadeInUp 0.8s ease-out 0.6s both',
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{
                mt: 4,
                mb: 2,
                color: '#fff',
                fontWeight: 700,
              }}
            >
              Compare Lenders
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mb: 3,
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              Here are {lenderDetails.length} lenders sorted by APR (lowest to
              highest). Monthly payments and total costs are calculated based on
              your inputs above.
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
                gap: { xs: 2, sm: 2.5, md: 3 },
              }}
            >
              {lenderDetails.map((lender, index) => (
                <Box
                  key={lender.id}
                  sx={{
                    animation: `fadeInScale 0.5s ease-out ${0.1 * index}s both`,
                    '@keyframes fadeInScale': {
                      '0%': { opacity: 0, transform: 'scale(0.95)' },
                      '100%': { opacity: 1, transform: 'scale(1)' },
                    },
                  }}
                >
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
          </Box>
        )}

        {/* Show message when inputs are invalid */}
        {calculationResults && !calculationResults.isValid && (
          <Alert
            severity="warning"
            sx={{
              mt: 3,
              background: 'rgba(255, 152, 0, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 152, 0, 0.3)',
              color: '#fff',
              '& .MuiAlert-icon': {
                color: '#ffb74d',
              },
            }}
          >
            <Typography variant="body2">
              Please correct the errors in the calculator above to see lender
              options.
            </Typography>
          </Alert>
        )}

        {/* Footer Information */}
        <Paper
          sx={{
            p: { xs: 2.5, sm: 3 },
            mt: 4,
            background: 'rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: { xs: '12px', sm: '16px' },
          }}
        >
          <Typography
            variant="body2"
            gutterBottom
            sx={{
              color: '#c8e6c9',
              fontWeight: 700,
            }}
          >
            Important Information:
          </Typography>
          <Typography
            variant="body2"
            paragraph
            sx={{ color: 'rgba(255, 255, 255, 0.75)' }}
          >
            All calculations are estimates only and are based on the amortized loan
            formula. Actual loan terms, rates, fees, and monthly payments may vary
            based on your credit history, income, debt-to-income ratio, and lender
            policies.
          </Typography>
          <Typography
            variant="body2"
            paragraph
            sx={{ color: 'rgba(255, 255, 255, 0.75)' }}
          >
            APR ranges shown are based on your selected credit tier. Individual
            lenders may offer different rates based on their underwriting criteria.
            Some lenders may charge origination fees, application fees, or other
            costs not reflected in these estimates.
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'rgba(255, 255, 255, 0.75)', mb: 0 }}
          >
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
