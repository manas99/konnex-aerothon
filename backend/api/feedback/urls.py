from django.urls import path
from . import views

urlpatterns = [
    path('create', views.create, name="api_add_feedback"),
    path('read', views.read, name="api_read_feedback"),
    path('delete', views.delete, name="api_delete_feedback"),
]
