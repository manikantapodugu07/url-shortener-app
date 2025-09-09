import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { 
  Container, 
  AppBar, 
  Toolbar, 
  Button, 
  Typography, 
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Paper
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import UrlShortenerForm from './components/UrlShortenerForm';
import UrlStatistics from './components/UrlStatistics';

// Create a modern theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6366f1',
      light: '#818cf8',
      dark: '#4f46e5',
    },
    secondary: {
      main: '#ec4899',
      light: '#f472b6',
      dark: '#db2777',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '10px 24px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: 'background.default' }}>
          <AppBar 
            position="static" 
            elevation={0}
            sx={{ 
              backgroundColor: 'white',
              borderBottom: '1px solid #e2e8f0',
              color: 'text.primary'
            }}
          >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Typography 
                variant="h5" 
                component={RouterLink} 
                to="/"
                sx={{ 
                  textDecoration: 'none', 
                  color: 'primary.main',
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #6366f1, #ec4899)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                URL Shortener
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  component={RouterLink} 
                  to="/"
                  sx={{ 
                    color: 'text.primary',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: 'primary.light',
                      color: 'white',
                    }
                  }}
                >
                  Shorten URL
                </Button>
                <Button 
                  component={RouterLink} 
                  to="/statistics"
                  sx={{ 
                    color: 'text.primary',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: 'secondary.light',
                      color: 'white',
                    }
                  }}
                >
                  Statistics
                </Button>
              </Box>
            </Toolbar>
          </AppBar>
          
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper 
              elevation={0}
              sx={{ 
                minHeight: '70vh',
                borderRadius: 3,
                overflow: 'hidden',
                border: '1px solid #e2e8f0',
              }}
            >
              <Routes>
                <Route path="/" element={<UrlShortenerForm />} />
                <Route path="/statistics" element={<UrlStatistics />} />
              </Routes>
            </Paper>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
