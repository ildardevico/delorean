FROM node
RUN apt-get update && apt-get install ffmpeg
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm i
ENV PORT 4000
ENV NODE_ENV production
EXPOSE 4000
RUN npm run build
CMD npm start
