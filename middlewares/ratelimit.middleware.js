const rateLimit = require('express-rate-limit')

// windowMs : mins
// max : req per min

const limitter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100
})

module.exports = limitter
