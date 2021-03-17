FROM node:latest

# Create app directory
RUN rm -rf /home/wuchendi/ws_project
RUN mkdir -p /home/wuchendi/ws_project
WORKDIR /home/wuchendi/ws_project

# Bundle app source
COPY . /home/Service
RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]