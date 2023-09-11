from django.shortcuts import render
from django.http import HttpResponse
import pymongo
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
plt.style.use("ggplot")

import sklearn
from sklearn.decomposition import TruncatedSVD


# Create your views here.

user = {"firstName":"ben", "lastName":"stock", "dob":"2023-09-05T12:26:31.280Z", "email":"ben@yopmail.com", "phone":"9999999999"}

def trainModel(request):  
    amazon_ratings = pd.read_csv('../input/amazon-ratings/ratings_Beauty.csv')
    amazon_ratings = amazon_ratings.dropna()
    if('MostPopular'):
        # amazon_ratings.head()
        popular_products = pd.DataFrame(amazon_ratings.groupby('ProductId')['Rating'].count())
        most_popular = popular_products.sort_values('Rating', ascending=False)
        return most_popular
        
    if("related"):
        amazon_ratings1 = amazon_ratings.head(10000)
        ratings_utility_matrix = amazon_ratings1.pivot_table(values='Rating', index='UserId', columns='ProductId', fill_value=0)
        X = ratings_utility_matrix.T
        SVD = TruncatedSVD(n_components=10)
        decomposed_matrix = SVD.fit_transform(X)
        correlation_matrix = np.corrcoef(decomposed_matrix)
        correlation_matrix.shape
        Recommend = list(X.index[correlation_product_ID > 0.90])
        return Recommend

def getRecommedationForUser(request):
    client = pymongo.MongoClient("mongodb://mongo-product:27017")
    db = client['product']
    userCol = db['users']
    print({userCol})
    users =  userCol.find({})
    return HttpResponse(users)