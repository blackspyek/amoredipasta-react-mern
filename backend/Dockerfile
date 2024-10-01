# Use the official Node.js image.
FROM node:21.7.3

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the local code to the container image.
COPY . .

# Install nodemon for development
RUN npm install -g nodemon

# Start the app with nodemon for development
CMD [ "npm", "run", "dev" ]
