# base node image
FROM node:20-bookworm-slim as base

ENV NODE_ENV production
RUN apt-get update && apt-get install -y openssl

ENV DATABASE_URL="file:/app/data/sqlite.db"

# npm dependencies including dev dependencies
FROM base as deps

WORKDIR /app

ADD package.json package-lock.json ./
RUN npm install --include=dev

# npm production dependencies
FROM base as production-deps

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
ADD package.json package-lock.json ./
RUN npm prune --omit=dev

# app build
FROM base as build

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
ADD package.json ./
ADD . .
RUN npm run db:generate
RUN npm run build

# final production image
FROM base

WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
COPY --from=build /app/db /app/db
COPY --from=build /app/package.json /app/package.json

VOLUME [ "/app/data" ]

RUN npm run db:push

EXPOSE 3000
CMD ["npm", "start"]
