import json
import os
import argparse
import gzip
from elasticsearch import Elasticsearch, helpers
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
    parser.add_argument('--es_user', dest='es_user', required=True)
    parser.add_argument('--es_password', dest='es_password', required=True)
    parser.add_argument('--cloud_id', dest='cloud_id', required=True)
    parser.add_argument('--index_name', dest='index_name', required=False, default='movies')
    parser.add_argument('--recreate', dest='recreate', action=argparse.BooleanOptionalAction, required=False, default=False)
    
    args = parser.parse_args()

    es_client = Elasticsearch(
        cloud_id=args.cloud_id,
        basic_auth=(args.es_user, args.es_password),
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
        print(f"Index '{args.index_name}' created with the specified schema.")


    print("Indexing data into Elasticsearch...")
    movies_file_path = os.path.join(args.data_folder, "movies_plus_plots.json.gz")
    with gzip.open(movies_file_path, 'rt') as file:
        movies_json = json.load(file)

    progress = tqdm(unit="docs", total=len(movies_json))
    for ok, action in helpers.parallel_bulk(es_client, actions_generator(movies_json, args.index_name), chunk_size=10):
        progress.update(1)

    print("All tasks completed successfully.")

if __name__ == "__main__":
    main()