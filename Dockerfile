FROM alpine:edge

RUN apk update &&\
    apk upgrade --no-cache &&\
    apk add nodejs npm  mysql mysql-client --no-cache



WORKDIR /var/lib/mysql
RUN mysql_install_db
RUN mkdir -p /run/mysqld && chown -R mysql:mysql /var/lib/mysql /run/mysqld

COPY / /app
WORKDIR /app

RUN npm install --save-dev

VOLUME ["/app"]

ENTRYPOINT ["ash" ]
CMD [ "entrypoint.sh" ]