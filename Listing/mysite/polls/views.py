from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
import json

import pymongo
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
plt.style.use("ggplot")

import sklearn
from sklearn.decomposition import TruncatedSVD
Client = pymongo.MongoClient("mongodb://mongo-product:27017")
db = Client['product']
# Create your views here.


def trainModel(request):  
    lists = db.productreview.find({}).limit(10000)
    amazon_ratings = pd.DataFrame(lists)
    amazon_ratings = amazon_ratings.dropna()
    if(False):
        # amazon_ratings.head()
        popular_products = pd.DataFrame(amazon_ratings.groupby('ProductId')['Rating'].count())
        most_popular = popular_products.sort_values('Rating', ascending=False)
        out = most_popular.to_json(default_handler=str)
        return HttpResponse(out)
        
    if(True):
        amazon_ratings1 = amazon_ratings.head(10000)
        ratings_utility_matrix = amazon_ratings1.pivot_table(values='Rating', index='UserId', columns='ProductId', fill_value=0)
        X = ratings_utility_matrix.T
        SVD = TruncatedSVD(n_components=10)
        decomposed_matrix = SVD.fit_transform(X)
        correlation_matrix = np.corrcoef(decomposed_matrix)
        correlation_matrix.shape
        i = X.index[99]
        product_names = list(X.index)
        product_ID = product_names.index(i)
        correlation_product_ID = correlation_matrix[product_ID]
        correlation_product_ID.shape
        print(correlation_product_ID)
        Recommend = list(X.index[correlation_product_ID > 0.90])
        return HttpResponse(json.dumps(Recommend))

def getRecommedationForUser(request):
    users =  db.users.find({})
    return HttpResponse(users)