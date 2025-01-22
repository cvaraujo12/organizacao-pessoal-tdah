import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Chip,
  Rating,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  LocalHospital,
  Restaurant,
  Hotel,
  SentimentSatisfied,
  Medication,
} from '@mui/icons-material';

interface HealthRecord {
  id: string;
  date: string;
  type: 'medication' | 'sleep' | 'mood' | 'symptom' | 'meal';
  title: string;
  description: string;
  rating?: number;
  category?: string;
}

const categories = {
  medication: ['Remédio', 'Suplemento', 'Vitamina'],
  sleep: ['Boa', 'Regular', 'Ruim'],
  mood: ['Ótimo', 'Bom', 'Regular', 'Ruim'],
  symptom: ['Dor', 'Ansiedade', 'Fadiga', 'Outro'],
  meal: ['Café da Manhã', 'Almoço', 'Jantar', 'Lanche'],
};

const HealthView: React.FC = () => {
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newRecord, setNewRecord] = useState<Partial<HealthRecord>>({
    type: 'medication',
    date: new Date().toISOString().split('T')[0],
  });

  const handleAddRecord = () => {
    if (newRecord.title) {
      const record: HealthRecord = {
        id: Math.random().toString(36).substr(2, 9),
        date: newRecord.date || new Date().toISOString().split('T')[0],
        type: newRecord.type as HealthRecord['type'],
        title: newRecord.title,
        description: newRecord.description || '',
        rating: newRecord.rating,
        category: newRecord.category,
      };

      setRecords([...records, record]);
      setOpenDialog(false);
      setNewRecord({
        type: 'medication',
        date: new Date().toISOString().split('T')[0],
      });
    }
  };

  const handleDeleteRecord = (id: string) => {
    setRecords(records.filter((record) => record.id !== id));
  };

  const getIcon = (type: HealthRecord['type']) => {
    switch (type) {
      case 'medication':
        return <Medication />;
      case 'sleep':
        return <Hotel />;
      case 'mood':
        return <SentimentSatisfied />;
      case 'meal':
        return <Restaurant />;
      default:
        return <LocalHospital />;
    }
  };

  const getTypeColor = (type: HealthRecord['type']) => {
    switch (type) {
      case 'medication':
        return 'primary';
      case 'sleep':
        return 'secondary';
      case 'mood':
        return 'success';
      case 'meal':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">Monitoramento de Saúde</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Novo Registro
        </Button>
      </Box>

      <Grid container spacing={3}>
        {records.map((record) => (
          <Grid item xs={12} md={6} key={record.id}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {getIcon(record.type)}
                  <Typography variant="h6">{record.title}</Typography>
                </Box>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleDeleteRecord(record.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>

              <Typography variant="body2" color="textSecondary" paragraph>
                {record.description}
              </Typography>

              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip
                  label={record.type}
                  size="small"
                  color={getTypeColor(record.type)}
                />
                {record.category && (
                  <Chip
                    label={record.category}
                    size="small"
                    variant="outlined"
                  />
                )}
              </Box>

              {record.rating && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" color="textSecondary">
                    Avaliação:
                  </Typography>
                  <Rating value={record.rating} readOnly size="small" />
                </Box>
              )}

              <Typography variant="caption" color="textSecondary" display="block" sx={{ mt: 1 }}>
                {new Date(record.date).toLocaleDateString('pt-BR')}
              </Typography>
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
        <DialogTitle>Novo Registro de Saúde</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              select
              label="Tipo"
              value={newRecord.type}
              onChange={(e) =>
                setNewRecord({ ...newRecord, type: e.target.value as HealthRecord['type'] })
              }
              fullWidth
            >
              <MenuItem value="medication">Medicação</MenuItem>
              <MenuItem value="sleep">Sono</MenuItem>
              <MenuItem value="mood">Humor</MenuItem>
              <MenuItem value="symptom">Sintoma</MenuItem>
              <MenuItem value="meal">Refeição</MenuItem>
            </TextField>

            <TextField
              label="Título"
              value={newRecord.title}
              onChange={(e) => setNewRecord({ ...newRecord, title: e.target.value })}
              fullWidth
            />

            <TextField
              label="Descrição"
              value={newRecord.description}
              onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })}
              multiline
              rows={3}
              fullWidth
            />

            {newRecord.type && categories[newRecord.type] && (
              <TextField
                select
                label="Categoria"
                value={newRecord.category}
                onChange={(e) => setNewRecord({ ...newRecord, category: e.target.value })}
                fullWidth
              >
                {categories[newRecord.type].map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            )}

            {(newRecord.type === 'sleep' || newRecord.type === 'mood') && (
              <Box>
                <Typography variant="body2" gutterBottom>
                  Avaliação
                </Typography>
                <Rating
                  value={newRecord.rating}
                  onChange={(_, value) => setNewRecord({ ...newRecord, rating: value })}
                />
              </Box>
            )}

            <TextField
              type="date"
              label="Data"
              value={newRecord.date}
              onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button
            onClick={handleAddRecord}
            variant="contained"
            color="primary"
            disabled={!newRecord.title}
          >
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HealthView; 