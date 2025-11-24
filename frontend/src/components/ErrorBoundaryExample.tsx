/**
 * ErrorBoundary Usage Examples
 *
 * This file demonstrates various ways to use the ErrorBoundary and error fallback components.
 * These examples can be integrated into pages and components as needed.
 */

import React, { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { ErrorBoundary } from './ErrorBoundary';
import { ErrorFallback, InlineError, LoadingError, NetworkError, NotFoundError } from './ErrorFallback';

// Example 1: Basic component that might throw an error
const BuggyComponent: React.FC = () => {
  const [count, setCount] = useState(0);

  if (count > 3) {
    throw new Error('Component crashed! Count exceeded 3.');
  }

  return (
    <Paper sx={{ p: 3, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Buggy Component (will crash at count &gt; 3)
      </Typography>
      <Typography variant="body1" gutterBottom>
        Count: {count}
      </Typography>
      <Button variant="contained" onClick={() => setCount(count + 1)}>
        Increment
      </Button>
    </Paper>
  );
};

// Example 2: Wrapped with error boundary
export const ErrorBoundaryBasicExample: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Basic Error Boundary Example
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Click increment more than 3 times to trigger an error.
      </Typography>

      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    </Box>
  );
};

// Example 3: Isolated error boundary (doesn't crash the whole page)
export const IsolatedErrorBoundaryExample: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Isolated Error Boundary Example
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        When this component crashes, only this section fails, not the whole page.
      </Typography>

      <ErrorBoundary isolate>
        <BuggyComponent />
      </ErrorBoundary>

      <Paper sx={{ p: 3, mt: 2, background: 'rgba(76, 175, 80, 0.1)' }}>
        <Typography>
          This content is outside the error boundary and will remain visible even if the component above crashes.
        </Typography>
      </Paper>
    </Box>
  );
};

// Example 4: Custom error fallback
export const CustomFallbackExample: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Custom Fallback Example
      </Typography>

      <ErrorBoundary
        fallback={(error, resetError) => (
          <Paper sx={{ p: 3, background: 'rgba(244, 67, 54, 0.1)', border: '1px solid rgba(244, 67, 54, 0.3)' }}>
            <Typography variant="h6" color="error" gutterBottom>
              Custom Error Message
            </Typography>
            <Typography variant="body2" gutterBottom>
              {error.message}
            </Typography>
            <Button variant="contained" color="error" onClick={resetError}>
              Reset Component
            </Button>
          </Paper>
        )}
      >
        <BuggyComponent />
      </ErrorBoundary>
    </Box>
  );
};

// Example 5: Using pre-built error fallback components
export const ErrorFallbackComponentsExample: React.FC = () => {
  const [showError, setShowError] = useState<'loading' | 'network' | 'notfound' | 'inline' | null>(null);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Error Fallback Components Example
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
        <Button variant="outlined" onClick={() => setShowError('loading')}>
          Show Loading Error
        </Button>
        <Button variant="outlined" onClick={() => setShowError('network')}>
          Show Network Error
        </Button>
        <Button variant="outlined" onClick={() => setShowError('notfound')}>
          Show Not Found
        </Button>
        <Button variant="outlined" onClick={() => setShowError('inline')}>
          Show Inline Error
        </Button>
        <Button variant="outlined" onClick={() => setShowError(null)}>
          Clear
        </Button>
      </Box>

      {showError === 'loading' && (
        <LoadingError resource="flight school data" onRetry={() => setShowError(null)} />
      )}

      {showError === 'network' && <NetworkError onRetry={() => setShowError(null)} />}

      {showError === 'notfound' && (
        <NotFoundError resource="school" message="The school you're looking for doesn't exist." />
      )}

      {showError === 'inline' && (
        <InlineError message="Failed to load reviews. Please try again." onRetry={() => setShowError(null)} />
      )}

      {!showError && (
        <Paper sx={{ p: 3, background: 'rgba(33, 150, 243, 0.1)' }}>
          <Typography>Click a button above to see different error states.</Typography>
        </Paper>
      )}
    </Box>
  );
};

// Example 6: Practical usage in a data fetching component
interface DataFetchingComponentProps {
  shouldFail?: boolean;
}

const DataFetchingComponent: React.FC<DataFetchingComponentProps> = ({ shouldFail }) => {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (shouldFail) {
        throw new Error('API request failed');
      }

      setData('Data loaded successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <InlineError message={error} onRetry={fetchData} />
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Data Fetching Component
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : data ? (
        <Typography color="success.main">{data}</Typography>
      ) : (
        <Button variant="contained" onClick={fetchData}>
          Load Data
        </Button>
      )}
    </Paper>
  );
};

export const DataFetchingExample: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Data Fetching with Error Handling
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
        <ErrorBoundary isolate>
          <DataFetchingComponent shouldFail={false} />
        </ErrorBoundary>

        <ErrorBoundary isolate>
          <DataFetchingComponent shouldFail={true} />
        </ErrorBoundary>
      </Box>
    </Box>
  );
};
