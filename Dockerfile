# base node image
FROM node:20-bookworm-slim as base

ENV NODE_ENV production
RUN apt-get update && apt-get install -y openssl
RUN corepack enable

ENV DATABASE_URL="file:/app/data/sqlite.db"

# npm dependencies including dev dependencies
FROM base as deps

ENV NODE_ENV development
WORKDIR /app
ADD package.json pnpm-lock.yaml ./
RUN pnpm install

# npm production dependencies
FROM base as production-deps

WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD package.json pnpm-lock.yaml ./
RUN pnpm install

# app build
FROM base as build

WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=deps /app/package.json /app/package.json
ADD . .
RUN pnpm prisma generate
RUN pnpm build

# final production image
FROM base

WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
COPY --from=build /app/prisma /app/prisma
COPY --from=build /app/package.json /app/package.json

RUN pnpm prisma generate
VOLUME [ "/app/data" ]

EXPOSE 3000
CMD ["pnpm", "start"]
