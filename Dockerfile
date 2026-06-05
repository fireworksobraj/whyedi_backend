FROM node:20-alpine

# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

ENV NODE_ENV development

EXPOSE 1337

CMD ["npm", "run", "develop"]
