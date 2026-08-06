#  Using node:26-bookworm-slim as a parent layer
FROM node:26-bookworm-slim

# Setup a working directory where docker will run the next following command
WORKDIR /app

COPY package.json .
RUN npm install

# COPY everything as same level of Dockerfile into that working directory "app" folder inside image
# COPY . /app => this command will not anymore work because now the "app" is relative to WOKRDIR above
COPY . .

CMD ["npm", "run", "dev"]

EXPOSE 8080

# To run with command line
# use: docker run --name <container-name> -p <container-port>:<computer-port> -d <image-name>