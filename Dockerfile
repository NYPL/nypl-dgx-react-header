FROM node:10.0.0 as production

RUN apt-get update
RUN apt-get upgrade -y

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
ENV NODE_ENV=production
ENV APP_ENV=production

RUN npm cache verify
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm run dist

# Explicitly set port 3001 as open to requests.
EXPOSE 3001

CMD [ "npm", "start" ]
