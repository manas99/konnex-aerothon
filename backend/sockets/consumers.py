import json
from django.utils import timezone
from django.core.cache import caches
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from chatbot import get_chatbot_response
from api.announcements.models import Announcement
from .models import ClientConnection
from .messages import get_client_counts, send_msg, get_announcement
from .constants import ALL_CLIENTS_GROUP, ALL_ADMIN_DASH_GROUP


class ClientConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        self.client_id = self.scope['url_route']['kwargs']['client_id']
        self.connection_model = ClientConnection()
        self.connection_model.client_id = self.client_id
        self.connection_model.save()
        caches['default'].set(
            'count_clients_total', str(int(caches['default'].get_or_set('count_clients_total', '0')) + 1))
        async_to_sync(self.channel_layer.group_add)(
            ALL_CLIENTS_GROUP, self.channel_name)
        async_to_sync(self.channel_layer.group_add)(
            self.client_id, self.channel_name)
        async_to_sync(self.channel_layer.group_send)(
            ALL_ADMIN_DASH_GROUP, {
                "type": "data.clients.count",
                'message': get_client_counts()
            })
        for x in Announcement.objects.filter(is_enabled=True).order_by('created_at'):
            self.send(text_data=send_msg(
                'show_announcement', get_announcement(x)))
        self.send(text_data=send_msg('query_device_type'))

    def disconnect(self, close_code):
        self.connection_model.ended_at = timezone.now()
        self.connection_model.save()
        caches['default'].set(
            'count_clients_total', str(int(caches['default'].get_or_set('count_clients_total', '0')) - 1))
        key = 'count_clients_' + self.connection_model.device
        caches['default'].set(
            key, str(int(caches['default'].get_or_set(key, '0')) - 1))
        async_to_sync(self.channel_layer.group_discard)(
            ALL_CLIENTS_GROUP, self.channel_name)
        async_to_sync(self.channel_layer.group_discard)(
            self.client_id, self.channel_name)
        async_to_sync(self.channel_layer.group_send)(
            ALL_ADMIN_DASH_GROUP, {
                "type": "data.clients.count",
                'message': get_client_counts()
            })

    def receive(self, text_data):
        _json = json.loads(text_data)
        message = _json['message']
        if _json['action'] == 'query_device_type':
            self.connection_model.device = message
            self.connection_model.save()
            key = 'count_clients_' + message
            caches['default'].set(
                key, str(int(caches['default'].get_or_set(key, '0')) + 1))
            async_to_sync(self.channel_layer.group_send)(
                ALL_ADMIN_DASH_GROUP, {
                    "type": "data.clients.count",
                    'message': get_client_counts()
                })
            return
        if _json['action'] == 'chat':
            response = get_chatbot_response(message)
            self.send(text_data=json.dumps(response))
            return

    def show_announcement(self, event):
        self.send(text_data=send_msg("show_announcement", event['message']))


class AdminDashboardConsumer(WebsocketConsumer):
    def connect(self):
        async_to_sync(self.channel_layer.group_add)(
            ALL_ADMIN_DASH_GROUP, self.channel_name)
        self.accept()
        async_to_sync(self.channel_layer.group_send)(
            ALL_ADMIN_DASH_GROUP, {
                "type": "data.clients.count",
                'message': get_client_counts()
            })

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            ALL_ADMIN_DASH_GROUP, self.channel_name)

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        self.send(text_data=json.dumps({
            'message': message
        }))

    def data_clients_count(self, event):
        self.send(text_data=json.dumps(event))
