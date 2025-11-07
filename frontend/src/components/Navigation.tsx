import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { School, Calculate, Quiz, CompareArrows, Flight } from '@mui/icons-material';

export const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Schools', path: '/schools', icon: School },
    { label: 'Find My School', path: '/find-my-school', icon: Quiz },
    { label: 'Financing', path: '/financing-calculator', icon: Calculate },
    { label: 'Compare', path: '/compare', icon: CompareArrows },
  ];

  const isActive = (path: string) => {
    return location.pathname.startsWith(path) && path !== '/';
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        mb: 0,
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #1e88e5 100%)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
          animation: 'shimmer 3s infinite',
          pointerEvents: 'none',
        },
        '@keyframes shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      }}
    >
      <Toolbar sx={{ py: 1 }}>
        {/* Logo/Brand */}
        <Box
          component={RouterLink}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            mr: 4,
            position: 'relative',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              right: -20,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '2px',
              height: '60%',
              background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.3), transparent)',
            },
          }}
        >
          <Flight
            sx={{
              fontSize: 32,
              color: '#fff',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
              animation: 'float 3s ease-in-out infinite',
              '@keyframes float': {
                '0%, 100%': { transform: 'translateY(0px) rotate(-5deg)' },
                '50%': { transform: 'translateY(-5px) rotate(0deg)' },
              },
            }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #fff 0%, #e3f2fd 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 10px rgba(255,255,255,0.3)',
              letterSpacing: '0.5px',
            }}
          >
            Find A Flight School
          </Typography>
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Button
                key={item.path}
                color="inherit"
                component={RouterLink}
                to={item.path}
                startIcon={
                  <Icon
                    sx={{
                      transition: 'transform 0.3s ease',
                      fontSize: '1.2rem',
                    }}
                  />
                }
                sx={{
                  position: 'relative',
                  px: 2.5,
                  py: 1,
                  fontWeight: active ? 700 : 500,
                  fontSize: '0.95rem',
                  letterSpacing: '0.3px',
                  color: active ? '#fff' : 'rgba(255, 255, 255, 0.85)',
                  background: active
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)'
                    : 'transparent',
                  backdropFilter: active ? 'blur(10px)' : 'none',
                  borderRadius: '12px',
                  border: active ? '1px solid rgba(255,255,255,0.3)' : '1px solid transparent',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  overflow: 'hidden',
                  textTransform: 'none',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    transition: 'left 0.5s ease',
                  },
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%)',
                    backdropFilter: 'blur(10px)',
                    borderColor: 'rgba(255,255,255,0.4)',
                    color: '#fff',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.3), 0 0 20px rgba(33, 150, 243, 0.4)',
                    '&::before': {
                      left: '100%',
                    },
                    '& .MuiButton-startIcon': {
                      transform: 'scale(1.1) rotate(5deg)',
                    },
                  },
                  '&:active': {
                    transform: 'translateY(0px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  },
                  // Active indicator bar at bottom
                  '&::after': active
                    ? {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '60%',
                        height: '3px',
                        background: 'linear-gradient(90deg, transparent, #fff, transparent)',
                        borderRadius: '2px 2px 0 0',
                        boxShadow: '0 0 10px rgba(255,255,255,0.8)',
                      }
                    : {},
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
