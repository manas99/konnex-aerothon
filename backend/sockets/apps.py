import asyncio
from rasa.core.agent import load_agent
from django.apps import AppConfig


class SocketsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'sockets'
    print("loading model")
    loop = asyncio.get_event_loop()
    tasks = [load_agent("./sockets/models")]
    rasa_agent = loop.run_until_complete(asyncio.gather(*tasks))[0]
    loop.close()
