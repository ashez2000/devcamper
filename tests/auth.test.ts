import { test, assert, vi, afterEach } from 'vitest'
import supertest from 'supertest'
import app from '@/app'

import * as userRepo from '@/repository/user'

afterEach(() => {
  vi.restoreAllMocks()
})

test('POST /auth/signup', async () => {
  const body = {
    name: 'Aswin',
    email: 'aswin@gmail.com',
    password: '123456',
    role: 'USER',
  }

  vi.spyOn(userRepo, 'create').mockImplementation(async () => {
    return {
      id: 'sdfasf',
      ...body,
    } as any
  })

  const res = await supertest(app).post('/api/v1/auth/signup').send(body)
  assert.equal(res.status, 201)
})
