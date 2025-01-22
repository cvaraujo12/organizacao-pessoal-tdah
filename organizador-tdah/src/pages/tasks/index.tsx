import React from 'react';
import { Box, Typography } from '@mui/material';
import PriorityView from '../../components/features/Priority/PriorityView';

const Tasks: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Tarefas
      </Typography>
      <PriorityView />
    </Box>
  );
};

export default Tasks; 