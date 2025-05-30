# Use Node.js LTS as the base image
FROM node:23-alpine

# Set working directory
WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install --force

RUN npx update-browserslist-db@latest

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]