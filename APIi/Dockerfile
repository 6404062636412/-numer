
FROM node:18

WORKDIR /api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5555

CMD ["node", "testapi.js"]
