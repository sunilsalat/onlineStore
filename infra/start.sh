#!/bin/bash



docker-compose -f "./onlinestore.yaml" up -d 

sleep 15

docker exec mongo-product chmod "+x"  /scripts/rs-init.sh