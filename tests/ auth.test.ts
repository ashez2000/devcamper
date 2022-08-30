import { describe, test, vi, expect } from 'vitest'
import request from 'supertest'

import app from '../src/app'

describe('Auth', () => {
  test('invalid signup', async () => {
    const res = await request(app).post('/api/v1/auth/signup').send({
      email: '',
      password: '',
    })

    expect(res.status).toBe(400)
  })

  test('invalid signin', async () => {
    const res = await request(app).post('/api/v1/auth/signin').send({
      email: '',
      password: '',
    })

    expect(res.status).toBe(400)
  })
})
