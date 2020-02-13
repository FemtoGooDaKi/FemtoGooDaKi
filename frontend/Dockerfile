# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node
COPY . /usr/app
WORKDIR /usr/app
RUN yarn && yarn run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15
COPY --from=0 /app/build/ /usr/share/nginx/html
# Copy the default nginx.conf provided by node
COPY /nginx.conf /etc/nginx/conf.d/default.conf