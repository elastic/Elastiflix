#!/bin/bash
set -e
if [[ -z "${AS_BASE_URL}" ]]; then
  echo "The environment variable AS_BASE_URL must be set to run the container."
  exit 1
fi

if [[ -z "${AS_SEARCH_API_KEY}" ]]; then
  echo "The environment variable AS_SEARCH_API_KEY must be set to run the container."
  exit 1
fi

if [[ -z "${ENGINE_NAME}" ]]; then
  echo "The environment variable ENGINE_NAME must be set to run the container."
  exit 1
fi

# Recreate config file
./env.sh

exec env nginx -g 'daemon off;'