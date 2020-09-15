#!/usr/bin/env bash

VERSION_TAG=$1

export NODE_ENV="production"

npm run build --prefix modules/client

docker build -t splittingbills/client:$VERSION_TAG ./modules/client || exit 1
docker build -t splittingbills/server:$VERSION_TAG ./modules/server || exit 1
docker build -t splittingbills/nginx:$VERSION_TAG ./modules/nginx || exit 1

# Push images to GitHub registry

echo $VERSION_TAG