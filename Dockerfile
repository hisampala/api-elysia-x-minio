FROM oven/bun as install
WORKDIR /app
COPY package.json .
COPY bun.lockb .
RUN bun install --production
COPY . .
COPY tsconfig.json .
# COPY public public

FROM oven/bun as build 
WORKDIR /app 
COPY --from=install ./app/node_modules ./node_modules
COPY --from=install ./app/package.json ./package.json
COPY --from=install ./app/bun.lockb ./bun.lockb
COPY --from=install ./app/ ./
ENV NODE_ENV production
RUN  bun build:app

FROM oven/bun as runner 
WORKDIR /app 
# COPY --from=build ./app/node_modules ./node_modules
# COPY --from=build ./app/package.json ./package.json
# COPY --from=build ./app/bun.lockb ./bun.lockb
COPY --from=build ./app/dist/server.js ./dist/server.js
EXPOSE 3000
CMD [ "bun", "run","./dist/server.js" ]
