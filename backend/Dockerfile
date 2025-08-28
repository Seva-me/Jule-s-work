# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy root package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Copy backend package.json
COPY backend/package.json ./backend/

# Install dependencies
# Using --omit=dev which is the new way for --production in npm v7+
# Also running it for the backend workspace only
RUN npm install --workspace=backend --omit=dev

# Copy the rest of the backend source code
COPY backend/ ./backend/

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define the command to run the app
# We use the backend workspace's start script
CMD [ "npm", "start", "-w", "backend" ]
