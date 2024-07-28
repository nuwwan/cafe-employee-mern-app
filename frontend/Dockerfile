# get base image
FROM node:20.10.0

# set working directory
WORKDIR /app

# copy package.json file
COPY package.json .

# run npm install
RUN npm install

# copy all files
COPY . .

# build the app
RUN npm run build

# install nodemon(to run the app on dev mode)
RUN npm i -g nodemon

CMD [ "nodemon","dist/index.js" ]