FROM node:16.18.1-alpine
WORKDIR /app
COPY . /app/
RUN npm install
EXPOSE 3000
CMD [ "npm", "run", "start" ]