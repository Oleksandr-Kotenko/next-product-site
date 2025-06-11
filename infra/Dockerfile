FROM node:18-alpine AS base

# Install required dependencies for canvas and other native modules
RUN apk update && apk add --no-cache \
    libc6-compat \
    bash \
    python3 \
    make \
    g++ \
    pixman-dev \
    cairo-dev \
    pango-dev \
    jpeg-dev \
    giflib-dev \
    librsvg-dev

RUN corepack enable && \
    corepack prepare pnpm@8 --activate && \
    pnpm config set script-shell "/bin/bash"


FROM base AS builder

WORKDIR /app

# Copy only necessary files for dependency installation
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
#COPY .husky/install.mjs ./.husky/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
#COPY services/app/ ./services/app/
#COPY libs/ ./libs/

# Build the application
RUN pnpm app run build


FROM base AS dev
WORKDIR /app
COPY . .
RUN pnpm install

EXPOSE 3000

CMD ["pnpm", "app", "run", "dev", "--hostname", "0.0.0.0"]

