# Stage 0, "build-stage"
FROM node:18.16 as build-stage
ARG NPM_EMAIL
ARG NPM_USER
ARG NPM_PASS
ARG NPM_URL

WORKDIR /app

COPY ./nginx.conf /nginx.conf

COPY package*.json /app/

RUN yarn global add npm-cli-login

RUN npm-cli-login -u ${NPM_USER} -p ${NPM_PASS} -e ${NPM_EMAIL} -r ${NPM_URL} -s "@j-meira"

RUN yarn

COPY ./ /app/

RUN yarn build

# Stage 1, "deploy"
FROM nginx:1.22.1 as deploy-stage

COPY --from=build-stage /app/build/ /usr/share/nginx/html

COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
