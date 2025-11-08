import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Alert,
  IconButton,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
  Flight,
  School,
  Search,
  TrendingUp,
  Verified,
  AttachMoney,
  Close,
} from '@mui/icons-material';

export const HomePage: React.FC = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    schoolName: '',
    email: '',
    phone: '',
    website: '',
    location: '',
    message: '',
  });

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send an email via API
    console.log('School registration:', formData);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormOpen(false);
      setFormSubmitted(false);
      setFormData({
        schoolName: '',
        email: '',
        phone: '',
        website: '',
        location: '',
        message: '',
      });
    }, 3000);
  };

  const features = [
    {
      icon: Search,
      title: 'Find Your Perfect Match',
      description: 'Browse and compare flight schools across the country with detailed profiles and verified reviews.',
    },
    {
      icon: Verified,
      title: 'Trust & Transparency',
      description: 'Our verification system ensures you get accurate information and FSP signals for informed decisions.',
    },
    {
      icon: AttachMoney,
      title: 'Financing Options',
      description: 'Calculate loan payments, compare lenders, and explore VA benefits all in one place.',
    },
    {
      icon: TrendingUp,
      title: 'AI-Powered Matching',
      description: 'Answer a few questions and our algorithm will match you with schools that fit your goals.',
    },
  ];

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
          background: 'radial-gradient(circle at 30% 20%, rgba(33, 150, 243, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(76, 175, 80, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 6, sm: 8, md: 10 }, pb: { xs: 12, sm: 14, md: 16 }, position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 8,
            position: 'relative',
            px: { xs: 2, sm: 4, md: 6 },
            py: { xs: 6, sm: 8, md: 10 },
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(30, 60, 114, 0.4) 0%, rgba(42, 82, 152, 0.3) 50%, rgba(30, 136, 229, 0.4) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            animation: 'fadeInDown 0.8s ease-out, heroGlow 3s ease-in-out infinite',
            '@keyframes fadeInDown': {
              '0%': { opacity: 0, transform: 'translateY(-30px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' },
            },
            '@keyframes heroGlow': {
              '0%, 100%': { boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 40px rgba(33, 150, 243, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)' },
              '50%': { boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 60px rgba(33, 150, 243, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)' },
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle at 50% 0%, rgba(100, 181, 246, 0.15) 0%, transparent 70%)',
              borderRadius: '24px',
              pointerEvents: 'none',
            },
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
              p: 3,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              animation: 'float 3s ease-in-out infinite',
              '@keyframes float': {
                '0%, 100%': { transform: 'translateY(0px)' },
                '50%': { transform: 'translateY(-15px)' },
              },
            }}
          >
            <Flight
              sx={{
                fontSize: { xs: 48, sm: 64, md: 72 },
                color: '#fff',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
              }}
            />
          </Box>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              background: 'linear-gradient(135deg, #fff 0%, #64b5f6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3,
              textShadow: '0 0 40px rgba(100, 181, 246, 0.3)',
              letterSpacing: '-1px',
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
            }}
          >
            Find A Flight School
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              mb: 4,
              maxWidth: '800px',
              mx: 'auto',
              fontSize: { xs: '1.15rem', sm: '1.35rem', md: '1.55rem' },
              fontWeight: 300,
              lineHeight: 1.6,
            }}
          >
            Your journey to becoming a pilot starts here. Compare schools, explore financing, and find your perfect match.
          </Typography>

          {/* CTA Buttons */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Button
              component={RouterLink}
              to="/schools"
              variant="contained"
              size="large"
              startIcon={<School />}
              sx={{
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 700,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
                boxShadow: '0 4px 20px rgba(33, 150, 243, 0.4)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 30px rgba(33, 150, 243, 0.6)',
                  background: 'linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%)',
                },
              }}
            >
              Browse Schools
            </Button>

            <Button
              onClick={() => setFormOpen(true)}
              variant="outlined"
              size="large"
              startIcon={<Verified />}
              sx={{
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 700,
                borderRadius: '12px',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: '#fff',
                backdropFilter: 'blur(10px)',
                background: 'rgba(255, 255, 255, 0.05)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
                },
              }}
            >
              List Your School
            </Button>
          </Box>
        </Box>

        {/* Features Section */}
        <Box
          sx={{
            mb: 8,
            animation: 'fadeInUp 0.8s ease-out 0.3s both',
            '@keyframes fadeInUp': {
              '0%': { opacity: 0, transform: 'translateY(30px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: '#fff',
              fontWeight: 700,
              textAlign: 'center',
              mb: 5,
            }}
          >
            Why Use Find A Flight School?
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 3,
              justifyContent: 'center',
            }}
          >
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  sx={{
                    width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 18px)' },
                    minWidth: { xs: '280px', sm: '240px' },
                    maxWidth: { xs: '100%', sm: '320px', md: '300px' },
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    transition: 'all 0.3s ease',
                    animation: `fadeInScale 0.5s ease-out ${0.1 * index}s both`,
                    '@keyframes fadeInScale': {
                      '0%': { opacity: 0, transform: 'scale(0.9)' },
                      '100%': { opacity: 1, transform: 'scale(1)' },
                    },
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
                      background: 'rgba(255, 255, 255, 0.08)',
                    },
                  }}
                >
                  <CardContent sx={{
                    textAlign: 'center',
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                  }}>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        p: 2,
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.2) 0%, rgba(33, 150, 243, 0.05) 100%)',
                        mb: 2,
                      }}
                    >
                      <IconComponent
                        sx={{
                          fontSize: 40,
                          color: '#64b5f6',
                        }}
                      />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#fff',
                        fontWeight: 600,
                        mb: 1.5,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.85)',
                        lineHeight: 1.7,
                        fontSize: '1rem',
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        </Box>

        {/* Quick Links Section */}
        <Box
          sx={{
            textAlign: 'center',
            animation: 'fadeInUp 0.8s ease-out 0.6s both',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: '#fff',
              fontWeight: 600,
              mb: 3,
            }}
          >
            Get Started Today
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Button
              component={RouterLink}
              to="/find-my-school"
              variant="contained"
              size="large"
              sx={{
                px: 3,
                py: 1.5,
                fontWeight: 600,
                borderRadius: '10px',
                background: 'rgba(33, 150, 243, 0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(33, 150, 243, 0.3)',
                color: '#64b5f6',
                '&:hover': {
                  background: 'rgba(33, 150, 243, 0.3)',
                  borderColor: 'rgba(33, 150, 243, 0.5)',
                  color: '#90caf9',
                },
              }}
            >
              Take the Quiz
            </Button>

            <Button
              component={RouterLink}
              to="/financing-calculator"
              variant="contained"
              size="large"
              sx={{
                px: 3,
                py: 1.5,
                fontWeight: 600,
                borderRadius: '10px',
                background: 'rgba(33, 150, 243, 0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(33, 150, 243, 0.3)',
                color: '#64b5f6',
                '&:hover': {
                  background: 'rgba(33, 150, 243, 0.3)',
                  borderColor: 'rgba(33, 150, 243, 0.5)',
                  color: '#90caf9',
                },
              }}
            >
              Calculate Financing
            </Button>

            <Button
              component={RouterLink}
              to="/compare?schools=school-001,school-002,school-003"
              variant="contained"
              size="large"
              sx={{
                px: 3,
                py: 1.5,
                fontWeight: 600,
                borderRadius: '10px',
                background: 'rgba(33, 150, 243, 0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(33, 150, 243, 0.3)',
                color: '#64b5f6',
                '&:hover': {
                  background: 'rgba(33, 150, 243, 0.3)',
                  borderColor: 'rgba(33, 150, 243, 0.5)',
                  color: '#90caf9',
                },
              }}
            >
              Compare Schools
            </Button>
          </Box>
        </Box>
      </Container>

      {/* School Registration Dialog */}
      <Dialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, #1a1f2e 0%, #252d3d 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
          },
        }}
      >
        <DialogTitle
          sx={{
            color: '#fff',
            fontWeight: 700,
            fontSize: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          Register Your Flight School
          <IconButton
            onClick={() => setFormOpen(false)}
            sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {formSubmitted ? (
            <Alert
              severity="success"
              sx={{
                background: 'rgba(76, 175, 80, 0.1)',
                border: '1px solid rgba(76, 175, 80, 0.3)',
                color: '#81c784',
                '& .MuiAlert-icon': {
                  color: '#81c784',
                },
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                Thank you for your submission!
              </Typography>
              <Typography variant="body2">
                We've received your information and will review it shortly. Please wait while we verify your school details. We'll contact you at the email address provided.
              </Typography>
            </Alert>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 2 }}>
                <TextField
                  label="School Name"
                  required
                  fullWidth
                  value={formData.schoolName}
                  onChange={(e) => handleFormChange('schoolName', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#fff',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(255, 255, 255, 0.7)',
                    },
                  }}
                />

                <TextField
                  label="Email"
                  type="email"
                  required
                  fullWidth
                  value={formData.email}
                  onChange={(e) => handleFormChange('email', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#fff',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(255, 255, 255, 0.7)',
                    },
                  }}
                />

                <TextField
                  label="Phone Number"
                  required
                  fullWidth
                  value={formData.phone}
                  onChange={(e) => handleFormChange('phone', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#fff',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(255, 255, 255, 0.7)',
                    },
                  }}
                />

                <TextField
                  label="Website"
                  fullWidth
                  value={formData.website}
                  onChange={(e) => handleFormChange('website', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#fff',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(255, 255, 255, 0.7)',
                    },
                  }}
                />

                <TextField
                  label="Location (City, State)"
                  required
                  fullWidth
                  value={formData.location}
                  onChange={(e) => handleFormChange('location', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#fff',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(255, 255, 255, 0.7)',
                    },
                  }}
                />

                <TextField
                  label="Additional Information"
                  multiline
                  rows={4}
                  fullWidth
                  value={formData.message}
                  onChange={(e) => handleFormChange('message', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#fff',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(255, 255, 255, 0.7)',
                    },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    py: 1.5,
                    fontWeight: 700,
                    fontSize: '1rem',
                    background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%)',
                    },
                  }}
                >
                  Submit Registration
                </Button>
              </Box>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};
