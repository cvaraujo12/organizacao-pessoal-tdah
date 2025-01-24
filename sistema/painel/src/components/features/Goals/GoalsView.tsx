import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  LinearProgress,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  deadline: string;
  progress: number;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  steps: Array<{
    id: string;
    description: string;
    completed: boolean;
  }>;
}

const categories = [
  'Pessoal',
  'Profissional',
  'Saúde',
  'Educação',
  'Financeiro',
  'Outros',
];

const GoalsView: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [newGoal, setNewGoal] = useState<Partial<Goal>>({
    title: '',
    description: '',
    category: 'Pessoal',
    deadline: '',
    priority: 'medium',
    status: 'pending',
    progress: 0,
    steps: [],
  });
  const [newStep, setNewStep] = useState('');

  const handleAddGoal = () => {
    if (newGoal.title) {
      const goal: Goal = {
        id: Math.random().toString(36).substr(2, 9),
        title: newGoal.title,
        description: newGoal.description || '',
        category: newGoal.category || 'Pessoal',
        deadline: newGoal.deadline || '',
        progress: 0,
        status: 'pending',
        priority: newGoal.priority as 'high' | 'medium' | 'low',
        steps: newGoal.steps || [],
      };

      setGoals([...goals, goal]);
      setOpenDialog(false);
      setNewGoal({
        title: '',
        description: '',
        category: 'Pessoal',
        deadline: '',
        priority: 'medium',
        status: 'pending',
        progress: 0,
        steps: [],
      });
    }
  };

  const handleAddStep = () => {
    if (newStep) {
      setNewGoal({
        ...newGoal,
        steps: [
          ...(newGoal.steps || []),
          {
            id: Math.random().toString(36).substr(2, 9),
            description: newStep,
            completed: false,
          },
        ],
      });
      setNewStep('');
    }
  };

  const handleDeleteStep = (stepId: string) => {
    setNewGoal({
      ...newGoal,
      steps: (newGoal.steps || []).filter((step) => step.id !== stepId),
    });
  };

  const handleUpdateProgress = (goalId: string, stepId: string) => {
    setGoals(
      goals.map((goal) => {
        if (goal.id === goalId) {
          const updatedSteps = goal.steps.map((step) =>
            step.id === stepId ? { ...step, completed: !step.completed } : step
          );
          const progress =
            (updatedSteps.filter((step) => step.completed).length / updatedSteps.length) *
            100;
          const status =
            progress === 100 ? 'completed' : progress > 0 ? 'in_progress' : 'pending';

          return {
            ...goal,
            steps: updatedSteps,
            progress,
            status,
          };
        }
        return goal;
      })
    );
  };

  const getStatusColor = (status: Goal['status']) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'primary';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: Goal['priority']) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">Minhas Metas</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Nova Meta
        </Button>
      </Box>

      <Grid container spacing={3}>
        {goals.map((goal) => (
          <Grid item xs={12} md={6} key={goal.id}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">{goal.title}</Typography>
                <Box>
                  <IconButton size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>

              <Typography variant="body2" color="textSecondary" paragraph>
                {goal.description}
              </Typography>

              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip
                  label={goal.category}
                  size="small"
                  variant="outlined"
                />
                <Chip
                  label={goal.status}
                  size="small"
                  color={getStatusColor(goal.status)}
                />
                <Chip
                  label={goal.priority}
                  size="small"
                  color={getPriorityColor(goal.priority)}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Progresso
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={goal.progress}
                  sx={{ height: 8, borderRadius: 4 }}
                />
                <Typography variant="caption" color="textSecondary" align="right" display="block">
                  {Math.round(goal.progress)}%
                </Typography>
              </Box>

              <Typography variant="body2" color="textSecondary" gutterBottom>
                Etapas
              </Typography>
              {goal.steps.map((step) => (
                <Box
                  key={step.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 1,
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => handleUpdateProgress(goal.id, step.id)}
                  >
                    <CheckCircleIcon
                      color={step.completed ? 'success' : 'disabled'}
                    />
                  </IconButton>
                  <Typography
                    variant="body2"
                    sx={{
                      textDecoration: step.completed ? 'line-through' : 'none',
                      color: step.completed ? 'text.disabled' : 'text.primary',
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Nova Meta</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Título"
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              fullWidth
            />
            <TextField
              label="Descrição"
              value={newGoal.description}
              onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              select
              label="Categoria"
              value={newGoal.category}
              onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
              fullWidth
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              type="date"
              label="Prazo"
              value={newGoal.deadline}
              onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              select
              label="Prioridade"
              value={newGoal.priority}
              onChange={(e) =>
                setNewGoal({ ...newGoal, priority: e.target.value as Goal['priority'] })
              }
              fullWidth
            >
              <MenuItem value="high">Alta</MenuItem>
              <MenuItem value="medium">Média</MenuItem>
              <MenuItem value="low">Baixa</MenuItem>
            </TextField>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Etapas
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  label="Nova etapa"
                  value={newStep}
                  onChange={(e) => setNewStep(e.target.value)}
                  fullWidth
                  size="small"
                />
                <Button
                  variant="outlined"
                  onClick={handleAddStep}
                  disabled={!newStep}
                >
                  Adicionar
                </Button>
              </Box>
              {newGoal.steps?.map((step) => (
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
                  <Typography variant="body2">{step.description}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteStep(step.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button
            onClick={handleAddGoal}
            variant="contained"
            color="primary"
            disabled={!newGoal.title}
          >
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GoalsView; 