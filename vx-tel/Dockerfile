FROM node:16-alpine3.11
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
RUN yarn add bcrypt
COPY . .
COPY ../*.env ./.env
EXPOSE 4000
RUN yarn build
CMD ["yarn", "start:dev"]
