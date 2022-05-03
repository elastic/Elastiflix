# Elastiflix

Elastiflix is a fictitious video streaming service company that provides a web-based user interface leveraging data from [The Internet Movie Database](https://tmdb.org/). Elastiflix provides a mechanism to query data from an indexed copy of TMDB data that sits in Elastic Cloud, allowing for high-performant, flexible management and querying of that data in order to provide an exceptional search experience.

## Pre-reqs

- [Elastic Cloud](https://cloud.elastic.co/) Deployment created, new accounts can sign-up for a limitless 14-day free trial to POC building a solution like this
- Docker Desktop Installed

### Setup Elastic Cloud

To get started with this sample, create a 14-day free trial of Elastic Cloud by going to https://cloud.elastic.co/registration and signing up with your Google or Microsoft Account or by signing up with another email. After logging in, you will be prompted with the Elastic Cloud console. Clicking `Create Deployment` will walk you through creating a new Elastic Cloud deployment, hosted in the Cloud Provider and region of your choice. You can run Elastic Cloud in Microsoft Azure, Google Cloud Platform or Amazon Web Services. If you expand settings you can choose your provider/region as well as other settings, which we can leave default for now. When you create `Create Deployment` Elastic Cloud will create all the necessary components to build the solution. There will be a username and password shown during the provisioning process, so be sure to save that somewhere safe as it is an admin account for your cluster.
<p align="center">
<img src="static/create-deployment.gif" height="500">
 </p>

Once the cluster is ready, you can navigate to it at the link provided. This will take you to Kibana, the solution management and visualization tool for Elastic. There are a few settings that you should capture and place in the sample to point it at this newly created Elastic Cloud instance. These settings are

- ELASTICSEARCH_PASSWORD: Password shown when deployment is created
- CLOUD_ID: URL Found on Deployments Page (Look for Cloud ID Area)
<p align="center">
<img src="static/get-cloud-id.gif" height="500">
</p>

- AS_BASE_URL & AS_SEARCH_API_KEY: URL of Elastic App Search Instance and API Key for search experience in the UI. Retrieve it like below

<p align="center">
<img src="static/loader/get_as_base_url.gif" height="500">
</p>

### Running the sample

This repository consists of 2 modules, that can be run as docker containers to show an End to End experience of ingesting, managing and searching with Elastic Cloud.

The modules are

- [Data Ingestion](/src/data-loader)
- [Search Experiences](/src/streaming-ui)


### What's next?

These 2 parts are just the start to building great search solutions, as Elastic also provides pre-built tools to help accelerate the building out of a top-notch search experience. You can find out more information about this at the [Elastic Enterprise Search](https://www.elastic.co/enterprise-search) section of the Elatic website.
