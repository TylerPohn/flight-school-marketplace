import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { School, Calculate, Quiz, CompareArrows, Flight, Menu as MenuIcon, Close } from '@mui/icons-material';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Schools', path: '/schools', icon: School },
    { label: 'Find My School', path: '/find-my-school', icon: Quiz },
    { label: 'Financing', path: '/financing-calculator', icon: Calculate },
    { label: 'Compare', path: '/compare', icon: CompareArrows },
  ];

  const isActive = (path: string) => {
    return location.pathname.startsWith(path) && path !== '/';
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
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
      <Toolbar sx={{ py: { xs: 0.5, md: 1, lg: 1.5 } }}>
        {/* Logo/Brand */}
        <Box
          component={RouterLink}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1, md: 1.5, lg: 2 },
            mr: { xs: 1, md: 2, lg: 3 },
            position: 'relative',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)',
            },
            '&::after': isMobile ? {} : {
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
              fontSize: { xs: 28, md: 32, lg: 40 },
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
              fontSize: { xs: '1rem', md: '1.25rem', lg: '1.5rem' },
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

        {/* Desktop Navigation Buttons */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: { md: 1.5, lg: 3 }, flex: 1, justifyContent: 'space-evenly' }}>
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
                        fontSize: { md: '1.2rem', lg: '1.5rem' },
                      }}
                    />
                  }
                  sx={{
                    position: 'relative',
                    px: { md: 2, lg: 3.5 },
                    py: { md: 1, lg: 1.5 },
                    fontWeight: active ? 700 : 500,
                    fontSize: { md: '0.95rem', lg: '1.1rem' },
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
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton
              color="inherit"
              onClick={handleMobileMenuToggle}
              sx={{
                color: '#fff',
                '&:hover': {
                  background: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              <MenuIcon sx={{ fontSize: 32 }} />
            </IconButton>
          </Box>
        )}
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #1e88e5 100%)',
            color: '#fff',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Menu
          </Typography>
          <IconButton onClick={handleMobileMenuClose} sx={{ color: '#fff' }}>
            <Close />
          </IconButton>
        </Box>
        <List>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <ListItem
                key={item.path}
                component={RouterLink}
                to={item.path}
                onClick={handleMobileMenuClose}
                sx={{
                  py: 2,
                  px: 3,
                  color: '#fff',
                  textDecoration: 'none',
                  background: active
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)'
                    : 'transparent',
                  borderLeft: active ? '4px solid #fff' : '4px solid transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%)',
                    borderLeftColor: 'rgba(255,255,255,0.6)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: '#fff', minWidth: 40 }}>
                  <Icon sx={{ fontSize: 24 }} />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '1.1rem',
                    fontWeight: active ? 700 : 500,
                  }}
                />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </AppBar>
  );
};
