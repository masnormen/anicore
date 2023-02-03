FROM node:18.12.1-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
# RUN npm install -g yarn
RUN npm install

# add app files
COPY . ./

# start app
CMD ["npm", "run", "dev"]
EXPOSE 3000