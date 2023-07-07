FROM nginxinc/nginx-unprivileged

COPY ./public /usr/share/nginx/html
COPY ./build /usr/share/nginx/html

# Will extract environment variables before nginx starts (ref. https://hub.docker.com/_/nginx):
COPY nginx.conf /etc/nginx/templates/default.conf.template
