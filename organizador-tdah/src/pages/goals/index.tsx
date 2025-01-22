import React from 'react';
import { Box, Typography } from '@mui/material';
import GoalsView from '../../components/features/Goals/GoalsView';

const Goals: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Metas
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Defina e acompanhe suas metas de forma organizada e visual.
      </Typography>
      <GoalsView />
    </Box>
  );
};

export default Goals; 