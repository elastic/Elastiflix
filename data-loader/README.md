# Data Loader Module

Python script to index documents into Elastic Cloud based on provided JSON files representing movies from [The Internet Movie Database](http://tmdb.org/). After TMDB data is indexed, user interaction simulation is be ran (searches and clicks)

## Prerequisites

- Docker Desktop Installed
- [Create and Setup Elastic CLoud](../../README.md#setup-elastic-cloud)
- Gather the below variables and place them in `env` file
    - ELASTICSEARCH_PASSWORD: Password shown when deployment is created
    - AS_BASE_URL: URL of Elastic App Search Instance. Retrieve it like below
    
    <img src="../../static/get-as-settings.gif" height="700">
    
    - CLOUD_ID: URL Found on Deployments Page (Look for Cloud ID Area)


## The data files

There are a handful of files that can be updated to simulate data. They can also be used as-is with great results

- tmdb-data/cast_popular: JSON file from TMDB that shows popular movies
- tmdb-data/movies_2000-2021_w_details.json: JSON file representing over 8k movies with additional details
- analytics-data/query_no_results.txt: File containing queries that will return no results
- analytics-data/terms.txt: This is a generated file that contains random search terms.

## The scripts

There are 2 scripts that run when you create the container: one that generates sample term data and another that performs the simulation against Elastic Cloud

- generate-analytics-input.py: File that reads from TMDB movie files and randomly create list of search terms.
- generate-analytics.py: Aggregates all data files to perform different searches


## Build the docker image

```bash
docker build . -t data-loader:latest
docker run --env-file env data-loader:latest
```

