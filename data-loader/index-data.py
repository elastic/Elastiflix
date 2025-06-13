import json
import os
import argparse
import gzip
from elasticsearch import Elasticsearch, helpers, NotFoundError
from tqdm import tqdm

def actions_generator(movies_json, index_name):
    for movie in movies_json:
        movie["_index"] = index_name
        movie["_id"] = movie['id']
        yield movie


def main():
    parser = argparse.ArgumentParser()
    
    # Required arguments
    parser.add_argument('--data_folder', dest='data_folder', required=False, default='movies')
    parser.add_argument('--config_folder', dest='config_folder', required=False, default='config')
    parser.add_argument('--es_api_key', dest='es_api_key', required=True)
    parser.add_argument('--es_host', dest='es_host', required=True)
    parser.add_argument('--index_name', dest='index_name', required=False, default='movies')
    parser.add_argument('--recreate', dest='recreate', action=argparse.BooleanOptionalAction, required=False, default=False)
    parser.add_argument('--create_inference_endpoints', dest='create_inference_endpoints', action=argparse.BooleanOptionalAction, required=False, default=False)


    args = parser.parse_args()

    es_client = Elasticsearch(
        hosts=args.es_host,
        api_key=args.es_api_key,
        request_timeout=300
    )

    # Re-create the index if --recreate is passed
    if args.recreate:
        try:
            es_client.indices.delete(index=args.index_name)
            print(f'Deleted index {args.index_name}')
        except:
            pass

    # Create index with schema mapping
    if not es_client.indices.exists(index=args.index_name):
        
        schema_path = os.path.join(args.config_folder, "schema.json")
        with open(schema_path, 'r') as schema_file:
            schema = json.load(schema_file)

        es_client.indices.create(index=args.index_name, mappings=schema)
        es_client.indices.put_settings(index=args.index_name, settings={'index.number_of_replicas': 0})
        print(f"Index '{args.index_name}' created with the specified schema.")

    #Create inference endpoints for e5, elser and elser if they do not exist
    if args.create_inference_endpoints:
        print("Checking inference endpoints (ELSER)...")
        try:
            es_client.inference.get(inference_id="elser")
        except NotFoundError as e:
            print("Creating ELSER inference endpoint ...")
            inference_config = json.load(open(os.path.join(args.config_folder, "inference_elser.json"), 'r'))
            es_client.inference.put(inference_id="elser", inference_config=inference_config)

        print("Checking inference endpoints (e5)...")
        try:
            es_client.inference.get(inference_id="e5")
        except NotFoundError as e:
            print("Creating e5 inference endpoint ...")
            inference_config = json.load(open(os.path.join(args.config_folder, "inference_e5.json"), 'r'))
            es_client.inference.put(inference_id="e5", inference_config=inference_config)

        print("Checking inference endpoints (rerank)...")
        try:
            es_client.inference.get(inference_id="rerank")
        except NotFoundError as e:
            print("Creating rerank inference endpoint ...")
            inference_config = json.load(open(os.path.join(args.config_folder, "inference_rerank.json"), 'r'))
            es_client.inference.put(inference_id="rerank", inference_config=inference_config)

    print("Indexing data into Elasticsearch...")
    movies_file_path = os.path.join(args.data_folder, "movies.json.gz")
    with gzip.open(movies_file_path, 'rt') as file:
        movies_json = json.load(file)

    progress = tqdm(unit="docs", total=len(movies_json))
    for ok, action in helpers.parallel_bulk(es_client, actions_generator(movies_json, args.index_name), chunk_size=10):
        progress.update(1)

    es_client.indices.put_settings(index=args.index_name, settings={'index.number_of_replicas': 1})
        
    print("All tasks completed successfully.")

if __name__ == "__main__":
    main()