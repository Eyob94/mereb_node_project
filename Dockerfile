FROM node:lts-alpine

WORKDIR /usr/app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]

