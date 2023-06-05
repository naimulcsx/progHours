FROM node:18-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
CMD [ "node", "main.js" ]