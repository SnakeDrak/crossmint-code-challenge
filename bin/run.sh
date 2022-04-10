#!/usr/bin/env bash

docker build -t pedro/crossmint-code-challenge . > /dev/null
docker run --rm -it  pedro/crossmint-code-challenge $1
