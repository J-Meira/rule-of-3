# Stage 0, "build-stage"
FROM node:24-alpine AS build-stage
ARG NPM_TOKEN

WORKDIR /app

COPY ./nginx.conf /nginx.conf

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml /app/

RUN npm install -g pnpm

RUN printf '@j-meira:registry=https://npm.pkg.github.com\n//npm.pkg.github.com/:_authToken=%s\n' "${NPM_TOKEN}" > .npmrc \
  && pnpm install --frozen-lockfile --ignore-scripts \
  && rm -f .npmrc

COPY ./ /app/

RUN pnpm build

# Stage 1, "deploy"
FROM nginx:1.27-alpine AS deploy-stage

COPY --from=build-stage /app/dist/ /usr/share/nginx/html

COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
