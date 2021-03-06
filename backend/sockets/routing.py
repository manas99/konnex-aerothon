from django.urls import path

from . import consumers

websocket_urlpatterns = [
    path('ws/admin/dashboard', consumers.AdminDashboardConsumer.as_asgi()),
    path('ws/admin/connections', consumers.AdminConnectionsConsumer.as_asgi()),
    path('ws/<client_id>', consumers.ClientConsumer.as_asgi()),
    # re_path(r'ws/client/(?P<client_name>\w+)/$', consumers.ChatConsumer.as_asgi()),
]
