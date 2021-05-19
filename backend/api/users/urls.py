from django.urls import path
from . import views

urlpatterns = [
    path('create', views.create, name="api_add_user"),
    path('read', views.read, name="api_read_user"),
    path('update', views.update, name="api_update_user"),
    path('delete', views.delete, name="api_delete_user"),
    path('login', views.login, name="api_login"),
]
