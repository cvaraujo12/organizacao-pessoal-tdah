import React from 'react';
import { Box, Typography } from '@mui/material';

const Food: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Alimentação
      </Typography>
      {/* Aqui virá o componente de alimentação */}
    </Box>
  );
};

export default Food; 