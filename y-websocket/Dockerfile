# Use official lightweight Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Expose WebSocket port
EXPOSE 1234

# Start y-websocket server
CMD ["node", "src/y-websocket.js"]