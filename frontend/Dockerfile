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

# Expose the port the app runs on
EXPOSE 3000

# Start the app in development mode
CMD ["npm", "start"]
