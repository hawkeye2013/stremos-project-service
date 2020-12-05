FROM node:14-alpine3.12
RUN apk update && apk add curl

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

CMD [ "node", "server.js" ]