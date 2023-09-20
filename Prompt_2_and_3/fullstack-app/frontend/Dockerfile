FROM node:16-alpine

WORKDIR /fullstack-app/frontend/

COPY package*.json /fullstack-app/frontend/
RUN npm install

COPY . /fullstack-app/frontend/

CMD ["npm", "run", "dev"]