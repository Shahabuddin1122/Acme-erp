from django.urls import path

from app import views

urlpatterns = [
    path('create-pole', views.create_pole),
]