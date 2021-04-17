# Wormhole

Wormhole is a website frame that built to provide async encryption service to those who know little knowledge about encrypted communication. We aim to build a framework that only for small amount of users and easy to host on any VPS. 

## Devs Instruction

This project is based on `Docker`, you should install docker first before contributing.

With `Docker` installed, make sure there is no program running on your `27107` and `8080` port, then:

run

```bash
docker-compose build
```

to build up your container.

Then run

```bash
docker-compose up
```

To run your container. 

Access `http://localhost:8080/`, you can see the hello world page.

For database, we use `MongoDB` and it's mapped from container to your localhost `27107` port, you can use any IDE to monitor the project with credentials provided.

For database interaction you might want to use `mongoose`

### Resources for using mongoose

- https://mongoosejs.com/docs/connections.html
- https://github.com/maitraysuthar/rest-api-nodejs-mongodb

