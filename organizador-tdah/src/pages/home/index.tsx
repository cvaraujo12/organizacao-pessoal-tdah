import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PriorityView from '../../components/features/Priority/PriorityView';

const Home: React.FC = () => {
  const theme = useTheme();

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Bem-vindo ao Organizador TDAH
      </Typography>

      <Typography variant="body1" color="textSecondary" paragraph>
        Organize suas tarefas, metas e rotina de forma adaptada às suas necessidades.
      </Typography>

      <Grid container spacing={3}>
        {/* Resumo de Tarefas */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              height: '100%',
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Tarefas Prioritárias
            </Typography>
            <PriorityView />
          </Paper>
        </Grid>

        {/* Próximos Eventos */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              height: '100%',
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Próximos Eventos
            </Typography>
            {/* Aqui virá o componente de calendário */}
          </Paper>
        </Grid>

        {/* Metas em Andamento */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              height: '100%',
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Metas em Andamento
            </Typography>
            {/* Aqui virá o componente de metas */}
          </Paper>
        </Grid>

        {/* Lembretes de Saúde */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              height: '100%',
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Lembretes de Saúde
            </Typography>
            {/* Aqui virá o componente de lembretes de saúde */}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home; 