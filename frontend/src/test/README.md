# Testing Infrastructure

This directory contains test utilities and configuration for the Flight School Marketplace frontend application.

## Files

### setup.ts
Global test setup file that runs before all tests. Includes:
- Jest-DOM matchers for enhanced assertions
- Automatic cleanup after each test
- Mocks for browser APIs (matchMedia, IntersectionObserver, ResizeObserver)
- Console error suppression for known warnings

### test-utils.tsx
Custom render utilities that wrap components with all necessary providers:
- `render()` - Custom render function with all providers (ThemeProvider, BrowserRouter, ComparisonProvider)
- `renderWithoutRouter()` - Render without BrowserRouter (for components that need custom routing setup)
- `renderWithTheme()` - Render with a custom theme

**Usage:**
```tsx
import { render, screen } from '../test/test-utils';

test('renders component', () => {
  render(<MyComponent />);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
```

### mocks.ts
Mock data and functions for testing:
- Mock school data
- Mock API functions
- Module mocks for external dependencies

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Writing Tests

1. Import the custom render function from `test-utils.tsx` instead of `@testing-library/react`
2. Use the mock data from `mocks.ts` for consistent test data
3. Follow the example in `components/Breadcrumb.test.tsx`

## Coverage Thresholds

The project maintains the following coverage thresholds:
- Lines: 70%
- Functions: 70%
- Branches: 70%
- Statements: 70%

## Testing Best Practices

1. Test user behavior, not implementation details
2. Use accessible queries (getByRole, getByLabelText) over test IDs
3. Keep tests isolated and independent
4. Mock external dependencies (API calls, router navigation)
5. Test error states and edge cases
