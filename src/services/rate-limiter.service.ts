import rateLimit from 'express-rate-limit'

export default rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX),
    handler: (req, res) => {
        res.status(429).json({
            message: `You have exceeded the ${process.env.RATE_LIMIT_MAX} requests in ${process.env.RATE_LIMIT_WINDOW}m limit!`,
        })
    },
})
