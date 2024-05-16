# Set up container with dependencies
FROM node:lts-alpine AS base

WORKDIR /app


# Run web application in development env
FROM base AS dev

CMD ["npm", "run", "dev"]


# Run web application in production env
FROM base AS prod

COPY . .
RUN npm install
RUN npm run build

CMD ["npm", "start"]
