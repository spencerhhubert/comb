FROM ubuntu:latest

RUN apt-get update && \
    apt-get install -y nodejs npm

COPY package.json .
RUN npm install

COPY index.html .
COPY style.css .
COPY server.js .
COPY index.js .

RUN mkdir /data

EXPOSE 3000

CMD ["node", "server.js"]

