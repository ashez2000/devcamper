# Devcamper

Nodejs API service for organizing educational online bootcamps.

## Docker script

> NOTE: set environment variable in .env.production for docker build. Docker build uses the .env.production.local for easy setting of environment vaiables in docker

```bash
docker build -t devcamper . && docker run --name devcamper -p 3000:3000 -d devcamper
docker container rm devcamper && docker rmi devcamper
```
