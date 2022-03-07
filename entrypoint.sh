#!/bin/ash

mysqld_safe --datadir='/var/lib/mysql/data' &
npm run start-dev 
