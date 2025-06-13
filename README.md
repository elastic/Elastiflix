# Elastiflix

**Elastiflix** is a demo application built to showcase the capabilities of [Elastic's Search UI](https://github.com/elastic/search-ui) for building rich, modern search experiences. 

![](./img/elastiflix2-readme.gif)

## Features

- 🛠️ [Search UI](https://github.com/elastic/search-ui) best practices.
- 🏷️ Filtering 
- ✨ Autocomplete 
- ☑️ Faceting 
- 🔍 Full-text/Lexical Search 
- 🤖 Semantic Search (sparse vector search with [ELSER](https://www.elastic.co/docs/explore-analyze/machine-learning/nlp/ml-nlp-elser)) 
- 🪄 Hybrid Search with [retrievers](https://www.elastic.co/docs/reference/elasticsearch/rest-apis/retrievers) 

## Pre-requisites

- An Elasticsearch cluster of any size, either:
    - A self-managed local cluster, using [start-local.sh](https://www.elastic.co/docs/deploy-manage/deploy/self-managed/local-development-installation-quickstart).
    - A cluster in Elastic Cloud, follow this [getting started guide](https://www.elastic.co/getting-started/enterprise-search/build-a-semantic-search-experience) for a limitless 14-day free trial.


## Load data

Simply run this script and provide the an Elasticsearch endpoint and an API key: 

```bash
python3 index-data.py \
    --es_host https://elastiflix-project.es.us-west2.gcp.elastic-cloud.com \
    --es_api_key YkxxQ1lKY0IwenE1MzBaSnEtQkM6QU9EMnloM2NENFJKZVN3QUpzVDZfww== \
    --index_name elastiflix-movies \
    --recreate \
    --create_inference_endpoints
```

Command line arguments
- `--index-name` the index name
- `--recreate` will delete the index if it already exists
- `--data_folder` directory where `movies.json.gz` exists
- `--config-folder` directory with mappings and inference endpoint configs are, so they can be customized.
- `--create_inference_endpoints` will create all 3 inference endpoints (e5, elser and rerank) with custom configuration from `config-folder`
- `--es_host` the Elasticsearch endpoint e.g. `https://project-name.es.us-west2.gcp.elastic-cloud.com` in elastic cloud or `http://localhost:9200` if local.
- `--es_api_key` the api key is automatically generated in Elasticsearch Serverless, it can be generated with the `/_security/api_key` [here](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-create-api-key).



## Elastiflix Website 

### Run the app

Just change `ES_HOST` and `ES_API_KEY` in `docker-compose.yml` then run `docker-compose up`. 

Open browser to https://localhost:3000 to see the UI in action!

#### Frontend

React App powered by [Search UI](https://github.com/elastic/search-ui), a free open source package written in React and Typescript to accelerate creating visual interfaces for search written and maintained by Elastic. The frontend routes requests through the backend using the Search UI's ApiProxyConnector.

#### Backend

The backend of Elastiflix is built using Express.js + Search UI and serves as an intermediary between the frontend and Elasticsearch. It provides multiple API endpoints for search functionalities, including autocomplete, lexical, semantic, rerank, and hybrid search. Each endpoint is connected to a specific ElasticsearchAPIConnector instance.

## Credits 

<img src="./frontend/src/assets/tmdb-logo.svg" width="40"> This demo uses real movie data kindly provided by [The Internet Movie Database (TMDB)](https://tmdb.org/), but is not endorsed or certified by TMDB.
