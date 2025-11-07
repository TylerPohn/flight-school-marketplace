import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  stepOneSchema,
  stepTwoSchema,
  stepThreeSchema,
  stepFourSchema,
  type StepOneFormData,
  type StepTwoFormData,
  type StepThreeFormData,
  type StepFourFormData,
} from '../schemas/matchingSchema';
import type { MatchProfile } from '../types/matchProfile';
import { useMatchingWizard } from '../hooks/useMatchingWizard';
import { StepOne } from '../components/matching/StepOne';
import { StepTwo } from '../components/matching/StepTwo';
import { StepThree } from '../components/matching/StepThree';
import { StepFour } from '../components/matching/StepFour';
import { MatchResults } from '../components/matching/MatchResults';

const steps = [
  { label: 'Goals', icon: '🎯' },
  { label: 'Budget', icon: '💰' },
  { label: 'Location', icon: '📍' },
  { label: 'Preferences', icon: '⭐' },
];

export function AIMatchingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentStep, formData, results, nextStep, prevStep, updateFormData, submitQuestionnaire, reset } = useMatchingWizard();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if we're on the results page
  const showResults = location.pathname.includes('/results') && results;

  // Initialize forms for each step
  const stepOneForm = useForm<StepOneFormData>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      trainingGoal: formData.trainingGoal || undefined,
      trainingTypePreference: formData.trainingTypePreference || undefined,
      aircraftPreference: formData.aircraftPreference || '',
    },
  });

  const stepTwoForm = useForm<StepTwoFormData>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      maxBudget: formData.maxBudget || 30000,
      financingInterest: formData.financingInterest || false,
      militaryBenefits: formData.militaryBenefits || undefined,
    },
  });

  const stepThreeForm = useForm<StepThreeFormData>({
    resolver: zodResolver(stepThreeSchema),
    defaultValues: {
      location: formData.location || { city: '', state: '' },
      searchRadius: formData.searchRadius || 50,
      housingNeeded: formData.housingNeeded || false,
    },
  });

  const stepFourForm = useForm<StepFourFormData>({
    resolver: zodResolver(stepFourSchema),
    defaultValues: {
      intensityPreference: formData.intensityPreference || undefined,
      preferences: formData.preferences || [],
      priorExperience: formData.priorExperience || undefined,
    },
  });

  const handleNext = async () => {
    let isValid = false;
    let stepData: Partial<MatchProfile> = {};

    // Validate current step
    switch (currentStep) {
      case 0:
        isValid = await stepOneForm.trigger();
        if (isValid) {
          stepData = stepOneForm.getValues();
        }
        break;
      case 1:
        isValid = await stepTwoForm.trigger();
        if (isValid) {
          stepData = stepTwoForm.getValues();
        }
        break;
      case 2:
        isValid = await stepThreeForm.trigger();
        if (isValid) {
          stepData = stepThreeForm.getValues();
        }
        break;
      case 3:
        isValid = await stepFourForm.trigger();
        if (isValid) {
          stepData = stepFourForm.getValues();
        }
        break;
    }

    if (isValid) {
      updateFormData(stepData);
      nextStep();
    }
  };

  const handleBack = () => {
    prevStep();
  };

  const handleSubmit = async () => {
    const isValid = await stepFourForm.trigger();
    if (!isValid) return;

    setIsSubmitting(true);

    // Combine all form data
    const finalData: MatchProfile = {
      ...formData,
      ...stepOneForm.getValues(),
      ...stepTwoForm.getValues(),
      ...stepThreeForm.getValues(),
      ...stepFourForm.getValues(),
    } as MatchProfile;

    // Submit questionnaire
    submitQuestionnaire(finalData);

    // Navigate to results page
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/find-my-school/results');
    }, 500);
  };

  const handleRefine = () => {
    navigate('/find-my-school');
    reset();
  };

  // Show results if available
  if (showResults && results) {
    return <MatchResults results={results} onRefine={handleRefine} />;
  }

  // Get current form
  const getCurrentForm = () => {
    switch (currentStep) {
      case 0:
        return <StepOne form={stepOneForm} />;
      case 1:
        return <StepTwo form={stepTwoForm} />;
      case 2:
        return <StepThree form={stepThreeForm} />;
      case 3:
        return <StepFour form={stepFourForm} />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Find Your Perfect Flight School
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Answer a few questions and we'll match you with the best schools for your goals
        </Typography>
      </Box>

      {/* Stepper */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Stepper activeStep={currentStep} alternativeLabel>
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="h6">{step.icon}</Typography>
                  <Typography variant="caption">{step.label}</Typography>
                </Box>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Progress */}
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Step {currentStep + 1} of {steps.length}
          </Typography>
        </Box>
      </Paper>

      {/* Form Content */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        {getCurrentForm()}
      </Paper>

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          onClick={handleBack}
          disabled={currentStep === 0}
          size="large"
        >
          Back
        </Button>

        {currentStep < steps.length - 1 ? (
          <Button
            variant="contained"
            onClick={handleNext}
            size="large"
          >
            Next
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isSubmitting}
            size="large"
          >
            {isSubmitting ? 'Finding Matches...' : 'Submit Questionnaire'}
          </Button>
        )}
      </Box>
    </Container>
  );
}
