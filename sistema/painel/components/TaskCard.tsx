'use client'

import { useState } from 'react'
import { Button } from './ui/Button'
import { Task } from '@/types/task'

interface TaskCardProps {
  task: Task
  onComplete: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (task: Task) => void
}

export function TaskCard({ task, onComplete, onDelete, onEdit }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)

  const handleSave = () => {
    onEdit({ ...task, title: editedTitle })
    setIsEditing(false)
  }

  return (
    <div className={`task-card priority-${task.priority}`}>
      <div className="flex items-start justify-between">
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full p-2 border rounded"
            autoFocus
          />
        ) : (
          <div className="flex-1">
            <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </h3>
            <p className="text-sm text-gray-600">{task.description}</p>
            {task.dueDate && (
              <p className="text-xs text-gray-500 mt-1">
                Prazo: {new Date(task.dueDate).toLocaleDateString('pt-BR')}
              </p>
            )}
          </div>
        )}

        <div className="flex gap-2 ml-4">
          {isEditing ? (
            <>
              <Button size="sm" onClick={handleSave}>
                Salvar
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
            </>
          ) : (
            <>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditing(true)}
              >
                Editar
              </Button>
              <Button
                size="sm"
                variant={task.completed ? 'ghost' : 'default'}
                onClick={() => onComplete(task.id)}
              >
                {task.completed ? 'Desfazer' : 'Concluir'}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDelete(task.id)}
              >
                Excluir
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
} 