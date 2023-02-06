# Elastiflix

Elastiflix is a fictitious video streaming service company that provides a web-based user interface leveraging data from [The Internet Movie Database](https://tmdb.org/). Elastiflix provides a mechanism to query data from an indexed copy of TMDB data that sits in Elastic Cloud, allowing for high-performant, flexible management and querying of that data in order to provide an exceptional search experience.

## Pre-requisites

- [Elastic Cloud](https://cloud.elastic.co/) Deployment created, new accounts can sign-up for a limitless 14-day free trial to POC building a solution like this

## Setup Elastic Cloud

To get started with this sample, create a 14-day free trial of Elastic Cloud by going to https://cloud.elastic.co/registration and signing up with your Google or Microsoft Account or by signing up with another email. 

After logging in, you will be prompted with the Elastic Cloud console. Clicking `Create Deployment` will walk you through creating a new Elastic Cloud deployment, hosted in the Cloud Provider and region of your choice. 

You can run Elastic Cloud in Microsoft Azure, Google Cloud Platform or Amazon Web Services. If you expand settings you can choose your provider/region as well as other settings, which we can leave default for now. When you create `Create Deployment` Elastic Cloud will create all the necessary components to build the solution. 

There will be a username and password shown during the provisioning process, so be sure to save that somewhere safe as it is an admin account for your cluster.
<p align="center">
<img src="static/create-deployment.gif" height="500">
 </p>

Once the cluster is ready, you can navigate to it at the link provided. This will take you to Kibana, the solution management and visualization tool for Elastic. 

In Kibana, you can access the Enterprise Search solution where you can grab the credentials required to run that demo: App Search Base URL, App Search Search public key and App Search private key

You can follow the GIF below to see how to access them.

<p align="center">
<img src="static/loader/get_as_base_url.gif" height="500">
</p>

## Load data

### The data files

There are a handful of files that can be updated to simulate data. They can also be used as-is with great results

- data-loader/movies: Contains movies data to populate our demo
- data-loader/analytics: Contains files used to generate sample search analytics

### Run the script

You just need to run the script `index-data.py` that will create an engine, load the movies data, set up the relevancy model and generate sample search analytics data. 

Simply provide the App Search base URL and Private key to run the script. 

```
python3 index-data.py --private_key private-xyz  --as_host https://xyz.cloud.es.io
```

## Elastiflix Website

React App preconfigured to query movies from Elastic Cloud deployment created in the [TMDB Loader Section](../data-loader/). The search experience is powered by [Search UI](https://github.com/elastic/search-ui), a free open source package written in React and Typescript to accelerate creating visual interfaces for search written and maintained by Elastic.

### Configuration

Open the file `.env`, you can see default value that points to an active engine. You can simply these values in place if you want to use the demo deployment. If you have deployed your own Elastic cluster and loaded the data, you can update the values here with your own. 

### Run the app

Make sure the node dependencies are installed by running `npm install`. Then start the application with `npm start` 

Open browser to https://localhost:5000 to see the UI in action!

### What's next?

These 2 parts are just the start to building great search solutions, as Elastic also provides pre-built tools to help accelerate the building out of a top-notch search experience. You can find out more information about this at the [Elastic Enterprise Search](https://www.elastic.co/enterprise-search) section of the Elatic website.

## Credits 

<img src="./src/tmdb-logo.svg" width="40"> This product uses the TMDB API but is not endorsed or certified by TMDB.
