import rateLimit from 'express-rate-limit'
import config from '../config'

export default rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMax,
  handler: (_, res) => {
    res.status(429).json({
      message: `You have exceeded the api limit`,
    })
  },
})
