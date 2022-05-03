FROM node:12 as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:1.12-alpine
RUN apk --no-cache add curl
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
COPY --from=build-deps /usr/src/app/scripts ./
RUN chmod +x ./*.sh

RUN apk add --no-cache bash
CMD [ "/bin/bash", "./docker-entrypoint.sh" ]
