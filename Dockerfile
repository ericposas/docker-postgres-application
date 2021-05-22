FROM node:latest AS node_base
RUN echo "NODE Version:" && node --version
RUN echo "NPM Version:" && npm --version

FROM nginx:latest
COPY --from=node_base . .
WORKDIR /
RUN mkdir /frontend
RUN mkdir /server
RUN apt-get upgrade
RUN apt-get update
RUN adduser --no-create-home --system --group --shell /bin/false nginx
COPY ./nginx-forward-conf /etc/nginx/sites-available/default
COPY ./nginx-forward-conf /etc/nginx/sites-enabled/default
RUN service nginx restart
RUN npm i -g pm2
COPY . .

CMD ["pm2-runtime", "/server/bin/www"]
