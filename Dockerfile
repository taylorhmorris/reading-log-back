FROM node:lts-alpine
WORKDIR /app
EXPOSE $PORT

CMD npm install && \
  npm run start:dev
