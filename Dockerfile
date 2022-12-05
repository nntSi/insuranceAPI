FROM node:16

WORKDIR /app

COPY package.json /app/
RUN npm install

COPY . /app

EXPOSE 3000

RUN npm install pm2 -g
RUN pm2 start server.js --watch
CMD [ "pm2-runtime", "server.js" ]