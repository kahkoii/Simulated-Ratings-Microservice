#!/bin/bash

if [ "$1" = "up" ]
then
    echo "Starting eti-asgt-api and eti-asgt-frontend microservices..."
    docker pull kahkoii/eti-asgt-api:latest
    docker pull kahkoii/eti-asgt-frontend:latest
    docker run -p 8131:8131 -v sqlite-db:/app/db --name 13_api-server -d --rm kahkoii/eti-asgt-api:latest
    docker run -p 8130:3000 --name 13_frontend-server -d --rm kahkoii/eti-asgt-frontend:latest
elif [ "$1" = "down" ]
then
    echo "Stopping eti-asgt-api and eti-asgt-frontend microservices..."
    docker stop 13_api-server
    docker stop 13_frontend-server
else
    echo "Usage: $0 up|down"
fi
