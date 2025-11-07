import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { ComparisonProvider } from './context/ComparisonContext';
import { CompareBar } from './components/CompareBar';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { SchoolDirectory } from './pages/SchoolDirectory';
import { ComparisonPage } from './pages/ComparisonPage';
import { SchoolProfilePage } from './pages/SchoolProfilePage';
import FinancingCalculatorPage from './pages/FinancingCalculatorPage';
import { AIMatchingPage } from './pages/AIMatchingPage';

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

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <ComparisonProvider>
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/schools" element={<SchoolDirectory />} />
            <Route path="/compare" element={<ComparisonPage />} />
            <Route path="/schools/:schoolId" element={<SchoolProfilePage />} />
            <Route path="/financing-calculator" element={<FinancingCalculatorPage />} />
            <Route path="/find-my-school" element={<AIMatchingPage />} />
            <Route path="/find-my-school/results" element={<AIMatchingPage />} />
          </Routes>
          <CompareBar />
        </ComparisonProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
