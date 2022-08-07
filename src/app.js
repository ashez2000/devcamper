const express = require('express');
const path = require('path');
const cors = require('cors');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const fileupload = require('express-fileupload');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');

const errorHandler = require('./middlewares/error.middleware');
const rateLimit = require('./middlewares/ratelimit.middleware');

const bootcamps = require('./routers/bootcamp.router');
const courses = require('./routers/course.router');
const auth = require('./routers/auth.router');
const users = require('./routers/user.router');
const reviews = require('./routers/review.router');

const app = express();

app.use(express.json());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(rateLimit);
app.use(hpp());
app.use(cors());
app.use(fileupload());

app.get('/', (req, res) => {
  res.render('index.html');
});

app.use('/api/bootcamps', bootcamps);
app.use('/api/courses', courses);
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/reviews', reviews);

app.all('*', (req, res, next) => {
  res
    .status(404)
    .json({
      success: false,
      error: `Can't find ${req.originalUrl} on this server!`,
    });
});

app.use(errorHandler);

module.exports = app;
