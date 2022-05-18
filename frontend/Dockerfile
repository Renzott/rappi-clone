FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN chown -R node:node /app/node_modules

EXPOSE 3000

CMD ["npm", "start"]