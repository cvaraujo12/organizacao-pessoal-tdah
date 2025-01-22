import React from 'react';
import { Box, Typography } from '@mui/material';
import HealthView from '../../components/features/Health/HealthView';

const Health: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Saúde
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Monitore sua saúde registrando medicações, sono, humor, sintomas e refeições. Mantenha um histórico completo do seu bem-estar.
      </Typography>
      <HealthView />
    </Box>
  );
};

export default Health; 