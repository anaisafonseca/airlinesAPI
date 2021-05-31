FROM node:10-alpine

RUN apk update

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY ormconfig.js ./
COPY src /app

RUN ls -a
RUN npm install

RUN npm run build

EXPOSE 5000