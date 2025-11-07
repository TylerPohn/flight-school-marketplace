import React from 'react';
import { Paper, Box, Chip, Button, Typography, Slide } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useComparison } from '../hooks/useComparison';

export const CompareBar: React.FC = () => {
  const { selectedSchools, removeSchool, count } = useComparison();
  const navigate = useNavigate();

  if (count === 0) {
    return null;
  }

  const handleCompareClick = () => {
    const schoolIds = selectedSchools.map(s => s.id).join(',');
    navigate(`/compare?schools=${schoolIds}`);
  };

  return (
    <Slide direction="up" in={count > 0} mountOnEnter unmountOnExit>
      <Paper
        elevation={8}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderTop: 1,
          borderColor: 'divider',
          py: 2,
          px: 3,
        }}
      >
        <Box
          sx={{
            maxWidth: 1200,
            mx: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', flex: 1 }}>
            <Typography variant="body2" fontWeight="bold" sx={{ mr: 1 }}>
              Selected Schools ({count}/4):
            </Typography>
            {selectedSchools.map(school => (
              <Chip
                key={school.id}
                label={school.name}
                onDelete={() => removeSchool(school.id)}
                color="primary"
                variant="outlined"
                size="small"
              />
            ))}
          </Box>
          <Button
            variant="contained"
            onClick={handleCompareClick}
            disabled={count < 2}
            sx={{ minWidth: 150 }}
          >
            Compare Now
          </Button>
        </Box>
      </Paper>
    </Slide>
  );
};
