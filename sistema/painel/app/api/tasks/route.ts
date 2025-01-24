import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  dueDate: z.string().datetime().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

export async function GET(req: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const completed = searchParams.get('completed')
    const priority = searchParams.get('priority')
    const category = searchParams.get('category')

    const tasks = await prisma.task.findMany({
      where: {
        userId: session.user.id,
        ...(completed !== null && { completed: completed === 'true' }),
        ...(priority && { priority }),
        ...(category && { category }),
      },
      include: {
        subTasks: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(tasks)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const validatedData = taskSchema.parse(body)

    const task = await prisma.task.create({
      data: {
        ...validatedData,
        userId: session.user.id,
      },
    })

    return NextResponse.json(task)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse('Invalid request data', { status: 400 })
    }
    console.error('Error creating task:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const taskId = searchParams.get('id')
    if (!taskId) {
      return new NextResponse('Task ID is required', { status: 400 })
    }

    const body = await req.json()
    const validatedData = taskSchema.partial().parse(body)

    const task = await prisma.task.update({
      where: {
        id: taskId,
        userId: session.user.id,
      },
      data: validatedData,
    })

    return NextResponse.json(task)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse('Invalid request data', { status: 400 })
    }
    console.error('Error updating task:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const taskId = searchParams.get('id')
    if (!taskId) {
      return new NextResponse('Task ID is required', { status: 400 })
    }

    await prisma.task.delete({
      where: {
        id: taskId,
        userId: session.user.id,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting task:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 