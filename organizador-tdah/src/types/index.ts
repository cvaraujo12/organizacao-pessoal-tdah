export interface Prioridade {
  id: string;
  descricao: string;
  area: string;
  nivel: 'baixa' | 'media' | 'alta';
  status: 'pendente' | 'em_andamento' | 'concluida';
  subtarefas: string[];
  notas_neuro: string;
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  preferencias: {
    tema: 'claro' | 'escuro';
    notificacoes: boolean;
    intervaloPomodoroMinutos: number;
  };
}

export interface EstadoGlobal {
  usuario: Usuario | null;
  prioridades: Prioridade[];
  carregando: boolean;
  erro: string | null;
}

export type AcaoEstado = 
  | { type: 'DEFINIR_USUARIO'; payload: Usuario }
  | { type: 'ATUALIZAR_PRIORIDADES'; payload: Prioridade[] }
  | { type: 'DEFINIR_CARREGANDO'; payload: boolean }
  | { type: 'DEFINIR_ERRO'; payload: string | null }; 