FROM node:17.3.1-alpine

# Set destination for COPY
WORKDIR /app

# Copy the dependency requirements
COPY package.json ./
COPY yarn.lock ./

# Copy the source code
COPY app.js ./
COPY db/db.js db/db.js
COPY db/setup.js db/setup.js

# Install dependencies
RUN yarn install

# This is for documentation purposes only.
# To actually open the port, runtime parameters
# must be supplied to the docker command.
EXPOSE 8131

# Run
CMD [ "yarn", "start" ]