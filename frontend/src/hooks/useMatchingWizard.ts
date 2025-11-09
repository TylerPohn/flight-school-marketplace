import { useState } from 'react';
import type { MatchProfile, RankedSchool } from '../types/matchProfile';
import { rankSchoolsWithAI } from '../utils/mockAIMatching';
import { MOCK_SCHOOLS } from '../mock/mockSchools';

export function useMatchingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<MatchProfile>>({});
  const [results, setResults] = useState<RankedSchool[] | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const updateFormData = (data: Partial<MatchProfile>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const submitQuestionnaire = async (finalData: MatchProfile) => {
    // Update form data with final step
    setFormData(finalData);

    setIsLoadingAI(true);

    try {
      // Calculate rankings with AI explanations for top 5
      const rankedResults = await rankSchoolsWithAI(finalData, MOCK_SCHOOLS);

      // Store results
      setResults(rankedResults);

      return rankedResults;
    } finally {
      setIsLoadingAI(false);
    }
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
    isLoadingAI,
    nextStep,
    prevStep,
    updateFormData,
    submitQuestionnaire,
    reset,
  };
}
