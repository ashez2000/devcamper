const rateLimit = require('express-rate-limit')

const limitter = rateLimit({
  windowMs: process.env.RATE_LIMIT_TIME,
  max: process.env.RATE_LIMIT_MAX,
})

module.exports = limitter
