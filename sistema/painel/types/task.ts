export type TaskPriority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: TaskPriority
  dueDate?: Date
  createdAt: Date
  updatedAt: Date
  userId: string
  tags?: string[]
  category?: string
  subTasks?: SubTask[]
}

export interface SubTask {
  id: string
  title: string
  completed: boolean
  taskId: string
}

export interface TaskFilters {
  completed?: boolean
  priority?: TaskPriority
  category?: string
  tags?: string[]
  dueDate?: Date
  search?: string
} 