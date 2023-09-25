#!/bin/bash


docker-compose up -d

sleep 5

docker exec mongo-product /scripts/rs-init.sh