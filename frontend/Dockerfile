FROM node:10

ARG RUNNING_ENVIRONMENT

EXPOSE 8080
WORKDIR /usr/src/app

RUN npm install -g serve
RUN npm install -g @angular/cli

COPY package*.json ./
RUN npm ci

COPY . .
RUN ng build --prod --aot

CMD serve -p 8080 -s build
