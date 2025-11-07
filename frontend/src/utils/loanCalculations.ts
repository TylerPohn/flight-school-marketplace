/**
 * Loan Calculation Utilities
 *
 * This file contains utility functions for calculating loan payments,
 * interest, and total costs for flight training financing.
 */

import type { Lender } from '../mock/lenders';

/**
 * Calculate monthly payment using the standard amortized loan formula
 *
 * Formula: Monthly Payment = P × r × (1 + r)^n / ((1 + r)^n - 1)
 *
 * @param principal - Loan amount (Training Cost - Down Payment)
 * @param apr - Annual Percentage Rate (e.g., 7.5 for 7.5%)
 * @param months - Number of monthly payments (loan term)
 * @returns Monthly payment amount rounded to 2 decimal places
 */
export function calculateMonthlyPayment(
  principal: number,
  apr: number,
  months: number
): number {
  // Handle edge cases
  if (principal <= 0) return 0;
  if (apr === 0) return principal / months;
  if (months <= 0) return 0;

  // Convert APR to monthly rate (decimal)
  const monthlyRate = apr / 100 / 12;

  // Calculate (1 + r)^n
  const onePlusRPowerN = Math.pow(1 + monthlyRate, months);

  // Apply formula: P × r × (1+r)^n / ((1+r)^n - 1)
  const monthlyPayment =
    (principal * monthlyRate * onePlusRPowerN) / (onePlusRPowerN - 1);

  // Round to 2 decimal places
  return Math.round(monthlyPayment * 100) / 100;
}

/**
 * Calculate total interest paid over the life of the loan
 *
 * @param monthlyPayment - Monthly payment amount
 * @param months - Number of monthly payments
 * @param principal - Original loan amount
 * @returns Total interest paid rounded to 2 decimal places
 */
export function calculateTotalInterest(
  monthlyPayment: number,
  months: number,
  principal: number
): number {
  const totalPaid = monthlyPayment * months;
  const totalInterest = totalPaid - principal;

  // Round to 2 decimal places
  return Math.round(totalInterest * 100) / 100;
}

/**
 * Calculate total cost including training cost, interest, and VA benefits
 *
 * @param trainingCost - Original training cost
 * @param totalInterest - Total interest paid
 * @param vaBenefitAmount - Amount covered by VA benefits
 * @returns Total cost to user rounded to 2 decimal places
 */
export function calculateTotalCost(
  trainingCost: number,
  totalInterest: number,
  vaBenefitAmount: number
): number {
  const totalCost = trainingCost + totalInterest - vaBenefitAmount;

  // Round to 2 decimal places
  return Math.round(totalCost * 100) / 100;
}

/**
 * Get the APR for a lender based on credit tier
 * Returns the middle of the rate range for the specified tier
 *
 * @param lender - Lender object
 * @param creditTier - Credit tier ('excellent', 'good', or 'fair')
 * @returns APR (middle of range)
 */
export function getAPRForLender(
  lender: Lender,
  creditTier: 'excellent' | 'good' | 'fair'
): number {
  const rates = lender.ratesByTier[creditTier];

  // Return middle of the range
  const middleRate = (rates.min + rates.max) / 2;

  // Round to 2 decimal places
  return Math.round(middleRate * 100) / 100;
}

/**
 * Get applicable lenders sorted by APR (lowest first)
 *
 * @param lenders - Array of all lenders
 * @param creditTier - Credit tier to filter by
 * @returns Sorted array of lenders with their APR
 */
export function getApplicableLenders(
  lenders: Lender[],
  creditTier: 'excellent' | 'good' | 'fair'
): Array<Lender & { apr: number }> {
  // Map lenders to include their APR for the given credit tier
  const lendersWithAPR = lenders.map((lender) => ({
    ...lender,
    apr: getAPRForLender(lender, creditTier),
  }));

  // Sort by APR (ascending - lowest first)
  return lendersWithAPR.sort((a, b) => a.apr - b.apr);
}

/**
 * Validate loan calculator inputs
 *
 * @param trainingCost - Training cost
 * @param downPayment - Down payment amount
 * @param loanTermMonths - Loan term in months
 * @returns Object with validation status and error messages
 */
export function validateInputs(
  trainingCost: number,
  downPayment: number,
  loanTermMonths: number
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validate training cost
  if (trainingCost <= 0) {
    errors.push('Training cost must be greater than $0');
  }
  if (trainingCost < 10000 || trainingCost > 250000) {
    errors.push('Training cost must be between $10,000 and $250,000');
  }

  // Validate down payment
  if (downPayment < 0) {
    errors.push('Down payment cannot be negative');
  }
  if (downPayment > trainingCost) {
    errors.push('Down payment cannot exceed training cost');
  }

  // Validate loan term
  if (loanTermMonths < 12 || loanTermMonths > 180) {
    errors.push('Loan term must be between 12 and 180 months (1-15 years)');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Calculate VA benefit amount based on percentage
 *
 * @param trainingCost - Original training cost
 * @param coveragePercentage - VA coverage percentage (0-100)
 * @returns VA benefit amount rounded to 2 decimal places
 */
export function calculateVABenefit(
  trainingCost: number,
  coveragePercentage: number
): number {
  const benefitAmount = trainingCost * (coveragePercentage / 100);

  // Round to 2 decimal places
  return Math.round(benefitAmount * 100) / 100;
}

/**
 * Format currency for display
 *
 * @param amount - Amount to format
 * @returns Formatted currency string (e.g., "$1,234.56")
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Convert months to years and months display
 *
 * @param months - Number of months
 * @returns Formatted string (e.g., "5 years" or "2 years, 6 months")
 */
export function formatLoanTerm(months: number): string {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${months} months`;
  } else if (remainingMonths === 0) {
    return years === 1 ? '1 year' : `${years} years`;
  } else {
    return `${years} ${years === 1 ? 'year' : 'years'}, ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
  }
}
