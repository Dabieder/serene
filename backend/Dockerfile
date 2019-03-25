FROM node:10

EXPOSE 8080
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

CMD npm start
