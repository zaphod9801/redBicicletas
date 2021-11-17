FROM node:14-alpine
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install 
COPY . .
RUN chown -R node /usr/src/app
USER node
ENV PORT 8080
CMD ["npm", "start"]
