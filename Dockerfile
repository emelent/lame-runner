FROM nginx:1.25.2-alpine AS runtime
COPY . /usr/share/nginx/html/
ADD ./nginx.conf /etc/nginx/conf.d/default.conf
