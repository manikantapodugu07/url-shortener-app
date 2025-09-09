import React from 'react';
import { 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Grid, 
  Chip, 
  Button,
  Paper,
  Divider,
  IconButton,
  Tooltip,
  Fade,
  Slide
} from '@mui/material';
// Icons temporarily replaced with text/emoji due to package installation issues
// import { 
//   Link as LinkIcon, 
//   AccessTime, 
//   TrendingUp, 
//   ContentCopy,
//   Launch,
//   CheckCircle,
//   Error,
//   Visibility
// } from '@mui/icons-material';
import { urlData } from '../mockData';

export default function UrlStatistics() {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const formatExpiry = (expiry) => {
    const now = new Date();
    const diff = expiry - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m`;
    return 'Expired';
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusColor = (expiry) => {
    const now = new Date();
    const diff = expiry - now;
    const hours = diff / (1000 * 60 * 60);
    
    if (hours < 0) return 'error';
    if (hours < 24) return 'warning';
    return 'success';
  };

  const getStatusIcon = (expiry) => {
    const now = new Date();
    return expiry > now ? <span>✅</span> : <span>❌</span>;
  };

  const totalClicks = urlData.reduce((sum, entry) => sum + entry.clicks, 0);
  const activeUrls = urlData.filter(entry => entry.expiry > new Date()).length;
  const expiredUrls = urlData.length - activeUrls;

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
          URL Analytics
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Track performance and manage your shortened URLs
        </Typography>
      </Box>

      {/* Statistics Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                {urlData.length}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Total URLs
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                {totalClicks}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Total Clicks
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                {activeUrls}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Active URLs
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* URL List */}
      {urlData.length === 0 ? (
        <Card sx={{ borderRadius: 3, textAlign: 'center', py: 8 }}>
          <CardContent>
            <span style={{ fontSize: 64, color: '#64748b', marginBottom: 16, display: 'block' }}>🔗</span>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
              No URLs Created Yet
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Start by creating your first shortened URL to see analytics here.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Box>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            All URLs
          </Typography>
          
          {urlData.map((entry, index) => (
            <Slide direction="up" in={true} timeout={300 + index * 100} key={index}>
              <Card 
                sx={{ 
                  mb: 3, 
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
                  <Grid container spacing={3} alignItems="center">
                    {/* URL Info */}
                    <Grid item xs={12} md={8}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mr: 2, flex: 1 }}>
                          {window.location.origin}/{entry.shortcode}
                        </Typography>
                        <Chip 
                          label={formatExpiry(entry.expiry)}
                          size="small"
                          color={getStatusColor(entry.expiry)}
                          icon={getStatusIcon(entry.expiry)}
                        />
                      </Box>
                      
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                          wordBreak: 'break-all',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mb: 2
                        }}
                      >
                        <span>🔗</span>
                        {entry.longUrl}
                      </Typography>

                      {/* Stats Row */}
                      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <span style={{ fontSize: 16, color: '#64748b' }}>👁️</span>
                          <Typography variant="body2" color="text.secondary">
                            {entry.clicks} clicks
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <span style={{ fontSize: 16, color: '#64748b' }}>⏰</span>
                          <Typography variant="body2" color="text.secondary">
                            Expires: {formatDate(entry.expiry)}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    
                    {/* Action Buttons */}
                    <Grid item xs={12} md={4}>
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'flex-start', md: 'flex-end' }, flexWrap: 'wrap' }}>
                        <Tooltip title="Copy short URL">
                          <IconButton
                            onClick={() => copyToClipboard(`${window.location.origin}/${entry.shortcode}`)}
                            sx={{ 
                              borderRadius: 2,
                              border: '1px solid #e2e8f0',
                              '&:hover': {
                                backgroundColor: 'primary.light',
                                color: 'white',
                                borderColor: 'primary.light'
                              }
                            }}
                          >
                            <span>📋</span>
                          </IconButton>
                        </Tooltip>
                        
                        <Tooltip title="Visit original URL">
                          <IconButton
                            href={entry.longUrl}
                            target="_blank"
                            sx={{ 
                              borderRadius: 2,
                              border: '1px solid #e2e8f0',
                              '&:hover': {
                                backgroundColor: 'secondary.light',
                                color: 'white',
                                borderColor: 'secondary.light'
                              }
                            }}
                          >
                            <span>🚀</span>
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Slide>
          ))}
        </Box>
      )}
    </Box>
  );
}
