import { NextRequest } from 'next/server'
import { GET, POST, PUT, DELETE } from './route'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'

jest.mock('next-auth')
jest.mock('@/lib/prisma')

const mockSession = {
  user: {
    id: 'user1',
    email: 'test@example.com',
  },
}

const mockTask = {
  id: '1',
  title: 'Test Task',
  description: 'Test Description',
  completed: false,
  priority: 'medium',
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: 'user1',
}

describe('Tasks API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(getServerSession as jest.Mock).mockResolvedValue(mockSession)
  })

  describe('GET /api/tasks', () => {
    it('returns tasks for authenticated user', async () => {
      const mockTasks = [mockTask]
      ;(prisma.task.findMany as jest.Mock).mockResolvedValue(mockTasks)

      const req = new NextRequest(new URL('http://localhost/api/tasks'))
      const response = await GET(req)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual(mockTasks)
      expect(prisma.task.findMany).toHaveBeenCalledWith({
        where: { userId: 'user1' },
        include: { subTasks: true },
        orderBy: { createdAt: 'desc' },
      })
    })

    it('handles unauthorized requests', async () => {
      ;(getServerSession as jest.Mock).mockResolvedValue(null)

      const req = new NextRequest(new URL('http://localhost/api/tasks'))
      const response = await GET(req)

      expect(response.status).toBe(401)
    })
  })

  describe('POST /api/tasks', () => {
    it('creates a new task', async () => {
      ;(prisma.task.create as jest.Mock).mockResolvedValue(mockTask)

      const req = new NextRequest(new URL('http://localhost/api/tasks'), {
        method: 'POST',
        body: JSON.stringify({
          title: 'Test Task',
          description: 'Test Description',
          priority: 'medium',
        }),
      })

      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual(mockTask)
      expect(prisma.task.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          title: 'Test Task',
          description: 'Test Description',
          priority: 'medium',
          userId: 'user1',
        }),
      })
    })

    it('validates request data', async () => {
      const req = new NextRequest(new URL('http://localhost/api/tasks'), {
        method: 'POST',
        body: JSON.stringify({
          title: '', // Invalid: empty title
          priority: 'invalid', // Invalid: wrong priority
        }),
      })

      const response = await POST(req)
      expect(response.status).toBe(400)
    })
  })

  describe('PUT /api/tasks', () => {
    it('updates an existing task', async () => {
      const updatedTask = { ...mockTask, title: 'Updated Task' }
      ;(prisma.task.update as jest.Mock).mockResolvedValue(updatedTask)

      const req = new NextRequest(
        new URL('http://localhost/api/tasks?id=1'),
        {
          method: 'PUT',
          body: JSON.stringify({
            title: 'Updated Task',
          }),
        }
      )

      const response = await PUT(req)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual(updatedTask)
      expect(prisma.task.update).toHaveBeenCalledWith({
        where: { id: '1', userId: 'user1' },
        data: { title: 'Updated Task' },
      })
    })

    it('requires task ID', async () => {
      const req = new NextRequest(new URL('http://localhost/api/tasks'), {
        method: 'PUT',
        body: JSON.stringify({ title: 'Updated Task' }),
      })

      const response = await PUT(req)
      expect(response.status).toBe(400)
    })
  })

  describe('DELETE /api/tasks', () => {
    it('deletes a task', async () => {
      ;(prisma.task.delete as jest.Mock).mockResolvedValue(mockTask)

      const req = new NextRequest(
        new URL('http://localhost/api/tasks?id=1'),
        { method: 'DELETE' }
      )

      const response = await DELETE(req)
      expect(response.status).toBe(204)
      expect(prisma.task.delete).toHaveBeenCalledWith({
        where: { id: '1', userId: 'user1' },
      })
    })

    it('requires task ID', async () => {
      const req = new NextRequest(new URL('http://localhost/api/tasks'), {
        method: 'DELETE',
      })

      const response = await DELETE(req)
      expect(response.status).toBe(400)
    })
  })
}) 