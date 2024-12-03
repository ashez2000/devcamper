# Devcamper

RESTful API for a bootcamp directory platform, enabling users to manage bootcamps, courses, reviews, and user profiles.

[swagger docs](https://devcamper-bboj.onrender.com)

## Run locally

```bash
# Setup .env
cp .env.example .env

npm install
npm run build
npm start

# Run in development
npm run dev
```

## Environment variables

```
PORT = 3000
NODE_ENV = "development"
MONGO_URI = "mongodb://localhost:27017/devcamper"
JWT_SECRET = "somethingsecret"
JWT_EXPIRE = "1h"
```

## Seed data

```bash
# import data
npm run seed -- -i

# destroy data
npm run seed -- -d
```

## Docker script

> NOTE: set environment variable in .env.production for docker build. Docker build uses the .env.production.local for easy setting of environment vaiables in docker

```bash
docker build -t devcamper . && docker run --name devcamper -p 3000:3000 -d devcamper
docker container rm devcamper && docker rmi devcamper
```
