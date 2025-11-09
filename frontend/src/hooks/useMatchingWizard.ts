import { useState } from 'react';
import type { MatchProfile, RankedSchool, MockSchool } from '../types/matchProfile';
import { rankSchoolsWithAI } from '../utils/mockAIMatching';
import { MOCK_SCHOOLS } from '../mock/mockSchools';
import { getAllSchools } from '../services/schoolsApi';
import type { DetailedSchool } from '../mock/detailedSchools';

/**
 * Convert DetailedSchool from DynamoDB to MockSchool format for matching algorithm
 */
function convertToMockSchool(detailedSchool: DetailedSchool): MockSchool {
  // Extract primary program from programs array (first one) or default to PPL
  const primaryProgram = (detailedSchool.programs[0] as any) || 'PPL';

  // Get location coordinates
  const lat = detailedSchool.location.coordinates?.lat || 0;
  const lng = detailedSchool.location.coordinates?.lng || 0;

  // Determine if school has specific features (we don't have this data yet, so default to false)
  const hasFinancing = false; // TODO: Add to DynamoDB schema
  const hasHousing = false; // TODO: Add to DynamoDB schema

  // Calculate average hours to PPL from PPL program details
  const pplProgram = detailedSchool.programDetails?.find(p => p.certification === 'PPL');
  const averageHoursToPPL = pplProgram?.durationHours || 60;

  // Get fleet types and calculate total fleet size
  const fleetTypes = detailedSchool.fleetDetails?.map(f => f.aircraftType) || [];
  const fleetSize = detailedSchool.fleetDetails?.reduce((sum, f) => sum + f.count, 0) || 0;
  const fleetDetails = detailedSchool.fleetDetails?.map(f => ({
    aircraftType: f.aircraftType,
    count: f.count,
    availability: f.availability,
  }));

  // Map training type
  const trainingType = detailedSchool.trainingType === 'Both' ? 'No Preference' as any : detailedSchool.trainingType;

  // TODO: Infer intensity level and preferences from school data
  // For now, default to reasonable values
  const intensityLevel = 'Flexible' as any;
  const preferences: string[] = [];

  return {
    id: detailedSchool.schoolId,
    name: detailedSchool.name,
    location: {
      city: detailedSchool.location.city,
      state: detailedSchool.location.state,
      lat,
      lon: lng,
    },
    programs: detailedSchool.programs as any[],
    primaryProgram,
    costBand: detailedSchool.costBand,
    trainingType,
    intensityLevel,
    hasFinancing,
    hasHousing,
    fleetTypes,
    fleetSize,
    fleetDetails,
    instructorCount: detailedSchool.instructorCount || 0,
    averageHoursToPPL,
    trustTier: detailedSchool.trustTier as any,
    preferences,
    // Quality metrics for improved scoring
    avgRating: detailedSchool.avgRating,
    reviewCount: detailedSchool.reviewCount,
    yearsInOperation: detailedSchool.yearsInOperation,
    fspSignals: detailedSchool.verificationDetails?.fspSignals,
  };
}

export function useMatchingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<MatchProfile>>({});
  const [results, setResults] = useState<RankedSchool[] | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    setError(null);

    try {
      // Fetch schools from DynamoDB
      let schools: MockSchool[];
      try {
        const detailedSchools = await getAllSchools();
        if (detailedSchools.length > 0) {
          schools = detailedSchools.map(convertToMockSchool);
          console.log(`Loaded ${schools.length} schools from DynamoDB`);
        } else {
          console.warn('No schools returned from API, using mock schools');
          schools = MOCK_SCHOOLS;
        }
      } catch (apiError) {
        console.error('Failed to fetch schools from API, falling back to mock schools:', apiError);
        schools = MOCK_SCHOOLS;
        setError('Using sample schools - unable to load full school database');
      }

      // Calculate rankings with AI explanations for top 5
      const rankedResults = await rankSchoolsWithAI(finalData, schools);

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
    error,
    nextStep,
    prevStep,
    updateFormData,
    submitQuestionnaire,
    reset,
  };
}
