import React from 'react';
import { CircularProgress, Box, LinearProgress, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface LoadingProps {
  variant?: 'circular' | 'linear' | 'skeleton';
  size?: number;
  message?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  variant = 'circular',
  size = 40,
  message = 'Carregando...',
  fullScreen = false,
}) => {
  const theme = useTheme();

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        ...(fullScreen && {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          zIndex: theme.zIndex.modal,
        }),
      }}
    >
      {variant === 'circular' && (
        <CircularProgress size={size} color="primary" />
      )}
      {variant === 'linear' && (
        <Box sx={{ width: '100%', maxWidth: 300 }}>
          <LinearProgress color="primary" />
        </Box>
      )}
      {message && (
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ mt: 1 }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );

  return fullScreen ? (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {content}
    </Box>
  ) : (
    content
  );
};

export default Loading; 