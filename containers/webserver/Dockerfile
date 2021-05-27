FROM nginx:1.12.2-alpine

RUN apk update \
	&& apk add curl \
	&& rm -f /etc/nginx/conf.d/*.conf \
	&& rm -f /etc/nginx/nginx.conf

COPY default.conf /etc/nginx/conf.d
COPY nginx.conf /etc/nginx
COPY start.sh /

CMD ["sh", "/start.sh"]