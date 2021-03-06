FROM node:16.13.1-alpine
ENV PORT 3000
WORKDIR /app
RUN yarn set version 1.22.17
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn build
CMD yarn run dev
EXPOSE $PORT
