import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  DateCalendar,
  LocalizationProvider,
  PickersDay,
  PickersDayProps,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import { format, isSameDay } from 'date-fns';
import { Add as AddIcon } from '@mui/icons-material';

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  type: 'task' | 'reminder' | 'appointment';
  priority?: 'high' | 'medium' | 'low';
}

const CalendarView: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    description: '',
    type: 'task',
    priority: 'medium',
  });

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleAddEvent = () => {
    if (selectedDate && newEvent.title) {
      const event: Event = {
        id: Math.random().toString(36).substr(2, 9),
        title: newEvent.title,
        description: newEvent.description || '',
        date: selectedDate,
        type: newEvent.type as 'task' | 'reminder' | 'appointment',
        priority: newEvent.priority as 'high' | 'medium' | 'low',
      };

      setEvents([...events, event]);
      setOpenDialog(false);
      setNewEvent({
        title: '',
        description: '',
        type: 'task',
        priority: 'medium',
      });
    }
  };

  const renderDayWithEvents = (
    date: Date,
    selectedDates: Array<Date | null>,
    pickersDayProps: PickersDayProps<Date>
  ) => {
    const hasEvents = events.some((event) => isSameDay(event.date, date));

    return (
      <Box sx={{ position: 'relative' }}>
        <PickersDay {...pickersDayProps} />
        {hasEvents && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 2,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 4,
              height: 4,
              borderRadius: '50%',
              backgroundColor: 'primary.main',
            }}
          />
        )}
      </Box>
    );
  };

  const selectedDateEvents = events.filter(
    (event) => selectedDate && isSameDay(event.date, selectedDate)
  );

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Calendário</Typography>
                <IconButton color="primary" onClick={() => setOpenDialog(true)}>
                  <AddIcon />
                </IconButton>
              </Box>
              <DateCalendar
                value={selectedDate}
                onChange={handleDateChange}
                renderDay={renderDayWithEvents}
                sx={{ width: '100%' }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Eventos do Dia
                {selectedDate && (
                  <Typography variant="body2" color="textSecondary">
                    {format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </Typography>
                )}
              </Typography>

              {selectedDateEvents.length > 0 ? (
                selectedDateEvents.map((event) => (
                  <Box
                    key={event.id}
                    sx={{
                      mt: 2,
                      p: 2,
                      borderRadius: 1,
                      backgroundColor: 'action.hover',
                    }}
                  >
                    <Typography variant="subtitle1">{event.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {event.description}
                    </Typography>
                    <Typography variant="caption" color="primary">
                      {event.type} • {event.priority}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography color="textSecondary">
                  Nenhum evento para este dia
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Adicionar Evento</DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Título"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                fullWidth
              />
              <TextField
                label="Descrição"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                multiline
                rows={3}
                fullWidth
              />
              <TextField
                select
                label="Tipo"
                value={newEvent.type}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, type: e.target.value as Event['type'] })
                }
                fullWidth
                SelectProps={{
                  native: true,
                }}
              >
                <option value="task">Tarefa</option>
                <option value="reminder">Lembrete</option>
                <option value="appointment">Compromisso</option>
              </TextField>
              <TextField
                select
                label="Prioridade"
                value={newEvent.priority}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, priority: e.target.value as Event['priority'] })
                }
                fullWidth
                SelectProps={{
                  native: true,
                }}
              >
                <option value="high">Alta</option>
                <option value="medium">Média</option>
                <option value="low">Baixa</option>
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
            <Button onClick={handleAddEvent} variant="contained" color="primary">
              Adicionar
            </Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>
    </Box>
  );
};

export default CalendarView; 