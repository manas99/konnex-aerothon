from django.urls import path
from . import views

urlpatterns = [
    path('create', views.create, name="api_add_tutorial"),
    path('read', views.read, name="api_read_tutorial"),
    path('delete', views.delete, name="api_delete_tutorial"),
]
