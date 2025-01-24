import { render, screen, fireEvent } from '@testing-library/react'
import { TaskCard } from './TaskCard'
import { Task } from '@/types/task'

const mockTask: Task = {
  id: '1',
  title: 'Test Task',
  description: 'Test Description',
  completed: false,
  priority: 'medium',
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: 'user1',
}

describe('TaskCard', () => {
  const mockOnComplete = jest.fn()
  const mockOnDelete = jest.fn()
  const mockOnEdit = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders task details correctly', () => {
    render(
      <TaskCard
        task={mockTask}
        onComplete={mockOnComplete}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )

    expect(screen.getByText('Test Task')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('handles task completion', () => {
    render(
      <TaskCard
        task={mockTask}
        onComplete={mockOnComplete}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )

    fireEvent.click(screen.getByText('Concluir'))
    expect(mockOnComplete).toHaveBeenCalledWith('1')
  })

  it('handles task deletion', () => {
    render(
      <TaskCard
        task={mockTask}
        onComplete={mockOnComplete}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )

    fireEvent.click(screen.getByText('Excluir'))
    expect(mockOnDelete).toHaveBeenCalledWith('1')
  })

  it('enters edit mode and saves changes', () => {
    render(
      <TaskCard
        task={mockTask}
        onComplete={mockOnComplete}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )

    // Enter edit mode
    fireEvent.click(screen.getByText('Editar'))
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()

    // Edit title
    fireEvent.change(input, { target: { value: 'Updated Task' } })
    
    // Save changes
    fireEvent.click(screen.getByText('Salvar'))
    expect(mockOnEdit).toHaveBeenCalledWith({
      ...mockTask,
      title: 'Updated Task',
    })
  })

  it('cancels edit mode without saving', () => {
    render(
      <TaskCard
        task={mockTask}
        onComplete={mockOnComplete}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )

    // Enter edit mode
    fireEvent.click(screen.getByText('Editar'))
    const input = screen.getByRole('textbox')

    // Edit title
    fireEvent.change(input, { target: { value: 'Updated Task' } })
    
    // Cancel edit
    fireEvent.click(screen.getByText('Cancelar'))
    expect(mockOnEdit).not.toHaveBeenCalled()
    expect(screen.getByText('Test Task')).toBeInTheDocument()
  })

  it('applies correct priority class', () => {
    render(
      <TaskCard
        task={mockTask}
        onComplete={mockOnComplete}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )

    const taskCard = screen.getByText('Test Task').closest('.task-card')
    expect(taskCard).toHaveClass('priority-medium')
  })

  it('shows completed task styling', () => {
    const completedTask = { ...mockTask, completed: true }
    render(
      <TaskCard
        task={completedTask}
        onComplete={mockOnComplete}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )

    const title = screen.getByText('Test Task')
    expect(title).toHaveClass('line-through')
    expect(title).toHaveClass('text-gray-500')
  })
}) 