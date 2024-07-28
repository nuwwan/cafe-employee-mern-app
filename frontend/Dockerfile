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

EXPOSE 3000

CMD ["npm", "start"]