import React, { Component, type ReactNode } from 'react';
import { Box, Typography, Button, Paper, Container } from '@mui/material';
import { ErrorOutline, Refresh, Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, resetError: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  isolate?: boolean; // If true, only this section fails, not the whole app
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary - A class-based React error boundary component
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing the whole app.
 *
 * Features:
 * - User-friendly fallback UI with retry option
 * - Console logging for debugging
 * - Can be extended to integrate with error tracking services (Sentry, LogRocket, etc.)
 * - Supports isolated error boundaries for specific sections
 */
class ErrorBoundaryClass extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error to console for debugging
    console.error('ErrorBoundary caught an error:', error);
    console.error('Error info:', errorInfo);
    console.error('Component stack:', errorInfo.componentStack);

    // Call optional onError handler (for error tracking services)
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // TODO: In production, send to error tracking service
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  resetError = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.resetError);
      }

      // Use default fallback UI
      return (
        <DefaultErrorFallback
          error={this.state.error}
          resetError={this.resetError}
          isolate={this.props.isolate}
        />
      );
    }

    return this.props.children;
  }
}

// Default fallback UI component
interface DefaultErrorFallbackProps {
  error: Error;
  resetError: () => void;
  isolate?: boolean;
}

const DefaultErrorFallback: React.FC<DefaultErrorFallbackProps> = ({ error, resetError, isolate }) => {
  return (
    <ErrorFallbackWrapper isolate={isolate}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(30, 60, 114, 0.2) 0%, rgba(42, 82, 152, 0.1) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          maxWidth: 600,
          mx: 'auto',
        }}
      >
        <ErrorOutline
          sx={{
            fontSize: 80,
            color: 'error.main',
            mb: 2,
            animation: 'pulse 2s ease-in-out infinite',
            '@keyframes pulse': {
              '0%, 100%': { opacity: 1, transform: 'scale(1)' },
              '50%': { opacity: 0.7, transform: 'scale(1.05)' },
            },
          }}
        />
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'error.light' }}>
          Oops! Something went wrong
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {isolate
            ? "We're having trouble loading this section. Don't worry, the rest of the app is still working!"
            : "We encountered an unexpected error. Please try refreshing the page."}
        </Typography>

        {import.meta.env.DEV && (
          <Paper
            sx={{
              p: 2,
              mb: 3,
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 0, 0, 0.3)',
              textAlign: 'left',
              maxHeight: 200,
              overflow: 'auto',
            }}
          >
            <Typography variant="caption" color="error.light" sx={{ fontFamily: 'monospace', display: 'block' }}>
              <strong>Error Details (dev only):</strong>
            </Typography>
            <Typography variant="caption" color="error.light" sx={{ fontFamily: 'monospace', display: 'block', mt: 1 }}>
              {error.message}
            </Typography>
            {error.stack && (
              <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace', display: 'block', mt: 1, fontSize: '0.65rem' }}>
                {error.stack}
              </Typography>
            )}
          </Paper>
        )}

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={resetError}
            sx={{
              background: 'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 16px rgba(33, 150, 243, 0.4)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Try Again
          </Button>
          {!isolate && <HomeButton />}
        </Box>
      </Paper>
    </ErrorFallbackWrapper>
  );
};

// Wrapper component to handle different layouts for isolated vs full-page errors
const ErrorFallbackWrapper: React.FC<{ children: ReactNode; isolate?: boolean }> = ({ children, isolate }) => {
  if (isolate) {
    return (
      <Box
        sx={{
          p: 3,
          minHeight: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </Box>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      {children}
    </Container>
  );
};

// Home button with navigation
const HomeButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      startIcon={<Home />}
      onClick={() => navigate('/')}
      sx={{
        borderColor: 'primary.main',
        color: 'primary.main',
        '&:hover': {
          borderColor: 'primary.light',
          background: 'rgba(33, 150, 243, 0.1)',
          transform: 'translateY(-2px)',
        },
        transition: 'all 0.3s ease',
      }}
    >
      Go Home
    </Button>
  );
};

// Functional wrapper component for the error boundary
export const ErrorBoundary: React.FC<ErrorBoundaryProps> = (props) => {
  return <ErrorBoundaryClass {...props} />;
};

// Export for direct use
export default ErrorBoundary;
