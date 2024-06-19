FROM node:18-alpine

WORKDIR /react-docker-activities

COPY public/ /react-docker-activities/public
COPY src/ /react-docker-activities/src
COPY package.json /react-docker-activities/

RUN npm install

CMD ["npm", "start", "dev"]