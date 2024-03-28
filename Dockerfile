FROM node:alpine

RUN mkdir -p /app
WORKDIR /app

RUN apk add --no-cache g++ make python3 py3-pip libc6-compat
COPY package*.json /app
RUN npm install
COPY . /app

EXPOSE 3000

CMD ["npm", "run", "dev"]
