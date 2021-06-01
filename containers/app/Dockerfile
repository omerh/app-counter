# FROM node:8.1.4-alpine
FROM node:16.2.0-alpine

# For build with no dev dependency
ENV NODE_ENV production

RUN mkdir -p /usr/src/app

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN npm install

USER nobody
CMD [ "node", "app.js" ]