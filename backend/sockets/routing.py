from django.urls import path

from . import consumers

websocket_urlpatterns = [
    path('ws/<client>/', consumers.ChatConsumer.as_asgi()),
    # re_path(r'ws/client/(?P<client_name>\w+)/$', consumers.ChatConsumer.as_asgi()),
]