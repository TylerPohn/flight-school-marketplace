import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { SchoolCard } from '../components/SchoolCard';
import { mockSchools } from '../mock/schools';

export const SchoolDirectory: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4, pb: 12 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Flight School Directory
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Browse and compare flight schools across the country. Select up to 4 schools to compare side-by-side.
        </Typography>
      </Box>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        gap: 3
      }}>
        {mockSchools.map(school => (
          <SchoolCard key={school.id} school={school} />
        ))}
      </Box>
    </Container>
  );
};
