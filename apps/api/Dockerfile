FROM node:18.16.0-alpine

WORKDIR /api

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .

RUN npx prisma generate

CMD [ "node", "./main.js" ]