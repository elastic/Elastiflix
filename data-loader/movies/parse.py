import json

with open('movies.json', 'r') as movies:
    movies_json = json.load(movies)
    print(len(movies_json))
    print(json.dumps(movies_json[116]))