FROM node:19-alpine AS base

WORKDIR /usr/app/server
EXPOSE 4000


FROM base AS production
COPY package*.json ./

ENV NODE_ENV=production
RUN npm ci
COPY . .
CMD ["npm", "start"]


FROM base AS dev
ENV NODE_ENV=development
COPY . .
# if node_modules is present, don't install packages, only run dev command
CMD [ -d "node_modules" ] && npm run dev || npm install && npm run dev