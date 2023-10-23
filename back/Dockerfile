FROM node:latest
WORKDIR /usr/src
COPY package*.json ./
# RUN npm ci
COPY . .
CMD ["npm", "run", "start"]
