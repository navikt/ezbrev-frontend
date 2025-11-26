FROM cgr.dev/chainguard/nginx

COPY ./public /usr/share/nginx/html
ADD ./dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/ezbrev.conf
