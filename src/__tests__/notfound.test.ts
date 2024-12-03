import { test, assert } from 'vitest'
import supertest from 'supertest'
import app from '../app'

test('Unknown route', async () => {
  const res = await supertest(app).get('/unknown-route')
  assert.equal(res.status, 404)
})
