FROM node:19-alpine

WORKDIR /usr/app/front-end

COPY package*.json ./

RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

COPY . .

CMD ["npm", "start"]