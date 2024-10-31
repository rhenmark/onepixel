FROM node:22-alpine
WORKDIR /src
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run build
CMD ["npm", "start", "install"]