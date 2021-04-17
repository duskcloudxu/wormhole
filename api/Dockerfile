FROM mhart/alpine-node:12

RUN npm install --global nodemon

WORKDIR /api

COPY package*.json /api/

RUN npm install

COPY . /api/

EXPOSE 8080

CMD ["npm","start"]



