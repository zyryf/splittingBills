#!/bin/bash

docker-compose -f deployment/docker-compose.dev.yml rm || exit 1

# Build client docker image

docker build -t splittingbills/client ./modules/client || exit 1

# Build server docker image

docker build -t splittingbills/server ./modules/server || exit 1

# Build nginx docker image

docker build -t splittingbills/nginx ./modules/nginx || exit 1

# Start app

docker-compose -f deployment/docker-compose.dev.yml up || exit 1

exit 0;