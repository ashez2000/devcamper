import { test, expect } from 'vitest'
import supertest from 'supertest'

import app from '@/app'

test('GET /health', async () => {
  const res = await supertest(app).get('/health')
  expect(res.status).toEqual(200)
  expect(res.text).toEqual('OK')
})
