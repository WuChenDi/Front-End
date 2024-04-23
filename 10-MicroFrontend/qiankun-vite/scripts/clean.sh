#!/usr/bin/env bash

DIRS_TO_DELETE=(
  "dist"
  "node_modules"
  "packages/*/node_modules"
  "packages/*/dist"
  "packages/*/es"
  "packages/*/lib"
  "packages/*/build"
)

echo "Start cleaning up directories: ${DIRS_TO_DELETE[*]}"

for dir in "${DIRS_TO_DELETE[@]}"
do
  rm -rf $dir && echo "Removed $dir directory."
done

echo "Cleanup completed successfully!"
