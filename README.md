# docker-postgres-application
Application running express, react, and postgres services on docker

## Requires
- .env at root level for docker: pgAdmin4 (email, pass)
- .env at /server level: postgres credentials

## Start
- start docker daemon (docker desktop or equivalent linux docker start command)
- ```docker-compose up``` to build docker services and app
- ```yarn build:watch``` to build frontend react (copies into docker container)
