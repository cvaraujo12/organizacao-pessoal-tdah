import React from 'react';
import { Prioridade } from '../../../types';

interface PrioridadeCardProps {
  prioridade: Prioridade;
  onEditar?: (id: string) => void;
  onRemover?: (id: string) => void;
}

export function PrioridadeCard({ prioridade, onEditar, onRemover }: PrioridadeCardProps) {
  const { id, descricao, area, nivel, status, subtarefas, notas_neuro } = prioridade;

  const getNivelClass = () => {
    switch (nivel) {
      case 'alta':
        return 'bg-red-100 text-red-800';
      case 'media':
        return 'bg-yellow-100 text-yellow-800';
      case 'baixa':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{descricao}</h3>
        <span className={`px-2 py-1 rounded-full text-sm ${getNivelClass()}`}>
          {nivel}
        </span>
      </div>
      
      <div className="text-sm text-gray-600 mb-2">
        <p>Área: {area}</p>
        <p>Status: {status}</p>
      </div>

      {subtarefas.length > 0 && (
        <div className="mb-2">
          <p className="font-medium mb-1">Subtarefas:</p>
          <ul className="list-disc list-inside text-sm">
            {subtarefas.map((tarefa, index) => (
              <li key={index}>{tarefa}</li>
            ))}
          </ul>
        </div>
      )}

      {notas_neuro && (
        <div className="text-sm text-gray-600 italic mb-2">
          <p>Notas: {notas_neuro}</p>
        </div>
      )}

      <div className="flex justify-end gap-2 mt-4">
        {onEditar && (
          <button
            onClick={() => onEditar(id)}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Editar
          </button>
        )}
        {onRemover && (
          <button
            onClick={() => onRemover(id)}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            Remover
          </button>
        )}
      </div>
    </div>
  );
} 