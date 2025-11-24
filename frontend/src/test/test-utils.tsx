import { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { ComparisonProvider } from '../context/ComparisonContext';

// Create the same dark theme used in the app
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

interface AllTheProvidersProps {
  children: ReactNode;
}

// Create a wrapper component that includes all providers
function AllTheProviders({ children }: AllTheProvidersProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <ComparisonProvider>{children}</ComparisonProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

// Custom render function that wraps components with all providers
function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: AllTheProviders, ...options });
}

// Re-export everything from React Testing Library
export * from '@testing-library/react';
export { customRender as render };

// Export a render function without router for testing components that use useNavigate, etc.
function renderWithoutRouter(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  function WithoutRouter({ children }: AllTheProvidersProps) {
    return (
      <ThemeProvider theme={darkTheme}>
        <ComparisonProvider>{children}</ComparisonProvider>
      </ThemeProvider>
    );
  }

  return render(ui, { wrapper: WithoutRouter, ...options });
}

export { renderWithoutRouter };

// Export a render function with custom theme for testing theme-specific behavior
function renderWithTheme(
  ui: ReactElement,
  theme = darkTheme,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  function WithTheme({ children }: AllTheProvidersProps) {
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ComparisonProvider>{children}</ComparisonProvider>
        </BrowserRouter>
      </ThemeProvider>
    );
  }

  return render(ui, { wrapper: WithTheme, ...options });
}

export { renderWithTheme, darkTheme };
