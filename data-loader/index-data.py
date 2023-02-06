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
import gzip
from elastic_enterprise_search import AppSearch
from elasticsearch import Elasticsearch, helpers
import time
import random
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
      response = app_search.index_documents(engine_name=args.engine_name,documents=movies)
      movies = []
      count = 0
      time.sleep(5)
      print(".", end='', flush=True)

parser = argparse.ArgumentParser()
#required args
parser.add_argument('--data_folder', dest='data_folder', required=False, default='movies')
parser.add_argument('--config_folder', dest='config_folder', required=False, default='config')
parser.add_argument('--private_key', dest='pkey', required=False, default='config')
parser.add_argument('--as_host', dest='as_host', required=True)
parser.add_argument('--analytics_folder', dest='analytics_folder', required=False, default='analytics')
parser.add_argument('--engine_name', dest='engine_name', required=False, default='movies')
args = parser.parse_args()

# print("App search credentials found")
app_search = AppSearch(
    args.as_host,
    bearer_auth=args.pkey,
    request_timeout=600
)
print("Create engine")
app_search.create_engine(engine_name=args.engine_name)
print("Engine created")

print("Update engine schema...")
schemaConfig = open(os.path.join(args.config_folder, "schema.json") , "r")
schemaJson = json.load(schemaConfig)

resp = app_search.put_schema(
    engine_name=args.engine_name,
    schema=schemaJson
)
print("Done")

print("Indexing data to App Search...")
moviesFile = gzip.open(os.path.join(args.data_folder, "movies.json.gz"), 'rt')
index(moviesFile)
# time.sleep(280)
print("Done")

print("Upload synonyms set...")
synonymsConfig = open(os.path.join(args.config_folder, "synonyms.json"), "r")
synonymsConfig = json.load(synonymsConfig)
for synonym in synonymsConfig:
    app_search.create_synonym_set(engine_name=args.engine_name,synonyms=synonym)
print("Done")


print("Update engine relevancy...")
relevancyConfig = open(os.path.join(args.config_folder, "relevancy.json"), "r")
relevancyJson = json.load(relevancyConfig)
app_search.put_search_settings(engine_name=args.engine_name, boosts=relevancyJson['boosts'], precision=relevancyJson['precision'], result_fields=relevancyJson['result_fields'], search_fields=relevancyJson['search_fields'])
print("Done")




print("Generate analytics sample...")
# Build terms list from generated terms, popular cast, Queries with no click, and queries with no results
terms = open(os.path.join(args.analytics_folder, "terms.txt"), "r")
terms_array = []
for term in terms.readlines():
    terms_array.append(term)

cast_popular_json = json.load(open(os.path.join(args.analytics_folder, "cast_popular.json"), "r"))
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
        query=term,
        page_size=10,
        result_fields={"id": {"raw": {}}}
    )

    # Randomly decide to generate a click for this search and than randomly pick result in list to generate click
    if random.choice([True, False]) is True:
        if len(results['results']) > 0:
            # print(results)
            chosen_document = random.choice(results['results'])
            if chosen_document['id']:
                resp = app_search.log_clickthrough(
                    engine_name=args.engine_name,
                    query=term,
                    document_id=chosen_document['id']['raw'],
                    request_id=results['meta']['request_id']
                )
print("Done")