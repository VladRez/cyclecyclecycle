FROM node:11-alpine

WORKDIR /usr/src/app

ARG NODE_ENV=production

ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY . /usr/src/app/

RUN npm install --silent
RUN npm run heroku-postbuild

CMD ["npm", "start"]