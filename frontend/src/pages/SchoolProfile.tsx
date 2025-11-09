import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Button, Alert, CircularProgress, Box } from '@mui/material';
import { getSchoolById, convertToSimpleSchool } from '../services/schoolsApi';

export const SchoolProfile: React.FC = () => {
  const { schoolId } = useParams<{ schoolId: string }>();
  const [school, setSchool] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!schoolId) {
      setLoading(false);
      return;
    }

    getSchoolById(schoolId)
      .then(detailedSchool => {
        if (detailedSchool) {
          setSchool(convertToSimpleSchool(detailedSchool));
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching school:', error);
        setSchool(null);
        setLoading(false);
      });
  }, [schoolId]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!school) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          School not found
        </Alert>
        <Button component={RouterLink} to="/" variant="contained">
          Return to Directory
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        {school.name}
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        {(school as any).location?.city || (school as any).city}, {(school as any).location?.state || (school as any).state}
      </Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        This is a placeholder profile page. Full implementation coming in PR-3.
      </Alert>
      <Button component={RouterLink} to="/" variant="contained">
        Back to Directory
      </Button>
    </Container>
  );
};
