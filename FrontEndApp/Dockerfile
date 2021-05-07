FROM node:latest

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY v1-react/package.json /usr/src/app/

RUN npm install

COPY v1-react/ .

EXPOSE 3000
