import React, { useState } from 'react';
import { Box, Typography, IconButton, useTheme } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Add as AddIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import Card from '../../common/Card/Card';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'doing' | 'done';
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'A Fazer',
    tasks: [
      {
        id: '1',
        title: 'Exemplo de Tarefa',
        description: 'Descrição da tarefa',
        priority: 'high',
        status: 'todo',
      },
    ],
  },
  {
    id: 'doing',
    title: 'Em Andamento',
    tasks: [],
  },
  {
    id: 'done',
    title: 'Concluído',
    tasks: [],
  },
];

const PriorityView: React.FC = () => {
  const theme = useTheme();
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // Se não houver destino ou se o destino for o mesmo que a origem
    if (!destination || 
        (source.droppableId === destination.droppableId && 
         source.index === destination.index)) {
      return;
    }

    // Encontrar as colunas de origem e destino
    const sourceColumn = columns.find(col => col.id === source.droppableId);
    const destColumn = columns.find(col => col.id === destination.droppableId);

    if (!sourceColumn || !destColumn) return;

    // Criar novas arrays de tarefas
    const sourceTasks = Array.from(sourceColumn.tasks);
    const destTasks = source.droppableId === destination.droppableId
      ? sourceTasks
      : Array.from(destColumn.tasks);

    // Remover a tarefa da origem
    const [removed] = sourceTasks.splice(source.index, 1);

    // Adicionar a tarefa ao destino
    destTasks.splice(destination.index, 0, {
      ...removed,
      status: destination.droppableId as 'todo' | 'doing' | 'done',
    });

    // Atualizar o estado
    setColumns(columns.map(col => {
      if (col.id === source.droppableId) {
        return { ...col, tasks: sourceTasks };
      }
      if (col.id === destination.droppableId) {
        return { ...col, tasks: destTasks };
      }
      return col;
    }));
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h5" component="h1">
          Prioridades
        </Typography>
        <IconButton color="primary" aria-label="adicionar tarefa">
          <AddIcon />
        </IconButton>
      </Box>

      <DragDropContext onDragEnd={onDragEnd}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 2,
            flexGrow: 1,
            overflowX: 'auto',
          }}
        >
          {columns.map(column => (
            <Box
              key={column.id}
              sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: 1,
                p: 2,
                minHeight: 200,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {column.title}
                <Typography
                  component="span"
                  sx={{
                    backgroundColor: theme.palette.action.hover,
                    borderRadius: '50%',
                    width: 24,
                    height: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.875rem',
                  }}
                >
                  {column.tasks.length}
                </Typography>
              </Typography>

              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      minHeight: 100,
                      backgroundColor: snapshot.isDraggingOver
                        ? theme.palette.action.hover
                        : 'transparent',
                      transition: 'background-color 0.2s ease',
                      borderRadius: 1,
                    }}
                  >
                    {column.tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{ mb: 2 }}
                          >
                            <Card
                              title={task.title}
                              priority={task.priority}
                              variant="task"
                              actions={
                                <IconButton size="small">
                                  <MoreVertIcon />
                                </IconButton>
                              }
                            >
                              <Typography variant="body2" color="text.secondary">
                                {task.description}
                              </Typography>
                            </Card>
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </Box>
          ))}
        </Box>
      </DragDropContext>
    </Box>
  );
};

export default PriorityView; 