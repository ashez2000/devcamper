import { test, assert } from 'vitest'
import supertest from 'supertest'
import mongoose from 'mongoose'

import { dropDb, createJohnDoe } from './db.util'
import app from '../app'

test('POST /auth/login, with valid credentials', async () => {
  await mongoose.connect('mongodb://localhost:27017/devcamper_test')
  await dropDb()
  const user = await createJohnDoe()

  const res = await supertest(app).post('/api/v1/auth/login').send({
    email: user.email,
    password: '1234',
  })

  assert.equal(res.status, 200)
})

test('POST /auth/login, with valid email', async () => {
  await mongoose.connect('mongodb://localhost:27017/devcamper_test')
  await dropDb()
  await createJohnDoe()

  const res = await supertest(app).post('/api/v1/auth/login').send({
    email: 'invalid@gmail.com',
    password: '1234',
  })

  assert.equal(res.status, 401)
})

test('POST /auth/login, with valid password', async () => {
  await mongoose.connect('mongodb://localhost:27017/devcamper_test')
  await dropDb()
  const user = await createJohnDoe()

  const res = await supertest(app).post('/api/v1/auth/login').send({
    email: user.email,
    password: 'invaliad password',
  })

  assert.equal(res.status, 401)
})
