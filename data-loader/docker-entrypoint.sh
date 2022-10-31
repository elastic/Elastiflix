#!/usr/bin/env bash

if [[ -z "${DATA_FOLDER}" ]]; then
  echo "The environment variable DATA_FOLDER must be set to run the container."
  exit 1
fi

if [[ -z "${CONFIG_FOLDER}" ]]; then
  echo "The environment variable CONFIG_FOLDER must be set to run the container."
  exit 1
fi

if [[ -z "${ELASTICSEARCH_PASSWORD}" ]]; then
  echo "The environment variable ELASTICSEARCH_PASSWORD must be set to run the container."
  exit 1
fi

if [[ -z "${AS_BASE_URL}" ]]; then
  echo "The environment variable AS_BASE_URL must be set to run the container."
  exit 1
fi

if [[ -z "${ENGINE_NAME}" ]]; then
  echo "The environment variable ENGINE_NAME must be set to run the container."
  exit 1
fi

if [[ -z "${CLOUD_ID}" ]]; then
  echo "The environment variable CLOUD_ID must be set to run the container."
  exit 1
fi

python3 /etc/generate-analytics-input.py --data_folder ${DATA_FOLDER} --analytics_folder ${ANALYTICS_FOLDER}
python3 /etc/index-data.py  --as_host ${AS_BASE_URL} --data_folder ${DATA_FOLDER} --analytics_folder ${ANALYTICS_FOLDER} --config_folder ${CONFIG_FOLDER} --es_password ${ELASTICSEARCH_PASSWORD} --engine_name=${ENGINE_NAME} --cloud_id=${CLOUD_ID}