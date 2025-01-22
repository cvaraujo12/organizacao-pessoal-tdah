import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';

interface ErrorProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  fullScreen?: boolean;
}

const Error: React.FC<ErrorProps> = ({
  title = 'Ops! Algo deu errado',
  message = 'Desculpe, ocorreu um erro inesperado.',
  onRetry,
  fullScreen = false,
}) => {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 2,
          p: 3,
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          color="error"
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ maxWidth: 400, mb: 3 }}
        >
          {message}
        </Typography>
        {onRetry && (
          <Button
            variant="contained"
            color="primary"
            onClick={onRetry}
            sx={{
              mt: 2,
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            Tentar Novamente
          </Button>
        )}
      </Box>
    </motion.div>
  );

  if (fullScreen) {
    return (
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
          bgcolor: 'background.default',
        }}
      >
        {content}
      </Box>
    );
  }

  return content;
};

export default Error; 