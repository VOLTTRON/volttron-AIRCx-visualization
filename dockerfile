FROM node
RUN mkdir /app
COPY . /app
WORKDIR /app/client
RUN yarn install
RUN yarn build
RUN yarn deploy
WORKDIR /app/server
RUN yarn install
RUN yarn reset
RUN rm .env
RUN cp .env.docker .env
EXPOSE 80
CMD [ "yarn", "start" ]