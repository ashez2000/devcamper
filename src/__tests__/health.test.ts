import { test, assert } from 'vitest'
import supertest from 'supertest'
import app from '../app'

test('GET /health', async () => {
  const res = await supertest(app).get('/health')
  assert.equal(res.status, 200)
})
