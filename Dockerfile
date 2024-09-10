FROM node:lts

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g typescript

RUN npm run build

RUN npm run seed

EXPOSE 3001

CMD ["npm", "run", "dev"]
