FROM node:19-alpine

WORKDIR /usr/app/server

COPY package*.json .
COPY tsconfig.json .

RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

COPY . .

EXPOSE 4000

CMD ["npm", "start"]