FROM node:14

WORKDIR /usr/src/debtbook

COPY package*.json ./

RUN npm install ci --only=production

COPY ./public ./public

EXPOSE 8080

CMD [ "npm", "run start" ]