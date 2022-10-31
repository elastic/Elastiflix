# Generates Terms for Elastic Cloud Search Queries
# Arguments:
#   - data_folder: Directory containing the Movie JSON files
#   - analytics_folder: Directory containing the Simulated Analytics Files

import json
import random
from random import randint
import nltk
nltk.download('punkt')
from nltk.corpus import stopwords
nltk.download('stopwords')
from nltk.tokenize import word_tokenize
import argparse
import sys
import math
import os

parser = argparse.ArgumentParser()
#required args
parser.add_argument('--data_folder', dest='data_folder', required=False)
parser.add_argument('--analytics_folder', dest='analytics_folder', required=False)
args = parser.parse_args()

def getPair(item, f1, f2):
    return (int(item[f1]), item[f2])

def weighted_random(pairs):
    total = sum(pair[0] for pair in pairs)
    r = randint(1, total)
    for (weight, value) in pairs:
        r -= weight
        if r <= 0: return (weight, value)

moviesFile = open(os.path.join(args.data_folder, "movies_2000-2021_w_details.json"), "r")
moviesJson = json.load(moviesFile)

castFile = open(os.path.join(args.data_folder, "cast_popular.json"), "r")
castJson = json.load(castFile)

moviePairs = []
count = 0
minMoviePop = sys.maxsize
maxMoviePop = 0
# Generate popularity/title pair for movies
while count < 50:
    pair = getPair(moviesJson[count], 'popularity','title')
    minMoviePop = pair[0] if minMoviePop > pair[0] else minMoviePop
    maxMoviePop = pair[0] if maxMoviePop < pair[0] else maxMoviePop
    moviePairs.append(pair)
    count += 1

castPairs = []
count = 0
minCastPop = sys.maxsize
maxCastPop = 0
# Generate popularity/name pair for cast
while count < 20:
    pair = getPair(castJson[count], 'popularity','name')
    castPairs.append(pair)
    minCastPop = pair[0] if minCastPop > pair[0] else minCastPop
    maxCastPop = pair[0] if maxCastPop < pair[0] else maxCastPop
    count += 1

count = 0
tokenizer = nltk.RegexpTokenizer(r"\w+")
terms_array = []

for weight, value in moviePairs:
    text_tokens = tokenizer.tokenize(value)
    number_query = (weight - minMoviePop)/(maxMoviePop - minMoviePop) * 10
    click_ratio = random.uniform(0.2, 0.95)
    tokens_without_sw = [word for word in text_tokens if not word.lower() in stopwords.words()]

    size_word = random.randint(2, 4)
    count_word = 0
    search_term_array = []
    while (size_word > count_word) and (count_word < len(tokens_without_sw)):
        search_term_array.append(tokens_without_sw[count_word])
        count_word += 1
    for x in range(0,math.ceil(number_query)):
        terms_array.append((" ").join(search_term_array).lower())
    count += 1

count = 0

for weight, value in castPairs:
    text_tokens = tokenizer.tokenize(value)
    number_query = (weight - minCastPop)/(maxCastPop - minCastPop) * 10
    click_ratio = random.uniform(0.2, 0.95)

    tokens_without_sw = [word for word in text_tokens if not word.lower() in stopwords.words()]

    size_word = random.randint(2, 4)
    count_word = 0
    search_term_array = []
    while (size_word > count_word) and (count_word < len(tokens_without_sw)):
        search_term_array.append(tokens_without_sw[count_word])
        count_word += 1
    for x in range(0,math.ceil(number_query)):
        terms_array.append((" ").join(search_term_array).lower())
    count += 1

terms = open(os.path.join(args.analytics_folder, "terms.txt"), "w")
terms.writelines("%s\n" % l for l in terms_array)
terms.close()

print("Done Generating Analytics Input Files")