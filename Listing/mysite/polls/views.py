from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.

user = {firstName:"ben", lastName:"stock", dob:"2023-09-05T12:26:31.280Z", email:"ben@yopmail.com", phone:"9999999999"}


def getRecommedationForUser(request):
    db = pymongo.MongoClient("mongodb://mongo-product:27017/product")
    userCol = db['users']
    userCol.insertMany([user])
    return HttpResponse('hello from django')