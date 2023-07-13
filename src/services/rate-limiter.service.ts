import rateLimit from 'express-rate-limit'
import { config } from '$/config'

export default rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  handler: (req, res) => {
    res.status(429).json({
      message: `You have exceeded the ${process.env.RATE_LIMIT_MAX} requests in ${process.env.RATE_LIMIT_WINDOW}m limit!`,
    })
  },
})
