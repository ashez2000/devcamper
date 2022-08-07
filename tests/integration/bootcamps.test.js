require('dotenv').config()

const app = require('../../src/app')
const mongooose = require('mongoose')
const request = require('supertest')

beforeAll(() => {
  mongooose.connect(process.env.MONGO_URI)
})

afterAll(() => {
  mongooose.disconnect()
})

describe('GET /bootcamps', () => {
  it('should get all bootcamps', async () => {
    const res = await request(app).get('/api/v1/bootcamps')
    expect(res.statusCode).toBe(200)
    expect(res.body.bootcamps).toBeDefined()
  })
})
