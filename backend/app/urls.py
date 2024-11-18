from django.urls import path

from app import views

urlpatterns = [
    path('create-pole', views.create_pole),
    path('get-pole', views.get_poles),
    path('get-top-queries', views.get_top_queries),
    path('delete-pole', views.delete_pole),
]