from django.shortcuts import render
from django.http import HttpResponse
import pymongo


# Create your views here.

user = {"firstName":"ben", "lastName":"stock", "dob":"2023-09-05T12:26:31.280Z", "email":"ben@yopmail.com", "phone":"9999999999"}


def getRecommedationForUser(request):
    client = pymongo.MongoClient("mongodb://mongo-product:27017")
    db = client['product']
    userCol = db['users']
    print({userCol})
    users =  userCol.find({})
    return HttpResponse(users)