FROM node:8.1.4-alpine

# For build with no dev dependency
ENV NODE_ENV production

RUN apk update \
    && apk add curl \
    && mkdir -p /usr/src/app

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN npm install express redis pino

USER nobody
CMD [ "node", "app.js" ]