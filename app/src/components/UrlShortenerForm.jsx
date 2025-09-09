import React, { useState } from 'react';
import { 
  Button, 
  TextField, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Grid, 
  Chip, 
  IconButton,
  Snackbar,
  Alert,
  Divider,
  Paper,
  Fade,
  Slide
} from '@mui/material';
// Icons temporarily replaced with text/emoji due to package installation issues
// import { 
//   ContentCopy, 
//   Link as LinkIcon, 
//   AccessTime, 
//   CheckCircle,
//   Launch
// } from '@mui/icons-material';
import { logAction } from './LoggerMiddleware';
import { urlData } from '../mockData';

function generateShortcode() {
  return Math.random().toString(36).substring(2, 8);
}

export default function UrlShortenerForm() {
  const [longUrl, setLongUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [validity, setValidity] = useState(30);
  const [shortenedList, setShortenedList] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSubmit = () => {
    if (!/^https?:\/\/.+/.test(longUrl)) {
      showSnackbar('Please enter a valid URL starting with http:// or https://', 'error');
      return;
    }

    const shortcode = customCode || generateShortcode();

    if (urlData.find((entry) => entry.shortcode === shortcode)) {
      showSnackbar('This shortcode already exists. Please try a different one.', 'error');
      return;
    }

    const expiry = new Date(Date.now() + validity * 60000);

    const newEntry = { longUrl, shortcode, expiry, clicks: 0 };
    urlData.push(newEntry);
    setShortenedList([...shortenedList, newEntry]);

    logAction('SHORTEN_URL', newEntry);
    showSnackbar('URL shortened successfully!', 'success');

    setLongUrl('');
    setCustomCode('');
    setValidity(30);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showSnackbar('Copied to clipboard!', 'success');
  };

  const formatExpiry = (expiry) => {
    const now = new Date();
    const diff = expiry - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h`;
    return 'Expired';
  };

  return (
    <Box sx={{ p: { xs: 3, md: 6 } }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            mb: 2,
            background: 'linear-gradient(45deg, #6366f1, #ec4899)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Shorten Your URLs
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Create short, memorable links that are easy to share and track
        </Typography>
      </Box>

      {/* Form Section */}
      <Card sx={{ mb: 4, borderRadius: 3, overflow: 'hidden' }}>
        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField 
                label="Enter your long URL" 
                fullWidth 
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                placeholder="https://example.com/very-long-url"
                InputProps={{
                  startAdornment: <span style={{ marginRight: 8, color: '#64748b' }}>🔗</span>
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    fontSize: '1.1rem',
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField 
                label="Custom shortcode (optional)" 
                fullWidth 
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                placeholder="my-custom-link"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField 
                label="Validity (minutes)" 
                type="number" 
                fullWidth 
                value={validity}
                onChange={(e) => setValidity(e.target.value)}
                InputProps={{
                  startAdornment: <span style={{ marginRight: 8, color: '#64748b' }}>⏰</span>
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button 
                variant="contained" 
                size="large"
                onClick={handleSubmit}
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  background: 'linear-gradient(45deg, #6366f1, #ec4899)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #4f46e5, #db2777)',
                  }
                }}
              >
                Create Short URL
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Results Section */}
      {shortenedList.length > 0 && (
        <Fade in={true}>
          <Box>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Your Shortened URLs
            </Typography>
            
            {shortenedList.map((entry, index) => (
              <Slide direction="up" in={true} timeout={300 + index * 100} key={index}>
                <Card 
                  sx={{ 
                    mb: 2, 
                    borderRadius: 3,
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} md={8}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, mr: 2 }}>
                            {window.location.origin}/{entry.shortcode}
                          </Typography>
                          <Chip 
                            label={formatExpiry(entry.expiry)}
                            size="small"
                            color={entry.expiry > new Date() ? 'success' : 'error'}
                            icon={<span>{entry.expiry > new Date() ? '✅' : '❌'}</span>}
                          />
                        </Box>
                          <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            sx={{ 
                              wordBreak: 'break-all',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1
                            }}
                          >
                            <span>🔗</span>
                            {entry.longUrl}
                          </Typography>
                      </Grid>
                      
                      <Grid item xs={12} md={4}>
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<span>📋</span>}
                            onClick={() => copyToClipboard(`${window.location.origin}/${entry.shortcode}`)}
                            sx={{ borderRadius: 2 }}
                          >
                            Copy
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<span>🚀</span>}
                            href={entry.longUrl}
                            target="_blank"
                            sx={{ borderRadius: 2 }}
                          >
                            Visit
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Slide>
            ))}
          </Box>
        </Fade>
      )}

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity={snackbarSeverity}
          sx={{ borderRadius: 2 }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
