import { expect, test } from 'vitest'
import supertest from 'supertest'
import { app } from './app'

test('GET /health', async () => {
  const res = await supertest(app).get('/health')
  expect(res.status).toBe(200)
})
