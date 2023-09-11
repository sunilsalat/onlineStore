from django.urls import path
from . import views

urlpatterns = [
    path('get', views.getRecommedationForUser),
    path('trainModel', views.trainModel)
]