import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { ErrorOutline, Refresh, Warning, SentimentDissatisfied } from '@mui/icons-material';

/**
 * Generic error fallback component for displaying errors in a user-friendly way
 */
interface ErrorFallbackProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  severity?: 'error' | 'warning' | 'info';
  showDetails?: boolean;
  errorDetails?: string;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  title = 'Something went wrong',
  message = "We're having trouble loading this content. Please try again.",
  onRetry,
  severity = 'error',
  showDetails = false,
  errorDetails,
}) => {
  const getIcon = () => {
    switch (severity) {
      case 'warning':
        return Warning;
      case 'info':
        return SentimentDissatisfied;
      default:
        return ErrorOutline;
    }
  };

  const getColor = () => {
    switch (severity) {
      case 'warning':
        return 'warning.main';
      case 'info':
        return 'info.main';
      default:
        return 'error.main';
    }
  };

  const Icon = getIcon();

  return (
    <Box
      sx={{
        p: 4,
        textAlign: 'center',
        minHeight: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 4,
          maxWidth: 500,
          background: 'linear-gradient(135deg, rgba(30, 60, 114, 0.15) 0%, rgba(42, 82, 152, 0.1) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Icon
          sx={{
            fontSize: 64,
            color: getColor(),
            mb: 2,
          }}
        />
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: getColor() }}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {message}
        </Typography>

        {showDetails && errorDetails && (
          <Paper
            sx={{
              p: 2,
              mb: 3,
              background: 'rgba(0, 0, 0, 0.3)',
              border: `1px solid rgba(255, 0, 0, 0.2)`,
              textAlign: 'left',
              maxHeight: 150,
              overflow: 'auto',
            }}
          >
            <Typography variant="caption" color="error.light" sx={{ fontFamily: 'monospace', wordBreak: 'break-word' }}>
              {errorDetails}
            </Typography>
          </Paper>
        )}

        {onRetry && (
          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={onRetry}
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
        )}
      </Paper>
    </Box>
  );
};

/**
 * Inline error message for smaller error states within components
 */
interface InlineErrorProps {
  message: string;
  onRetry?: () => void;
}

export const InlineError: React.FC<InlineErrorProps> = ({ message, onRetry }) => {
  return (
    <Box
      sx={{
        p: 2,
        border: '1px solid',
        borderColor: 'error.main',
        borderRadius: 1,
        background: 'rgba(244, 67, 54, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <ErrorOutline sx={{ color: 'error.main', fontSize: 24 }} />
      <Box sx={{ flex: 1 }}>
        <Typography variant="body2" color="error.light">
          {message}
        </Typography>
      </Box>
      {onRetry && (
        <Button size="small" variant="outlined" color="error" onClick={onRetry} startIcon={<Refresh />}>
          Retry
        </Button>
      )}
    </Box>
  );
};

/**
 * Loading error state for data fetching failures
 */
interface LoadingErrorProps {
  resource?: string;
  onRetry?: () => void;
}

export const LoadingError: React.FC<LoadingErrorProps> = ({ resource = 'data', onRetry }) => {
  return (
    <ErrorFallback
      title="Loading Failed"
      message={`We couldn't load ${resource}. This might be due to a network issue or the server might be temporarily unavailable.`}
      onRetry={onRetry}
      severity="warning"
    />
  );
};

/**
 * Not found error state
 */
interface NotFoundErrorProps {
  resource?: string;
  message?: string;
}

export const NotFoundError: React.FC<NotFoundErrorProps> = ({
  resource = 'page',
  message = "The page you're looking for doesn't exist or has been moved."
}) => {
  return (
    <ErrorFallback
      title={`${resource.charAt(0).toUpperCase() + resource.slice(1)} Not Found`}
      message={message}
      severity="info"
    />
  );
};

/**
 * Network error state
 */
interface NetworkErrorProps {
  onRetry?: () => void;
}

export const NetworkError: React.FC<NetworkErrorProps> = ({ onRetry }) => {
  return (
    <ErrorFallback
      title="Connection Problem"
      message="We're having trouble connecting to our servers. Please check your internet connection and try again."
      onRetry={onRetry}
      severity="warning"
    />
  );
};
