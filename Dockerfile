#react block
FROM node:alpine
WORKDIR /gamezone_view
COPY package*.json ./
RUN npm ci
copy ./ ./



CMD ["npm", "start"]