FROM node:latest as build

ENV NODE_ENV=production
ARG REACT_APP_BACKEND_API_URL
ENV REACT_APP_BACKEND_API_URL $REACT_APP_BACKEND_API_URL

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
RUN npm install
RUN npm install -g react-scripts

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
