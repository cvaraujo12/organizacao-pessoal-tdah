import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './PriorityView.css';

const PriorityView = ({ prioridades, onPrioridadeChange }) => {
  const [viewMode, setViewMode] = useState('kanban');
  const [filtros, setFiltros] = useState({
    area: 'todas',
    prioridade: 'todas',
    status: 'todas',
  });

  // Organiza prioridades por área para view Lista
  const getPrioridadesPorArea = () => {
    const areas = {};

    prioridades.forEach((prioridade) => {
      if (
        filtros.prioridade !== 'todas' &&
        prioridade.nivel !== filtros.prioridade
      )
        return;
      if (filtros.status !== 'todas' && prioridade.status !== filtros.status)
        return;

      if (!areas[prioridade.area]) {
        areas[prioridade.area] = [];
      }
      areas[prioridade.area].push(prioridade);
    });

    // Ordena por prioridade dentro de cada área
    Object.keys(areas).forEach((area) => {
      areas[area].sort((a, b) => {
        const prioridades = { alta: 3, media: 2, baixa: 1 };
        return prioridades[b.nivel] - prioridades[a.nivel];
      });
    });

    return areas;
  };

  // Organiza prioridades por status para view Kanban
  const getPrioridadesPorStatus = () => {
    const colunas = {
      pendente: [],
      em_andamento: [],
      concluido: [],
    };

    prioridades.forEach((prioridade) => {
      if (filtros.area !== 'todas' && prioridade.area !== filtros.area) return;
      if (
        filtros.prioridade !== 'todas' &&
        prioridade.nivel !== filtros.prioridade
      )
        return;

      colunas[prioridade.status].push(prioridade);
    });

    return colunas;
  };

  // Handler para drag and drop
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const novoStatus = destination.droppableId;
    const prioridadeId = result.draggableId;

    onPrioridadeChange(prioridadeId, { status: novoStatus });
  };

  // Renderiza card de prioridade
  const PriorityCard = ({ prioridade, index }) => (
    <Draggable draggableId={prioridade.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="priority-card priority-${prioridade.nivel}"
        >
          <h4>{prioridade.descricao}</h4>
          {prioridade.subtarefas && (
            <div className="subtasks">
              {prioridade.subtarefas.map((sub, idx) => (
                <div key={idx} className="subtask">
                  <input
                    type="checkbox"
                    checked={sub.concluida}
                    onChange={() => {
                      /* Handle subtask toggle */
                    }}
                  />
                  <span>{sub}</span>
                </div>
              ))}
            </div>
          )}
          {prioridade.notas_neuro && (
            <div className="neuro-notes">
              <i className="fas fa-brain"></i>
              <span>{prioridade.notas_neuro}</span>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );

  // Renderiza item da lista
  const ListItem = ({ prioridade }) => (
    <div className="list-item priority-${prioridade.nivel}">
      <div className="list-item-header">
        <div className="list-item-status">
          <span className="status-dot status-${prioridade.status}"></span>
          <span className="status-text">{prioridade.status}</span>
        </div>
        <h4>{prioridade.descricao}</h4>
        <span className="priority-badge">{prioridade.nivel}</span>
      </div>

      {prioridade.subtarefas && (
        <div className="list-item-subtasks">
          {prioridade.subtarefas.map((sub, idx) => (
            <div key={idx} className="subtask">
              <input
                type="checkbox"
                checked={sub.concluida}
                onChange={() => {
                  /* Handle subtask toggle */
                }}
              />
              <span>{sub}</span>
            </div>
          ))}
        </div>
      )}

      {prioridade.notas_neuro && (
        <div className="list-item-notes">
          <i className="fas fa-brain"></i>
          <span>{prioridade.notas_neuro}</span>
        </div>
      )}
    </div>
  );

  // Renderiza área na visualização em lista
  const AreaSection = ({ titulo, prioridades }) => (
    <div className="area-section">
      <h3>{titulo}</h3>
      <div className="list-items">
        {prioridades.map((prioridade, index) => (
          <ListItem key={prioridade.id} prioridade={prioridade} />
        ))}
      </div>
    </div>
  );

  // Renderiza coluna do Kanban
  const KanbanColumn = ({ title, prioridades, status }) => (
    <div className="kanban-column">
      <h3>{title}</h3>
      <Droppable droppableId={status}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="priority-list"
          >
            {prioridades.map((prioridade, index) => (
              <PriorityCard
                key={prioridade.id}
                prioridade={prioridade}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );

  // Renderiza filtros
  const Filtros = () => (
    <div className="filters">
      <select
        value={filtros.area}
        onChange={(e) => setFiltros({ ...filtros, area: e.target.value })}
      >
        <option value="todas">Todas as Áreas</option>
        <option value="saude">Saúde</option>
        <option value="estudos">Estudos</option>
        <option value="trabalho">Trabalho</option>
      </select>
      <select
        value={filtros.prioridade}
        onChange={(e) => setFiltros({ ...filtros, prioridade: e.target.value })}
      >
        <option value="todas">Todas as Prioridades</option>
        <option value="alta">Alta</option>
        <option value="media">Média</option>
        <option value="baixa">Baixa</option>
      </select>
      <select
        value={filtros.status}
        onChange={(e) => setFiltros({ ...filtros, status: e.target.value })}
      >
        <option value="todas">Todos os Status</option>
        <option value="pendente">Pendente</option>
        <option value="em_andamento">Em Andamento</option>
        <option value="concluido">Concluído</option>
      </select>
    </div>
  );

  return (
    <div className="priority-view">
      <div className="view-controls">
        <Filtros />
        <div className="view-mode">
          <button
            className={viewMode === 'kanban' ? 'active' : ''}
            onClick={() => setViewMode('kanban')}
          >
            Kanban
          </button>
          <button
            className={viewMode === 'lista' ? 'active' : ''}
            onClick={() => setViewMode('lista')}
          >
            Lista
          </button>
        </div>
      </div>

      {viewMode === 'kanban' ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="kanban-board">
            <KanbanColumn
              title="Pendente"
              prioridades={getPrioridadesPorStatus().pendente}
              status="pendente"
            />
            <KanbanColumn
              title="Em Andamento"
              prioridades={getPrioridadesPorStatus().em_andamento}
              status="em_andamento"
            />
            <KanbanColumn
              title="Concluído"
              prioridades={getPrioridadesPorStatus().concluido}
              status="concluido"
            />
          </div>
        </DragDropContext>
      ) : (
        <div className="list-view">
          {Object.entries(getPrioridadesPorArea()).map(
            ([area, prioridades]) => (
              <AreaSection key={area} titulo={area} prioridades={prioridades} />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default PriorityView;
