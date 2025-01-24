/**
 * @jest-environment node
 * @jest-environment-options {"setupFiles": ["<rootDir>/jest.setup.database.js"]}
 */

import { prisma } from '../prisma'
import connectDB from '../mongodb'
import mongoose from 'mongoose'

describe('Database Connection', () => {
  beforeAll(async () => {
    // Conecta ao MongoDB
    await connectDB()
  })

  afterAll(async () => {
    // Fecha as conexões
    await prisma.$disconnect()
    await mongoose.connection.close()
  })

  it('deve conectar ao MongoDB via Mongoose', () => {
    expect(mongoose.connection.readyState).toBe(1)
  })

  it('deve conectar ao MongoDB via Prisma', async () => {
    const result = await prisma.$runCommandRaw({ ping: 1 })
    expect(result).toEqual({ ok: 1 })
  })
}) 