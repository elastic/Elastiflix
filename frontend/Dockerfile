FROM node:23-alpine

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install --force

RUN npx update-browserslist-db@latest

COPY . .

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]