from django.urls import path
from . import views

urlpatterns = [
    path('read', views.read, name="api_read_user"),
    path('delete', views.delete, name="api_delete_user"),
]
