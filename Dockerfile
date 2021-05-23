FROM node:latest AS node_base
RUN echo "NODE Version:" && node --version
RUN echo "NPM Version:" && npm --version

FROM nginx:latest
COPY --from=node_base . .
WORKDIR /app
RUN mkdir /app/frontend
RUN mkdir /app/server
RUN apt-get upgrade
RUN apt-get update
RUN npm install -g npm@7.14.0 --loglevel=error
RUN adduser --no-create-home --system --group --shell /bin/false nginx
COPY ./nginx-forward-conf /etc/nginx/sites-available/default
COPY ./nginx-forward-conf /etc/nginx/sites-enabled/default
RUN service nginx restart
RUN npm i -g pm2
RUN npm i -g nodemon
#install yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt update
RUN apt install --no-install-recommends yarn

COPY . /app

#EXPOSE ${PGSQL_PORT}

#prod
#CMD ["pm2-runtime", "/app/server/bin/www"]
#dev
#CMD ["nodemon", "/app/server/bin/www"]
