# get base image
FROM node:18.15.0

# set working directory
WORKDIR /app

# copy package.json file
COPY package.json .

# run npm install
RUN npm install

# copy all files
COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]