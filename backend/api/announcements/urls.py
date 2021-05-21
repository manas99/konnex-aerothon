from django.urls import path
from . import views

urlpatterns = [
    path('create', views.create, name="api_add_announcements"),
    path('read', views.read, name="api_read_announcements"),
    path('delete', views.delete, name="api_delete_announcements"),
]
