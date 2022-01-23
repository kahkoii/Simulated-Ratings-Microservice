# Stage 1: Build from source code
FROM node:17.3.1-alpine AS builder

# Set destination for COPY
WORKDIR /app

# Copy the dependency requirements
COPY package.json ./
COPY yarn.lock ./

# Copy the source code
COPY src ./src
COPY public ./public
COPY tsconfig.json tsconfig.json

# Install dependencies
RUN yarn install --prod

# Build project
RUN yarn build

## Stage 2: Deploy without source files
FROM node:17.3.1-alpine
WORKDIR /frontend
RUN yarn global add serve
COPY --from=builder /app/build ./build
EXPOSE 8130:3000

# Run
CMD [ "serve", "-s", "build" ]