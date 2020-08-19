FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
#RUN yarn build
COPY . .
EXPOSE 8001
CMD [ "npm", "run", "start" ]