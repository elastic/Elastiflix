# Index Data from TMDB (JSON files representing the movies) into Elastic Cloud
# Arguments:
#   - data_folder: Directory containing the Movie JSON files
#   - config_folder: Directory containing the Elastic relevance configuration JSON files
#   - es_user: User name for Elastic Cloud
#   - es_password: Password for Elastic Cloud
#   - as_host: Endpoint for Elastic Cloud App Search instance
#   - engine_name: Name of the Elastic Cloud engine
#   - cloud_id: Url of the Elastic Cloud ID

import json
import os
import argparse
import requests
import random
from elastic_enterprise_search import AppSearch
from elasticsearch import Elasticsearch, helpers

# index: Index the data from the JSON files into Elastic Cloud
# Arguments:
#   - moviesFile: Filepath containing the movies JSON data
def index(moviesFile):
  moviesJson = json.load(moviesFile)

  count = 0
  movies = []
  for movie in moviesJson:

    movies.append(movie)
    count = count + 1

    if count >= 100:
      response = app_search.index_documents(engine_name=args.engine_name,documents=movies,request_timeout=60)
      movies = []
      count = 0
      print(".", end='', flush=True)

parser = argparse.ArgumentParser()
#required args
parser.add_argument('--data_folder', dest='data_folder', required=False)
parser.add_argument('--config_folder', dest='config_folder', required=False)
parser.add_argument('--es_user', dest='es_user', required=False, default='elastic')
parser.add_argument('--es_password', dest='es_password', required=True)
parser.add_argument('--as_host', dest='as_host', required=True)
parser.add_argument('--analytics_folder', dest='analytics_folder', required=False)
parser.add_argument('--engine_name', dest='engine_name', required=True)
parser.add_argument('--cloud_id', dest='cloud_id', required=True)
args = parser.parse_args()

print("Retrieve app search credentials")
as_private_key = None
responseRead = requests.get(args.as_host+'/api/as/v1/credentials/pkey', auth=(args.es_user, args.es_password))

if responseRead.ok:
    as_private_key = responseRead.json()['key']
else:
    print("Private key does not exist, creating it")
    body = {'name': 'pkey', "type": "private", "read": True, "write": True, "access_all_engines": True}
    responseWrite = requests.post(args.as_host+'/api/as/v1/credentials', json = body, auth=(args.es_user, args.es_password))
    if responseWrite.ok:
        as_private_key = responseWrite.json()['key']
print("App search credentials found")
app_search = AppSearch(
    args.as_host,
    http_auth=as_private_key
)
print("Create engine")
app_search.create_engine(engine_name=args.engine_name, request_timeout=30)
print("Engine created")

print("Indexing data to App Search")
for data_filename in os.listdir(args.data_folder):
    if data_filename.endswith('.json'):
        data_file = open(os.path.join(args.data_folder, data_filename), 'r')
        index(data_file)

print("Update engine schema")
schemaConfig = open(os.path.join(args.config_folder, "schema.json") , "r")
schemaJson = json.load(schemaConfig)
resp = app_search.put_schema(
    engine_name=args.engine_name,
    schema=schemaJson,
    request_timeout=30
)

print("Update engine relevancy")
relevancyConfig = open(os.path.join(args.config_folder, "relevancy.json"), "r")
relevancyJson = json.load(relevancyConfig)
app_search.put_search_settings(engine_name=args.engine_name,body=relevancyJson,request_timeout=30)

print("Upload synonyms set")
synonymsConfig = open(os.path.join(args.config_folder, "synonyms.json"), "r")
synonymsConfig = json.load(synonymsConfig)
for synonym in synonymsConfig:
    app_search.create_synonym_set(engine_name=args.engine_name,body={"synonyms": synonym},request_timeout=30)

print("Indexing data to Elasticsearch")
es = Elasticsearch(
    cloud_id=args.cloud_id,
    http_auth=(args.es_user, args.es_password),
    request_timeout=30
)

moviesFile = open(os.path.join(args.data_folder, "movies_2000-2021_w_details.json"), "r")
moviesJson = json.load(moviesFile)
helpers.bulk(es, moviesJson, index='movies')



# Build terms list from generated terms, popular cast, Queries with no click, and queries with no results
terms = open(os.path.join(args.analytics_folder, "terms.txt"), "r")
terms_array = []
for term in terms.readlines():
    terms_array.append(term)

cast_popular_json = json.load(open(os.path.join(args.data_folder, "cast_popular.json"), "r"))
c_cast = 0
while c_cast < 20:
    terms_array.append(cast_popular_json[c_cast]['name'].replace('.csv', '').lower())
    c_cast += 1

no_results_terms_file = open(os.path.join(args.analytics_folder, "query_no_results.txt"), "r")
for no_results_term in no_results_terms_file.readlines():
    terms_array.append(no_results_term.rstrip('\n'))


for term in terms_array:
    results = app_search.search(
        engine_name=args.engine_name,
        body={
            "query": term,
            "precision": 10,
            "page": {"size" : 10},
            "result_fields": {"id": {"raw": {}}}
        }
    )

    # Randomly decide to generate a click for this search and than randomly pick result in list to generate click
    if random.choice([True, False]) is True:
        if len(results['results']) > 0:
            chosen_document = random.choice(results['results'])
            if chosen_document['id']:
                resp = app_search.log_clickthrough(
                    engine_name=args.engine_name,
                    query_text=term,
                    document_id=chosen_document['id']['raw']
                )

print("Done Generating Analytics in Elastic")

print("Done")