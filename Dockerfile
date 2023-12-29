FROM node:lts-buster

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose port 3002
EXPOSE 3002

# Build and start the app
CMD npm run dev:build && npm run dev:serve