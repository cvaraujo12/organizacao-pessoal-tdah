import React from 'react';
import { Box, Typography } from '@mui/material';
import CalendarView from '../../components/features/Calendar/CalendarView';

const Calendar: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Agenda
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Organize seus compromissos, tarefas e lembretes de forma visual.
      </Typography>
      <CalendarView />
    </Box>
  );
};

export default Calendar; 