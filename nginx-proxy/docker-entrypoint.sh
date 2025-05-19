#!/bin/sh
set -e

# Substitute only ES_API_KEY and ES_URL environment variables in the template
envsubst '${ES_API_KEY} ${ES_URL}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Start nginx
exec "$@"
