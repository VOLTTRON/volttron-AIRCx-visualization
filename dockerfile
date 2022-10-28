FROM node:12.20.1-buster
RUN mkdir /app
COPY . /app
WORKDIR /app/client
RUN yarn install
RUN yarn build
RUN yarn deploy
WORKDIR /app/server
RUN rm .env
RUN cp .env.docker .env
RUN cp .env.docker.local .env.production.local; exit 0
RUN yarn install
RUN yarn add mysql2
EXPOSE 80
CMD [ "yarn", "start" ]