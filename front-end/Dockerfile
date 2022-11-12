FROM node:19-alpine AS base

WORKDIR /usr/app/front-end
COPY package*.json ./


FROM base AS production
RUN npm ci --only=production
COPY . .
CMD ["npm", "start"]


FROM base AS dev
COPY . .
# if node_modules is present, don't install packages, only run start command
CMD [ -d "node_modules" ] && npm start || npm install && npm start