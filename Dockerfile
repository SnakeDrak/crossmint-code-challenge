FROM node:16-alpine

COPY . .
RUN npm i
RUN npm run build
ENTRYPOINT [ "node", "-r", "dotenv/config", "dist/main" ]