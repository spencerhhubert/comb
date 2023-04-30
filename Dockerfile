FROM ubuntu:latest

RUN apt-get update && \
    apt-get install -y nodejs npm

RUN mkdir /app
WORKDIR /app

COPY package.json .
RUN npm install

COPY index.html .
COPY style.css .
COPY server.js .
COPY index.js .

EXPOSE 3000

CMD ["node", "server.js"]

