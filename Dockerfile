FROM node:14-alpine
WORKDIR /server
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build
CMD ["yarn", "start:prod"]
