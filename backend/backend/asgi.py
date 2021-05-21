import os

from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
import sockets.routing

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")


application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": URLRouter(sockets.routing.websocket_urlpatterns)
})
