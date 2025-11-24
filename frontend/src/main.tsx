import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Global error handler for uncaught errors
window.onerror = (message, source, lineno, colno, error) => {
  console.error('Global error caught:', {
    message,
    source,
    lineno,
    colno,
    error,
  });

  // TODO: In production, send to error tracking service
  // Example: Sentry.captureException(error);

  // Return false to allow default error handling
  return false;
};

// Global handler for unhandled promise rejections
window.onunhandledrejection = (event) => {
  console.error('Unhandled promise rejection:', {
    reason: event.reason,
    promise: event.promise,
  });

  // TODO: In production, send to error tracking service
  // Example: Sentry.captureException(event.reason);

  // Prevent default handling (which would log to console)
  // event.preventDefault();
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
