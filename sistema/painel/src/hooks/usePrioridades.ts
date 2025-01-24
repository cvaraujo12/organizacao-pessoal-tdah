import { useCallback } from 'react';
import { Prioridade } from '../types';
import { useApp } from '../contexts/AppContext';

export function usePrioridades() {
  const { estado, dispatch } = useApp();

  const adicionarPrioridade = useCallback((novaPrioridade: Omit<Prioridade, 'id'>) => {
    const id = crypto.randomUUID();
    dispatch({
      type: 'ATUALIZAR_PRIORIDADES',
      payload: [...estado.prioridades, { ...novaPrioridade, id }],
    });
  }, [estado.prioridades, dispatch]);

  const atualizarPrioridade = useCallback((id: string, alteracoes: Partial<Prioridade>) => {
    dispatch({
      type: 'ATUALIZAR_PRIORIDADES',
      payload: estado.prioridades.map(p => 
        p.id === id ? { ...p, ...alteracoes } : p
      ),
    });
  }, [estado.prioridades, dispatch]);

  const removerPrioridade = useCallback((id: string) => {
    dispatch({
      type: 'ATUALIZAR_PRIORIDADES',
      payload: estado.prioridades.filter(p => p.id !== id),
    });
  }, [estado.prioridades, dispatch]);

  return {
    prioridades: estado.prioridades,
    adicionarPrioridade,
    atualizarPrioridade,
    removerPrioridade,
  };
} 