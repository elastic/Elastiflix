import json
import requests
from bs4 import BeautifulSoup

# Load movie IDs from a JSON file
def load_movie_ids(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)

# Fetch reviews for a given movie ID
def fetch_reviews(movie_id):
    url = f"https://www.imdb.com/title/{movie_id}/reviews/"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36"
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        reviews = []
        for review in soup.find_all('article'):
            reviews.append(review.get_text())
        return reviews
    else:
        print(f"Failed to fetch reviews for {movie_id}. Status code: {response.status_code}")
        return []

# Main function
def main():
    
    movie_ids = [
        "tt2953050",
        "tt7286456"
    ]


    for movie_id in movie_ids:
        print(f"Fetching reviews for {movie_id}...")
        reviews = fetch_reviews(movie_id)
        print(f"Found {len(reviews)} reviews for {movie_id}:")
        for review in reviews[:5]:  # Display up to 5 reviews
            print("-", review)
        print()

if __name__ == "__main__":
    main()
