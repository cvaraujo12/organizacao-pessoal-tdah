import { renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppProvider } from '../../contexts/AppContext';
import { usePrioridades } from '../usePrioridades';
import type { Prioridade } from '../../types';

const novaPrioridade: Omit<Prioridade, 'id'> = {
  descricao: 'Teste',
  area: 'teste',
  nivel: 'baixa',
  status: 'pendente',
  subtarefas: [],
  notas_neuro: '',
};

describe('usePrioridades', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve iniciar com lista vazia de prioridades', () => {
    const { result } = renderHook(() => usePrioridades(), {
      wrapper: AppProvider,
    });

    expect(result.current.prioridades).toHaveLength(0);
  });

  it('deve adicionar uma nova prioridade', () => {
    const { result } = renderHook(() => usePrioridades(), {
      wrapper: AppProvider,
    });

    act(() => {
      result.current.adicionarPrioridade(novaPrioridade);
    });

    expect(result.current.prioridades).toHaveLength(1);
    expect(result.current.prioridades[0].descricao).toBe('Teste');
    expect(result.current.prioridades[0].id).toBe('test-uuid-1');
  });

  it('deve atualizar uma prioridade existente', () => {
    const { result } = renderHook(() => usePrioridades(), {
      wrapper: AppProvider,
    });

    act(() => {
      result.current.adicionarPrioridade(novaPrioridade);
    });

    const id = result.current.prioridades[0].id;

    act(() => {
      result.current.atualizarPrioridade(id, {
        descricao: 'Atualizado',
        nivel: 'alta',
      });
    });

    expect(result.current.prioridades[0].descricao).toBe('Atualizado');
    expect(result.current.prioridades[0].nivel).toBe('alta');
    expect(result.current.prioridades[0].area).toBe('teste');
  });

  it('não deve alterar o estado ao atualizar prioridade inexistente', () => {
    const { result } = renderHook(() => usePrioridades(), {
      wrapper: AppProvider,
    });

    act(() => {
      result.current.adicionarPrioridade(novaPrioridade);
    });

    const estadoAnterior = [...result.current.prioridades];

    act(() => {
      result.current.atualizarPrioridade('id-inexistente', {
        descricao: 'Não deve atualizar',
      });
    });

    expect(result.current.prioridades).toEqual(estadoAnterior);
  });

  it('deve remover uma prioridade', () => {
    const { result } = renderHook(() => usePrioridades(), {
      wrapper: AppProvider,
    });

    act(() => {
      result.current.adicionarPrioridade(novaPrioridade);
    });

    const id = result.current.prioridades[0].id;

    act(() => {
      result.current.removerPrioridade(id);
    });

    expect(result.current.prioridades).toHaveLength(0);
  });

  it('deve manter múltiplas prioridades ordenadas', () => {
    const { result } = renderHook(() => usePrioridades(), {
      wrapper: AppProvider,
    });

    act(() => {
      result.current.adicionarPrioridade({ ...novaPrioridade, descricao: 'Primeira' });
    });
    act(() => {
      result.current.adicionarPrioridade({ ...novaPrioridade, descricao: 'Segunda' });
    });
    act(() => {
      result.current.adicionarPrioridade({ ...novaPrioridade, descricao: 'Terceira' });
    });

    expect(result.current.prioridades).toHaveLength(3);
    expect(result.current.prioridades.map(p => p.descricao)).toEqual([
      'Primeira',
      'Segunda',
      'Terceira'
    ]);
  });
}); 