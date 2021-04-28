FROM mhart/alpine-node:12

RUN npm install

WORKDIR /client

COPY package*.json /client/

RUN npm install

COPY . /client/

EXPOSE 3000

CMD ["npm","start"]



