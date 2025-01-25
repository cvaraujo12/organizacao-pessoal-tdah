'use client';

import React, { useState, useCallback } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  IconButton,
  Typography,
  CircularProgress,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  Stack,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useOptimizedSync } from '@/hooks/useOptimizedSync';
import { Task, TaskInput, TaskUpdate, Priority } from '@/types/Task';
import { useAuth } from '@/hooks/useAuth';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useTaskState, TaskFilters } from '@/hooks/useTaskState';
import { useFeedback } from '@/hooks/useFeedback';

interface EditingTask {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  priority: Priority;
  due_date: string | null;
  tags: string[];
  category: string;
}

interface TaskItemProps {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onEdit }) => {
  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'alta':
        return 'error';
      case 'média':
        return 'warning';
      case 'baixa':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <ListItem
      sx={{
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'stretch', sm: 'center' },
        py: { xs: 2, sm: 1 },
        px: { xs: 1, sm: 2 }
      }}
      secondaryAction={
        <Box sx={{
          display: 'flex',
          width: { xs: '100%', sm: 'auto' },
          mt: { xs: 1, sm: 0 },
          justifyContent: { xs: 'flex-end', sm: 'flex-end' }
        }}>
          <IconButton edge="end" onClick={() => onEdit(task)} sx={{ mr: 1 }}>
            <EditIcon />
          </IconButton>
          <IconButton edge="end" onClick={() => onDelete(task.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      }
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={task.completed}
          onChange={() => onToggle(task)}
        />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography
            sx={{
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? 'text.secondary' : 'text.primary',
              fontSize: { xs: '1rem', sm: '1.1rem' }
            }}
          >
            {task.title}
          </Typography>
        }
        secondary={
          <Box sx={{
            mt: 1,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0.5
          }}>
            <Chip
              label={task.priority}
              color={getPriorityColor(task.priority)}
              size="small"
            />
            {task.tags?.map((tag: string) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
              />
            ))}
            {task.due_date && (
              <Typography
                variant="caption"
                display="block"
                sx={{ mt: 0.5, width: '100%' }}
              >
                Prazo: {new Date(task.due_date).toLocaleDateString('pt-BR')}
              </Typography>
            )}
          </Box>
        }
      />
    </ListItem>
  );
};

const TaskList: React.FC = () => {
  const { user } = useAuth();
  const initialTaskState = {
    title: '',
    description: null,
    completed: false,
    priority: 'média' as Priority,
    due_date: null,
    tags: [],
    category: ''
  };

  const [newTask, setNewTask] = useState<TaskInput>(initialTaskState);
  const [editingTask, setEditingTask] = useState<EditingTask | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newTag, setNewTag] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { showSuccess, showError } = useFeedback();
  const [filters, setFilters] = useState<TaskFilters>({});

  const { 
    data: tasks, 
    isLoading, 
    error, 
    addItem, 
    updateItem, 
    deleteItem 
  } = useOptimizedSync<Task>('tasks');

  const { sortedTasks, taskStats } = useTaskState(tasks || [], filters);

  const handleOpenDialog = useCallback((task?: Task) => {
    if (task) {
      setEditingTask({
        id: task.id,
        title: task.title,
        description: task.description || '',
        completed: task.completed,
        priority: task.priority,
        due_date: task.due_date,
        tags: task.tags || [],
        category: task.category
      });
      setNewTask({
        title: task.title,
        description: task.description || '',
        completed: task.completed,
        priority: task.priority,
        tags: task.tags || [],
        category: task.category,
        due_date: task.due_date
      });
    } else {
      setEditingTask(null);
      setNewTask(initialTaskState);
    }
    setOpenDialog(true);
  }, [initialTaskState]);

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
    setEditingTask(null);
    setNewTask(initialTaskState);
    setNewTag('');
  }, [initialTaskState]);

  const handleAddTag = useCallback(() => {
    if (newTag && newTask.tags && !newTask.tags.includes(newTag)) {
      setNewTask(prev => ({
        ...prev,
        tags: [...prev.tags, newTag]
      }));
      setNewTag('');
    }
  }, [newTag, newTask.tags]);

  const handleRemoveTag = useCallback((tagToRemove: string) => {
    if (newTask.tags) {
      setNewTask(prev => ({
        ...prev,
        tags: prev.tags.filter(tag => tag !== tagToRemove)
      }));
    }
  }, [newTask.tags]);

  const handleAddTask = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title?.trim()) return;

    try {
      const taskInput: TaskInput = {
        title: newTask.title,
        description: newTask.description || '',
        completed: false,
        priority: newTask.priority || 'média',
        tags: newTask.tags || [],
        category: newTask.category || '',
        due_date: newTask.due_date || null
      };

      const result = await addItem(taskInput);
      if (result) {
        showSuccess('Tarefa adicionada com sucesso!');
        handleCloseDialog();
      }
    } catch (err) {
      showError('Erro ao adicionar tarefa');
    }
  }, [addItem, handleCloseDialog, newTask, showSuccess, showError]);

  const handleUpdateTask = useCallback(async (id: number) => {
    if (!editingTask) return;

    try {
      const updates: TaskUpdate = {
        title: editingTask.title,
        description: editingTask.description || '',
        priority: editingTask.priority,
        tags: editingTask.tags,
        category: editingTask.category,
        due_date: editingTask.due_date,
        completed: editingTask.completed
      };

      const success = await updateItem(id, updates);
      if (success) {
        showSuccess('Tarefa atualizada com sucesso!');
        setEditingTask(null);
      }
    } catch (err) {
      showError('Erro ao atualizar tarefa');
    }
  }, [editingTask, updateItem, showSuccess, showError]);

  const handleDeleteTask = useCallback(async (id: number) => {
    try {
      const success = await deleteItem(id);
      if (success) {
        showSuccess('Tarefa removida com sucesso!');
      }
    } catch (err) {
      showError('Erro ao remover tarefa');
    }
  }, [deleteItem, showSuccess, showError]);

  const handleToggle = useCallback(async (task: Task) => {
    try {
      const success = await updateItem(task.id, { completed: !task.completed });
      if (success) {
        showSuccess('Status da tarefa atualizado!');
      }
    } catch (err) {
      showError('Erro ao atualizar status da tarefa');
    }
  }, [updateItem, showSuccess, showError]);

  const handleEdit = useCallback((task: Task) => {
    handleOpenDialog(task);
  }, [handleOpenDialog]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">
          {error instanceof Error ? error.message : 'Erro ao carregar tarefas'}
        </Typography>
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 2, height: '100%', overflow: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Tarefas
      </Typography>

      <Box component="form" onSubmit={handleAddTask} sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Nova Tarefa"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          margin="normal"
          variant="outlined"
          size="small"
        />
        <TextField
          fullWidth
          label="Descrição"
          value={newTask.description || ''}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value || '' })}
          margin="normal"
          variant="outlined"
          size="small"
          multiline
          rows={2}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!newTask.title?.trim()}
          sx={{ mt: 1 }}
        >
          Adicionar Tarefa
        </Button>
      </Box>

      <List>
        {sortedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={handleToggle}
            onDelete={handleDeleteTask}
            onEdit={handleEdit}
          />
        ))}
      </List>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle sx={{
          fontSize: {
            xs: '1.2rem',
            sm: '1.5rem'
          }
        }}>
          {editingTask ? 'Editar Tarefa' : 'Nova Tarefa'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Título"
              fullWidth
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <TextField
              label="Descrição"
              fullWidth
              multiline
              rows={3}
              value={newTask.description || ''}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value || '' })}
            />
            <FormControl fullWidth>
              <InputLabel>Prioridade</InputLabel>
              <Select
                value={newTask.priority}
                label="Prioridade"
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Priority })}
              >
                <MenuItem value="baixa">Baixa</MenuItem>
                <MenuItem value="média">Média</MenuItem>
                <MenuItem value="alta">Alta</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Categoria"
              fullWidth
              value={newTask.category}
              onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
            />
            <TextField
              label="Data de Entrega"
              type="date"
              fullWidth
              value={newTask.due_date ? new Date(newTask.due_date).toISOString().split('T')[0] : ''}
              onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value ? new Date(e.target.value).toISOString() : null })}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Box>
              <TextField
                label="Nova Tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                sx={{ mr: 1 }}
              />
              <Button onClick={handleAddTag}>Adicionar Tag</Button>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {newTask.tags?.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleRemoveTag(tag)}
                />
              ))}
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{
          p: 2,
          flexDirection: {
            xs: 'column',
            sm: 'row'
          },
          '& > button': {
            width: {
              xs: '100%',
              sm: 'auto'
            },
            mb: {
              xs: 1,
              sm: 0
            }
          }
        }}>
          <Button onClick={handleCloseDialog} fullWidth={isMobile}>
            Cancelar
          </Button>
          <Button
            onClick={handleAddTask}
            variant="contained"
            fullWidth={isMobile}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default TaskList; 