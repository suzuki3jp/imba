# Base image
FROM node:20-alpine AS builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Install pnpm
RUN npm i -g pnpm

# Copy package.json & pnpm-lock.yaml to the container
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the source code to the container
COPY . .

# Build the source code
RUN pnpm run build

# Base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Install pnpm
RUN npm i -g pnpm

# Copy the JavaScript source code from build stage
COPY --from=builder /usr/src/app/package.json /usr/src/app/pnpm-lock.yaml ./
COPY --from=builder /usr/src/app/dist ./dist

# Install production dependencies
RUN pnpm install --prod --frozen-lockfile

# Start the app
CMD [ "pnpm", "run", "start" ]