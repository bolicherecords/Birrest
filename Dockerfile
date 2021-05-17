FROM node:15.14.0-alpine as builder
ENV NODE_ENV build
WORKDIR /home/node
COPY . /home/node
RUN yarn install && yarn build

FROM node:15.14.0-alpine
WORKDIR /home/node
COPY --from=builder /home/node/package.json /home/node/yarn.lock /home/node/
COPY --from=builder /home/node/dist/ /home/node/dist/
RUN yarn install
USER node
CMD ["node", "dist/src/main"]
