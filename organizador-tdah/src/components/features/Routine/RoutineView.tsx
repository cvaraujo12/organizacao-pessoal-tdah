import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Chip,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AccessTime as AccessTimeIcon,
  Repeat as RepeatIcon,
} from '@mui/icons-material';

interface Routine {
  id: string;
  title: string;
  description: string;
  time: string;
  days: string[];
  category: string;
  isActive: boolean;
  notifications: boolean;
  steps: Array<{
    id: string;
    description: string;
    estimatedTime: number;
    isOptional: boolean;
  }>;
  neuroNotes?: string;
}

const weekDays = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
];

const categories = [
  'Manhã',
  'Tarde',
  'Noite',
  'Trabalho',
  'Estudo',
  'Saúde',
  'Lazer',
];

const RoutineView: React.FC = () => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);
  const [newRoutine, setNewRoutine] = useState<Partial<Routine>>({
    title: '',
    description: '',
    time: '',
    days: [],
    category: 'Manhã',
    isActive: true,
    notifications: true,
    steps: [],
  });
  const [newStep, setNewStep] = useState({
    description: '',
    estimatedTime: 15,
    isOptional: false,
  });

  const handleAddRoutine = () => {
    if (newRoutine.title && newRoutine.time) {
      const routine: Routine = {
        id: Math.random().toString(36).substr(2, 9),
        title: newRoutine.title,
        description: newRoutine.description || '',
        time: newRoutine.time,
        days: newRoutine.days || [],
        category: newRoutine.category || 'Manhã',
        isActive: newRoutine.isActive || true,
        notifications: newRoutine.notifications || true,
        steps: newRoutine.steps || [],
        neuroNotes: newRoutine.neuroNotes,
      };

      setRoutines([...routines, routine]);
      setOpenDialog(false);
      setNewRoutine({
        title: '',
        description: '',
        time: '',
        days: [],
        category: 'Manhã',
        isActive: true,
        notifications: true,
        steps: [],
      });
    }
  };

  const handleAddStep = () => {
    if (newStep.description) {
      setNewRoutine({
        ...newRoutine,
        steps: [
          ...(newRoutine.steps || []),
          {
            id: Math.random().toString(36).substr(2, 9),
            ...newStep,
          },
        ],
      });
      setNewStep({
        description: '',
        estimatedTime: 15,
        isOptional: false,
      });
    }
  };

  const handleDeleteStep = (stepId: string) => {
    setNewRoutine({
      ...newRoutine,
      steps: (newRoutine.steps || []).filter((step) => step.id !== stepId),
    });
  };

  const handleDeleteRoutine = (routineId: string) => {
    setRoutines(routines.filter((routine) => routine.id !== routineId));
  };

  const handleEditRoutine = (routine: Routine) => {
    setSelectedRoutine(routine);
    setNewRoutine(routine);
    setOpenDialog(true);
  };

  const handleToggleDay = (day: string) => {
    const days = newRoutine.days || [];
    const newDays = days.includes(day)
      ? days.filter((d) => d !== day)
      : [...days, day];
    setNewRoutine({ ...newRoutine, days: newDays });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" component="h1">
          Rotinas
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedRoutine(null);
            setOpenDialog(true);
          }}
        >
          Nova Rotina
        </Button>
      </Box>

      <Grid container spacing={3}>
        {categories.map((category) => {
          const categoryRoutines = routines.filter(
            (routine) => routine.category === category
          );

          if (categoryRoutines.length === 0) return null;

          return (
            <Grid item xs={12} key={category}>
              <Typography variant="h6" gutterBottom>
                {category}
              </Typography>
              <Grid container spacing={2}>
                {categoryRoutines.map((routine) => (
                  <Grid item xs={12} sm={6} md={4} key={routine.id}>
                    <Paper
                      sx={{
                        p: 2,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="h6">{routine.title}</Typography>
                        <Box>
                          <IconButton
                            size="small"
                            onClick={() => handleEditRoutine(routine)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteRoutine(routine.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>

                      <Typography color="text.secondary" sx={{ mb: 2 }}>
                        {routine.description}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <AccessTimeIcon sx={{ mr: 1, fontSize: 'small' }} />
                        <Typography variant="body2">{routine.time}</Typography>
                      </Box>

                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                        {routine.days.map((day) => (
                          <Chip
                            key={day}
                            label={day.substring(0, 3)}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        ))}
                      </Box>

                      {routine.steps.length > 0 && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" gutterBottom>
                            Etapas:
                          </Typography>
                          {routine.steps.map((step) => (
                            <Box
                              key={step.id}
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mb: 1,
                              }}
                            >
                              <Typography variant="body2">
                                {step.description}
                                {step.isOptional && (
                                  <Chip
                                    label="Opcional"
                                    size="small"
                                    sx={{ ml: 1 }}
                                  />
                                )}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {step.estimatedTime}min
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      )}

                      {routine.neuroNotes && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            fontStyle: 'italic',
                            bgcolor: 'action.hover',
                            p: 1,
                            borderRadius: 1,
                          }}
                        >
                          {routine.neuroNotes}
                        </Typography>
                      )}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          );
        })}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedRoutine ? 'Editar Rotina' : 'Nova Rotina'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Título"
              value={newRoutine.title}
              onChange={(e) => setNewRoutine({ ...newRoutine, title: e.target.value })}
              required
              fullWidth
            />

            <TextField
              label="Descrição"
              value={newRoutine.description}
              onChange={(e) =>
                setNewRoutine({ ...newRoutine, description: e.target.value })
              }
              multiline
              rows={2}
              fullWidth
            />

            <TextField
              label="Horário"
              type="time"
              value={newRoutine.time}
              onChange={(e) => setNewRoutine({ ...newRoutine, time: e.target.value })}
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              select
              label="Categoria"
              value={newRoutine.category}
              onChange={(e) =>
                setNewRoutine({ ...newRoutine, category: e.target.value })
              }
              fullWidth
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>

            <Typography variant="subtitle2" gutterBottom>
              Dias da Semana
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {weekDays.map((day) => (
                <Chip
                  key={day}
                  label={day.substring(0, 3)}
                  onClick={() => handleToggleDay(day)}
                  color={
                    newRoutine.days?.includes(day) ? 'primary' : 'default'
                  }
                  variant={
                    newRoutine.days?.includes(day) ? 'filled' : 'outlined'
                  }
                />
              ))}
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={newRoutine.isActive}
                    onChange={(e) =>
                      setNewRoutine({
                        ...newRoutine,
                        isActive: e.target.checked,
                      })
                    }
                  />
                }
                label="Ativa"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={newRoutine.notifications}
                    onChange={(e) =>
                      setNewRoutine({
                        ...newRoutine,
                        notifications: e.target.checked,
                      })
                    }
                  />
                }
                label="Notificações"
              />
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Etapas
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  label="Descrição"
                  value={newStep.description}
                  onChange={(e) =>
                    setNewStep({ ...newStep, description: e.target.value })
                  }
                  size="small"
                  fullWidth
                />
                <TextField
                  label="Tempo (min)"
                  type="number"
                  value={newStep.estimatedTime}
                  onChange={(e) =>
                    setNewStep({
                      ...newStep,
                      estimatedTime: parseInt(e.target.value),
                    })
                  }
                  size="small"
                  sx={{ width: 100 }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={newStep.isOptional}
                      onChange={(e) =>
                        setNewStep({
                          ...newStep,
                          isOptional: e.target.checked,
                        })
                      }
                      size="small"
                    />
                  }
                  label="Opcional"
                />
                <Button
                  variant="outlined"
                  onClick={handleAddStep}
                  disabled={!newStep.description}
                >
                  Adicionar
                </Button>
              </Box>

              {newRoutine.steps?.map((step) => (
                <Box
                  key={step.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 1,
                    borderRadius: 1,
                    bgcolor: 'action.hover',
                    mb: 1,
                  }}
                >
                  <Box>
                    <Typography variant="body2">
                      {step.description}
                      {step.isOptional && (
                        <Chip label="Opcional" size="small" sx={{ ml: 1 }} />
                      )}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {step.estimatedTime}min
                    </Typography>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteStep(step.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>

            <TextField
              label="Notas Neuropsicológicas"
              value={newRoutine.neuroNotes}
              onChange={(e) =>
                setNewRoutine({ ...newRoutine, neuroNotes: e.target.value })
              }
              multiline
              rows={2}
              fullWidth
              helperText="Adicione notas sobre como esta rotina se adapta às suas necessidades específicas"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button onClick={handleAddRoutine} variant="contained">
            {selectedRoutine ? 'Salvar' : 'Criar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RoutineView; 