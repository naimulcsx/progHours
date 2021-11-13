FROM node:16.13.0-alpine
USER node
WORKDIR /home/node/client
COPY package.json .
RUN yarn
COPY . ./
ENV PORT 3000
EXPOSE $PORT
CMD ["yarn", "dev"]
