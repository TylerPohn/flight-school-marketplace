import { useState } from 'react';
import type { MatchProfile, RankedSchool } from '../types/matchProfile';
import { rankSchools } from '../utils/mockAIMatching';
import { MOCK_SCHOOLS } from '../mock/mockSchools';

export function useMatchingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<MatchProfile>>({});
  const [results, setResults] = useState<RankedSchool[] | null>(null);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const updateFormData = (data: Partial<MatchProfile>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const submitQuestionnaire = (finalData: MatchProfile) => {
    // Update form data with final step
    setFormData(finalData);

    // Calculate rankings
    const rankedResults = rankSchools(finalData, MOCK_SCHOOLS);

    // Store results
    setResults(rankedResults);

    return rankedResults;
  };

  const reset = () => {
    setCurrentStep(0);
    setFormData({});
    setResults(null);
  };

  return {
    currentStep,
    formData,
    results,
    nextStep,
    prevStep,
    updateFormData,
    submitQuestionnaire,
    reset,
  };
}
