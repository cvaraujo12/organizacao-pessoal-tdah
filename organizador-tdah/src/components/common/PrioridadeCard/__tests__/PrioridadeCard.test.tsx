import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PrioridadeCard } from '../PrioridadeCard';
import type { Prioridade } from '../../../../types';

const mockPrioridade: Prioridade = {
  id: 'test-1',
  descricao: 'Teste de Prioridade',
  area: 'teste',
  nivel: 'alta',
  status: 'pendente',
  subtarefas: ['Subtarefa 1', 'Subtarefa 2'],
  notas_neuro: 'Nota de teste',
};

describe('PrioridadeCard', () => {
  it('deve renderizar todas as informações da prioridade', () => {
    render(<PrioridadeCard prioridade={mockPrioridade} />);

    expect(screen.getByText('Teste de Prioridade')).toBeInTheDocument();
    expect(screen.getByText('alta')).toBeInTheDocument();
    expect(screen.getByText('Área: teste')).toBeInTheDocument();
    expect(screen.getByText('Status: pendente')).toBeInTheDocument();
    expect(screen.getByText('Subtarefa 1')).toBeInTheDocument();
    expect(screen.getByText('Subtarefa 2')).toBeInTheDocument();
    expect(screen.getByText('Notas: Nota de teste')).toBeInTheDocument();
  });

  it('deve renderizar corretamente sem subtarefas', () => {
    const prioridadeSemSubtarefas = {
      ...mockPrioridade,
      subtarefas: [],
    };

    render(<PrioridadeCard prioridade={prioridadeSemSubtarefas} />);

    expect(screen.queryByText('Subtarefas:')).not.toBeInTheDocument();
  });

  it('deve renderizar corretamente sem notas', () => {
    const prioridadeSemNotas = {
      ...mockPrioridade,
      notas_neuro: '',
    };

    render(<PrioridadeCard prioridade={prioridadeSemNotas} />);

    expect(screen.queryByText('Notas:')).not.toBeInTheDocument();
  });

  it('deve chamar onEditar quando o botão editar é clicado', () => {
    const onEditar = jest.fn();
    render(<PrioridadeCard prioridade={mockPrioridade} onEditar={onEditar} />);

    fireEvent.click(screen.getByText('Editar'));

    expect(onEditar).toHaveBeenCalledWith('test-1');
  });

  it('deve chamar onRemover quando o botão remover é clicado', () => {
    const onRemover = jest.fn();
    render(<PrioridadeCard prioridade={mockPrioridade} onRemover={onRemover} />);

    fireEvent.click(screen.getByText('Remover'));

    expect(onRemover).toHaveBeenCalledWith('test-1');
  });

  it('não deve renderizar botões quando handlers não são fornecidos', () => {
    render(<PrioridadeCard prioridade={mockPrioridade} />);

    expect(screen.queryByText('Editar')).not.toBeInTheDocument();
    expect(screen.queryByText('Remover')).not.toBeInTheDocument();
  });

  it('deve aplicar classes corretas para diferentes níveis de prioridade', () => {
    const niveis: Array<Prioridade['nivel']> = ['alta', 'media', 'baixa'];
    const classes = {
      alta: 'bg-red-100 text-red-800',
      media: 'bg-yellow-100 text-yellow-800',
      baixa: 'bg-green-100 text-green-800',
    };

    niveis.forEach(nivel => {
      const { container } = render(
        <PrioridadeCard prioridade={{ ...mockPrioridade, nivel }} />
      );

      const nivelElement = screen.getByText(nivel);
      expect(nivelElement.className).toContain(classes[nivel]);
    });
  });
}); 