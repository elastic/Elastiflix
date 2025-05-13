
from ollama import chat
import json
import os.path
import gzip

with gzip.open('movies.json.gz', 'r') as movies:
    movies_json = json.load(movies)

    for movie in movies_json:
        try:
            movie_info = f"{movie['title']} ({movie['release_date'].split('-')[0]}), by {movie['production_companies'][0]}"
            print(f"\n\n============\n{movie['id']}\n")
            print(movie_info)
        except:
            pass

        if not os.path.isfile(f"tmp/{movie['id']}.json"):
            
            stream = chat(
                model='elastiflix',
                messages=[{'role': 'user', 'content': f'What would be the main themes of {movie_info}?'}],
                stream=True,
            )

            response = ''
            for chunk in stream:
                response += chunk['message']['content']
                print(chunk['message']['content'], end='', flush=True)
            
            if "404" not in response and "I don't" not in response:
                movie['extra'] = dict()
                movie['extra']['plot_llm'] = response

            with open(f"tmp/{movie['id']}.json", 'w') as movie_output:
                json.dump(movie, movie_output, indent=2, sort_keys=True, ensure_ascii=False)
        else:
            print("skipping...")




