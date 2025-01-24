import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { EstadoGlobal, AcaoEstado } from '../types';

const estadoInicial: EstadoGlobal = {
  usuario: null,
  prioridades: [],
  carregando: false,
  erro: null,
};

const AppContext = createContext<{
  estado: EstadoGlobal;
  dispatch: React.Dispatch<AcaoEstado>;
} | undefined>(undefined);

function appReducer(estado: EstadoGlobal, acao: AcaoEstado): EstadoGlobal {
  switch (acao.type) {
    case 'DEFINIR_USUARIO':
      return { ...estado, usuario: acao.payload };
    case 'ATUALIZAR_PRIORIDADES':
      return { ...estado, prioridades: acao.payload };
    case 'DEFINIR_CARREGANDO':
      return { ...estado, carregando: acao.payload };
    case 'DEFINIR_ERRO':
      return { ...estado, erro: acao.payload };
    default:
      return estado;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [estado, dispatch] = useReducer(appReducer, estadoInicial);

  return (
    <AppContext.Provider value={{ estado, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp deve ser usado dentro de um AppProvider');
  }
  return context;
} 