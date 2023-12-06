#!/bin/bash

while [ $(docker ps -q -f name=migrate-sql) ]; do
    echo "Waiting for migrate-sql to complete..."
    sleep 1
done