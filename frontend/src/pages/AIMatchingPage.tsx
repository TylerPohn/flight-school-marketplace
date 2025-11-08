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
import { TrackChanges, AttachMoney, LocationOn, Star } from '@mui/icons-material';
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
  { label: 'Goals', icon: TrackChanges },
  { label: 'Budget', icon: AttachMoney },
  { label: 'Location', icon: LocationOn },
  { label: 'Preferences', icon: Star },
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

    // Navigate to results page after AI matching animation (4 seconds)
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/find-my-school/results');
    }, 4000);
  };

  const handleRefine = () => {
    navigate('/find-my-school');
    reset();
  };

  // Show AI matching animation while submitting
  if (isSubmitting) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated background particles */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            '&::before, &::after': {
              content: '""',
              position: 'absolute',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(33, 150, 243, 0.3) 0%, transparent 70%)',
              animation: 'pulse 2s ease-in-out infinite',
            },
            '&::before': {
              width: '400px',
              height: '400px',
              top: '20%',
              left: '10%',
              animationDelay: '0s',
            },
            '&::after': {
              width: '300px',
              height: '300px',
              bottom: '20%',
              right: '10%',
              animationDelay: '1s',
            },
            '@keyframes pulse': {
              '0%, 100%': { transform: 'scale(1)', opacity: 0.3 },
              '50%': { transform: 'scale(1.2)', opacity: 0.6 },
            },
          }}
        />

        <Container maxWidth="sm" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              mb: 4,
              animation: 'rotate 2s linear infinite',
              '@keyframes rotate': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
              },
            }}
          >
            <Box
              sx={{
                width: 120,
                height: 120,
                margin: '0 auto',
                position: 'relative',
              }}
            >
              {/* Outer ring */}
              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  border: '4px solid rgba(33, 150, 243, 0.2)',
                  borderTop: '4px solid #2196f3',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  '@keyframes spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                  },
                }}
              />
              {/* Inner ring */}
              <Box
                sx={{
                  position: 'absolute',
                  width: '80%',
                  height: '80%',
                  top: '10%',
                  left: '10%',
                  border: '3px solid rgba(76, 175, 80, 0.2)',
                  borderBottom: '3px solid #4caf50',
                  borderRadius: '50%',
                  animation: 'spinReverse 1.5s linear infinite',
                  '@keyframes spinReverse': {
                    '0%': { transform: 'rotate(360deg)' },
                    '100%': { transform: 'rotate(0deg)' },
                  },
                }}
              />
              {/* Center dot */}
              <Box
                sx={{
                  position: 'absolute',
                  width: '30%',
                  height: '30%',
                  top: '35%',
                  left: '35%',
                  background: 'linear-gradient(135deg, #2196f3 0%, #4caf50 100%)',
                  borderRadius: '50%',
                  boxShadow: '0 0 20px rgba(33, 150, 243, 0.8)',
                  animation: 'glow 1s ease-in-out infinite alternate',
                  '@keyframes glow': {
                    '0%': { boxShadow: '0 0 20px rgba(33, 150, 243, 0.8)' },
                    '100%': { boxShadow: '0 0 40px rgba(76, 175, 80, 0.8)' },
                  },
                }}
              />
            </Box>
          </Box>

          <Typography
            variant="h4"
            sx={{
              color: '#fff',
              fontWeight: 700,
              mb: 2,
              animation: 'fadeIn 1s ease-in-out',
              '@keyframes fadeIn': {
                '0%': { opacity: 0 },
                '100%': { opacity: 1 },
              },
            }}
          >
            Analyzing Your Profile...
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              mb: 3,
              animation: 'fadeIn 1s ease-in-out 0.3s both',
            }}
          >
            Our AI is matching you with the perfect flight schools based on your preferences
          </Typography>

          {/* Progress indicators */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-start', maxWidth: 400, mx: 'auto' }}>
            {[
              { label: 'Analyzing your goals', delay: '0s' },
              { label: 'Comparing school locations', delay: '0.8s' },
              { label: 'Calculating best matches', delay: '1.6s' },
            ].map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  opacity: 0,
                  animation: `fadeInSlide 0.5s ease-out ${item.delay} forwards`,
                  '@keyframes fadeInSlide': {
                    '0%': { opacity: 0, transform: 'translateX(-20px)' },
                    '100%': { opacity: 1, transform: 'translateX(0)' },
                  },
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#4caf50',
                    boxShadow: '0 0 10px rgba(76, 175, 80, 0.8)',
                  }}
                />
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    );
  }

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
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(33, 150, 243, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(156, 39, 176, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="md" sx={{ py: { xs: 3, sm: 4, md: 6 }, pb: { xs: 12, sm: 14, md: 16 }, px: { xs: 2, sm: 3 }, position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 3, sm: 4, md: 5 },
            animation: 'fadeInDown 0.8s ease-out',
            '@keyframes fadeInDown': {
              '0%': { opacity: 0, transform: 'translateY(-30px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #fff 0%, #64b5f6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              textShadow: '0 0 30px rgba(100, 181, 246, 0.3)',
              letterSpacing: '-0.5px',
              fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            Find Your Perfect Flight School
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
              maxWidth: '600px',
              mx: 'auto',
              px: { xs: 2, sm: 0 },
            }}
          >
            Answer a few questions and we'll match you with the best schools for your goals
          </Typography>
        </Box>

        {/* Stepper */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            mb: { xs: 3, sm: 4 },
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: { xs: '16px', sm: '20px', md: '24px' },
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            animation: 'fadeInUp 0.8s ease-out 0.2s both',
            '@keyframes fadeInUp': {
              '0%': { opacity: 0, transform: 'translateY(30px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          <Stepper
            activeStep={currentStep}
            alternativeLabel
            sx={{
              '& .MuiStepLabel-root .Mui-completed': {
                color: '#4caf50',
              },
              '& .MuiStepLabel-root .Mui-active': {
                color: '#2196f3',
              },
              '& .MuiStepConnector-line': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
              '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line': {
                borderColor: '#4caf50',
              },
              '& .MuiStepConnector-root.Mui-active .MuiStepConnector-line': {
                borderColor: '#2196f3',
              },
            }}
          >
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isCompleted = index < currentStep;
              const isActive = index === currentStep;

              return (
                <Step key={step.label}>
                  <StepLabel>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: { xs: 48, sm: 56, md: 64 },
                          height: { xs: 48, sm: 56, md: 64 },
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: isActive
                            ? 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)'
                            : isCompleted
                            ? 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)'
                            : 'rgba(255, 255, 255, 0.1)',
                          border: '2px solid',
                          borderColor: isActive
                            ? '#2196f3'
                            : isCompleted
                            ? '#4caf50'
                            : 'rgba(255, 255, 255, 0.2)',
                          boxShadow: isActive
                            ? '0 0 20px rgba(33, 150, 243, 0.5), 0 4px 8px rgba(0, 0, 0, 0.2)'
                            : isCompleted
                            ? '0 0 15px rgba(76, 175, 80, 0.4)'
                            : 'none',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          transform: isActive ? 'scale(1.1)' : 'scale(1)',
                          animation: isActive ? 'pulse 2s ease-in-out infinite' : 'none',
                          '@keyframes pulse': {
                            '0%, 100%': { boxShadow: '0 0 20px rgba(33, 150, 243, 0.5)' },
                            '50%': { boxShadow: '0 0 30px rgba(33, 150, 243, 0.8)' },
                          },
                        }}
                      >
                        <IconComponent
                          sx={{
                            fontSize: { xs: 24, sm: 28, md: 32 },
                            color: isActive || isCompleted ? '#fff' : 'rgba(255, 255, 255, 0.5)',
                            filter: isActive
                              ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                              : 'none',
                          }}
                        />
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: isActive ? 700 : 500,
                          color: isActive
                            ? '#2196f3'
                            : isCompleted
                            ? '#4caf50'
                            : 'rgba(255, 255, 255, 0.6)',
                          fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.85rem' },
                          transition: 'all 0.3s ease',
                          display: { xs: 'none', sm: 'block' },
                        }}
                      >
                        {step.label}
                      </Typography>
                    </Box>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>

          {/* Progress */}
          <Box sx={{ mt: { xs: 2, sm: 3 }, textAlign: 'center' }}>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 500,
                fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
              }}
            >
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                Step {currentStep + 1} of {steps.length} • {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
              </Box>
              <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                {currentStep + 1}/{steps.length} • {Math.round(((currentStep + 1) / steps.length) * 100)}%
              </Box>
            </Typography>
          </Box>
        </Paper>

        {/* Form Content */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4, md: 5 },
            mb: { xs: 3, sm: 4 },
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: { xs: '16px', sm: '20px', md: '24px' },
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            animation: 'fadeInUp 0.8s ease-out 0.4s both',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
              transform: { xs: 'none', md: 'translateY(-2px)' },
            },
          }}
        >
          <Box
            sx={{
              animation: 'fadeIn 0.5s ease-out',
              '@keyframes fadeIn': {
                '0%': { opacity: 0 },
                '100%': { opacity: 1 },
              },
            }}
          >
            {getCurrentForm()}
          </Box>
        </Paper>

        {/* Navigation Buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: { xs: 1.5, sm: 2 },
            animation: 'fadeInUp 0.8s ease-out 0.6s both',
          }}
        >
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={currentStep === 0}
            size="large"
            sx={{
              px: { xs: 2.5, sm: 3.5, md: 4 },
              py: { xs: 1.25, sm: 1.5 },
              borderRadius: { xs: '10px', sm: '12px' },
              borderColor: 'rgba(255, 255, 255, 0.3)',
              color: '#fff',
              fontWeight: 600,
              fontSize: { xs: '0.9rem', sm: '1rem' },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              backdropFilter: 'blur(10px)',
              background: 'rgba(255, 255, 255, 0.05)',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
                background: 'rgba(255, 255, 255, 0.1)',
                transform: { xs: 'none', sm: 'translateX(-4px)' },
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              },
              '&:disabled': {
                borderColor: 'rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            Back
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleNext}
              size="large"
              sx={{
                px: { xs: 2.5, sm: 3.5, md: 4 },
                py: { xs: 1.25, sm: 1.5 },
                borderRadius: { xs: '10px', sm: '12px' },
                background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
                fontWeight: 700,
                fontSize: { xs: '0.9rem', sm: '1rem' },
                boxShadow: '0 4px 12px rgba(33, 150, 243, 0.4)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  transition: 'left 0.5s ease',
                },
                '&:hover': {
                  transform: { xs: 'translateY(-2px)', sm: 'translateX(4px) translateY(-2px)' },
                  boxShadow: '0 8px 20px rgba(33, 150, 243, 0.6)',
                  '&::before': {
                    left: '100%',
                  },
                },
                '&:active': {
                  transform: { xs: 'translateY(0)', sm: 'translateX(4px) translateY(0px)' },
                },
              }}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isSubmitting}
              size="large"
              sx={{
                px: { xs: 2.5, sm: 3.5, md: 4 },
                py: { xs: 1.25, sm: 1.5 },
                borderRadius: { xs: '10px', sm: '12px' },
                background: isSubmitting
                  ? 'linear-gradient(135deg, #9e9e9e 0%, #757575 100%)'
                  : 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)',
                fontWeight: 700,
                fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
                boxShadow: '0 4px 12px rgba(76, 175, 80, 0.4)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  transition: 'left 0.5s ease',
                },
                '&:hover:not(:disabled)': {
                  transform: { xs: 'translateY(-2px)', sm: 'translateX(4px) translateY(-2px)' },
                  boxShadow: '0 8px 20px rgba(76, 175, 80, 0.6)',
                  '&::before': {
                    left: '100%',
                  },
                },
                '&:active:not(:disabled)': {
                  transform: { xs: 'translateY(0)', sm: 'translateX(4px) translateY(0px)' },
                },
                '&:disabled': {
                  cursor: 'not-allowed',
                },
              }}
            >
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                {isSubmitting ? 'Finding Matches...' : 'Submit Questionnaire'}
              </Box>
              <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                {isSubmitting ? 'Finding...' : 'Submit'}
              </Box>
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
}
