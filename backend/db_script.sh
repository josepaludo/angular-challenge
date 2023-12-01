#!/bin/bash

container_name="postgresDB"
username="user"
password="password"
database="db"
host_port=5432

docker run --rm \
    --name "$container_name" \
    -e POSTGRES_USER="$username" \
    -e POSTGRES_PASSWORD="$password" \
    -e POSTGRES_DB="$database" \
    -p "$host_port":5432 \
    postgres
