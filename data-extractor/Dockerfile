FROM node:18.16.1-alpine
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROMIUM_EXECUTABLE_PATH /usr/bin/chromium-browser
ENV CONCURRENT_EXTRACTORS_AS_A_TIME 5
RUN apk add --no-cache \
    chromium 
WORKDIR /app
COPY . /app/
RUN npm install && npm install -g typescript && tsc 
CMD [ "npm", "run", "start-data-executor" ]