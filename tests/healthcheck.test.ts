import { test, assert } from 'vitest'
import supertest from 'supertest'
import app from '@/app'

test('GET /healthcheck', async () => {
  const res = await supertest(app).get('/healthcheck')
  assert.equal(res.status, 200)
  assert.equal(res.text, 'OK')
})
