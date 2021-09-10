FROM node:16-alpine3.11
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . .
COPY ../*.env ./.env
EXPOSE 4000
CMD ["yarn", "start:dev"]