# Anicore

**Anicore** is a simple anime directory app

## :package: Installation

Clone this repository into your local machine, then:

NPM:

```sh
$ npm install
```

Yarn:

```sh
$ yarn install
```

copy the env file

```sh
$ cp .env.example .env
```

and run it

```sh
$ npm run dev // or yarn dev
```

You can also build the image with docker:

```sh
$ docker build -t anicore:dev .
```

and run it

```sh
$ docker run \
    -it \
    --rm \
    -v ${PWD}:/app \
    -v /app/node_modules \
    -p 3001:3000 \
    -e CHOKIDAR_USEPOLLING=true \
    anicore:dev
```
