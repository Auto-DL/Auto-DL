FROM node:latest as build

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
RUN npm install -g serve react-scripts

COPY . /usr/src/app/

RUN npm run build

# => Run container
FROM nginx:1.16.0

COPY --from=build /usr/src/app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

# Start Nginx server
CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]
