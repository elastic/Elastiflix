# Elastiflix Website

React App preconfigured to query movies from Elastic Cloud deployment created in the [TMDB Loader Section](../data-loader/). The search experience is powered by [Search UI](https://github.com/elastic/search-ui), a free open source package written in React and Typescript to accelerate creating visual interfaces for search written and maintained by Elastic.

## Prerequisites


- [Data Import step completed](../data-loader)
- Docker Desktop Installed
- [Create and Setup Elastic CLoud](../../README.md#setup-elastic-cloud)
- Gather the below variables and place them in `env` file
    - AS_BASE_URL: URL of Elastic App Search Instance. Retrieve it like below
    - AS_SEARCH_API_KEY: Search only API Key. Retrieve it like below
   <img src="../../static/get-as-settings.gif" height="700">

    - ENGINE_NAME: LEAVE UNTOUCHED

## Build the docker image

```bash
docker build . -t elastiflix-ui:latest
docker run -d --env-file scripts/.env -p 5000:80 elastiflix-ui
```

if you get an error similar to `The engine "node" is incompatible with this module.`, try pulling the latest version of `docker pull node:12` or run the docker build command with the additional flag to disable caching: `docker build . --no-cache -t elastiflix-ui:latest`

## Run App

Open browser to https://localhost:5000 to see the UI in action!
   <img src="../../static/ui/ui.png" height="700">
