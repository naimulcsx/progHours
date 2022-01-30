FROM node:16.13.0-alpine
# Set user and working directory
# Working directory needs to be under /home/node
USER node
WORKDIR /home/node/client
COPY --chown=node:node package.json .
# Install node dependencies
RUN yarn install
COPY . ./
COPY --chown=node:node . .
CMD ["yarn", "dev", "--host"]
