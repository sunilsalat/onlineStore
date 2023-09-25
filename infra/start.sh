#!/bin/bash



docker-compose -f "./onlinestore.yaml" up -d 

sleep 5

docker exec mongo-product chmod "+x"  /scripts/rs-init.sh