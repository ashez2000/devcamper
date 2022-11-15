import ratelimit from 'express-rate-limit'

const limitter = ratelimit({
  windowMs: parseInt(process.env.RATE_LIMIT_TIME || '60000'),
  max: parseInt(process.env.RATE_LIMIT_MAX || '100'),
})

export default limitter
