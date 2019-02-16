# hack-nyu
This repository contains the code for <b>problem-overflow</b> plateform developed [@hack-nyu](https://hacknyu.org/)

## Setup instructions
Assuming you have [yarn](https://yarnpkg.com/lang/en/docs/install), [docker](https://docs.docker.com/) & docker-compose installed on your machine.

```
cd hack-nyu
```

### Install npm dependencies
```
yarn install
```

### To start and load the front-end app from docker container. 
```
yarn run build
docker-compose up --build
```
You will be able to access the app on http://localhost:4000

### To run UI in webpack-dev-server & backend in docker container.
```
docker-compose up --build
yarn run serve
```
You will be able to access the app on http://localhost:8080


