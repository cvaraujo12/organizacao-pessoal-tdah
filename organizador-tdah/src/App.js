import React from 'react';
import PriorityView from './components/PriorityView/PriorityView';
import './App.css';

// Dados de exemplo para teste
const prioridadesExemplo = [
  {
    id: '1',
    descricao: 'Agendar consulta médica',
    area: 'saude',
    nivel: 'alta',
    status: 'pendente',
    subtarefas: ['Verificar agenda', 'Ligar para consultório'],
    notas_neuro: 'Melhor horário: manhã',
  },
  {
    id: '2',
    descricao: 'Estudar para concurso',
    area: 'estudos',
    nivel: 'alta',
    status: 'em_andamento',
    subtarefas: ['Revisar matemática', 'Fazer exercícios'],
    notas_neuro: 'Usar técnica Pomodoro',
  },
];

function App() {
  const handlePrioridadeChange = (id, changes) => {
    // eslint-disable-next-line no-console
    console.log('Prioridade alterada:', id, changes);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Organizador Pessoal TDAH</h1>
      </header>
      <main>
        <PriorityView
          prioridades={prioridadesExemplo}
          onPrioridadeChange={handlePrioridadeChange}
        />
      </main>
    </div>
  );
}

export default App;
