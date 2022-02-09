# Set node image
FROM node:16-buster-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# The app is exposed on port 3000, see index.js
EXPOSE 3000

CMD ["node", "index.js"]
