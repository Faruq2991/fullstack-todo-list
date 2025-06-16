# Stage 1: Build Stage (if needed for transpilation or future tools)
FROM node:20-alpine AS builder

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application
COPY . .

# Stage 2: Production Stage
FROM node:20-alpine


# Set working directory
WORKDIR /app

# Copy only needed files from the builder
COPY --from=builder /app /app

# Expose the port used by your app
EXPOSE 5000

# Start the application
CMD ["node", "index.js"]