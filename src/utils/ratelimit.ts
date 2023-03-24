import ratelimit from 'express-rate-limit';
import config from '../config';

const limitter = ratelimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: config.RATE_LIMIT_MAX,
  message: {
    error: 'Too many requests, please try again after 15 minutes',
  },
});

export default limitter;
