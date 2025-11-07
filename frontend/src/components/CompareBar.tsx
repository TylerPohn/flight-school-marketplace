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
        elevation={0}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #1e88e5 100%)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.3)',
          py: { xs: 1.5, sm: 2 },
          px: { xs: 2, sm: 3 },
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
            gap: { xs: 1.5, sm: 2 },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', flex: 1 }}>
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{
                mr: 1,
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: { xs: '0.85rem', sm: '0.875rem' },
              }}
            >
              Selected Schools ({count}/4):
            </Typography>
            {selectedSchools.map(school => (
              <Chip
                key={school.id}
                label={school.name}
                onDelete={() => removeSchool(school.id)}
                size="small"
                sx={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  fontWeight: 500,
                  '& .MuiChip-deleteIcon': {
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&:hover': {
                      color: '#fff',
                    },
                  },
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.15)',
                  },
                }}
              />
            ))}
          </Box>
          <Button
            variant="contained"
            onClick={handleCompareClick}
            disabled={count < 2}
            sx={{
              minWidth: { xs: 120, sm: 150 },
              px: { xs: 2.5, sm: 3 },
              py: { xs: 1, sm: 1.25 },
              background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(33, 150, 243, 0.4)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                background: 'linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(33, 150, 243, 0.5)',
              },
              '&:disabled': {
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.4)',
              },
            }}
          >
            Compare Now
          </Button>
        </Box>
      </Paper>
    </Slide>
  );
};
