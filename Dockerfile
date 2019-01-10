FROM node:8-alpine

RUN apk add --update --no-cache nginx python git \
    && mkdir /usr/src

WORKDIR /tmp
COPY ./ ./
RUN apk add --update --no-cache --virtual .build-dependencies g++ make \
    && npm install \
    && npm install -g --unsafe-perm @angular/cli@6.1.3 \
    && touch src/environments/environment.ts && ng build --prod --output-path=dist \
    && mv dist /usr/src/app \
    && npm cache clean --force \
    && apk del .build-dependencies \
    && rm -fr *

WORKDIR /usr/src/app
ENV APP_SRC_PATH /usr/src/app

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/nginx-server.conf /etc/nginx/conf.d/default.conf
COPY docker/entrypoint /entrypoint
RUN chmod +x /entrypoint

EXPOSE 80
ENTRYPOINT ["/entrypoint"]
CMD ["app", "start"]
