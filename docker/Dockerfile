FROM node:20.10-buster

RUN npm install -g npm@10.1.0

WORKDIR /app

COPY apps/ .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]