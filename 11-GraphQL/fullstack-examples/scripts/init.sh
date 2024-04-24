#!/usr/bin/env bash

echo "Starting initialization..."

# Copy .env.example to .env in each subdirectory of packages
for dir in packages/*/
do
  cp "${dir}.env.example" "${dir}.env"
done

echo "Initialization completed!"