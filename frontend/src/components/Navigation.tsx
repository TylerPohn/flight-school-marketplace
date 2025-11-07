import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { School, Calculate, Quiz, CompareArrows } from '@mui/icons-material';

export const Navigation: React.FC = () => {
  return (
    <AppBar position="sticky" sx={{ mb: 0 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0, mr: 4 }}>
          Flight School Marketplace
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            startIcon={<School />}
          >
            Schools
          </Button>

          <Button
            color="inherit"
            component={RouterLink}
            to="/find-my-school"
            startIcon={<Quiz />}
          >
            Find My School
          </Button>

          <Button
            color="inherit"
            component={RouterLink}
            to="/financing-calculator"
            startIcon={<Calculate />}
          >
            Financing
          </Button>

          <Button
            color="inherit"
            component={RouterLink}
            to="/compare?schools=school-001,school-002,school-003"
            startIcon={<CompareArrows />}
          >
            Compare
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
