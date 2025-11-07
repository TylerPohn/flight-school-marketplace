import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Button, Alert } from '@mui/material';
import { getSchoolById } from '../mock/schools';

export const SchoolProfile: React.FC = () => {
  const { schoolId } = useParams<{ schoolId: string }>();
  const school = schoolId ? getSchoolById(schoolId) : undefined;

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
        {school.location.city}, {school.location.state}
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
