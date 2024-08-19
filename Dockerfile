FROM node:16

WORKDIR /home/node/app

COPY package*.json ./
RUN npm install

COPY build build
COPY server.js server.js

# If you are building your code for production
# RUN npm ci --only=production

CMD [ "npm", "run", "server" ]
