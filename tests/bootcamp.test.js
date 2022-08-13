const app = require('../src/app')
const request = require('supertest')

describe('bootcamp', () => {
  describe('get bootcamp route', () => {
    describe('for invalid id', () => {
      it('should return 404', async () => {
        const res = await request(app).get('/bootcamp/1')
        expect(res.statusCode).toBe(404)
      })
    })
  })
})
1
