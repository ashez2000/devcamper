FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./
COPY .env.production.local .env
COPY --from=build /app/dist /app/dist
RUN npm install --only=production

CMD ["npm", "start"]
