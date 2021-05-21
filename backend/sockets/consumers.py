import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .models import ClientConnection
from chatbot import handle_input

ALL_CLIENTS_GROUP = "clients"


class ClientConsumer(WebsocketConsumer):
    def connect(self):
        self.client_id = self.scope['url_route']['kwargs']['client_id']
        con = ClientConnection()
        con.client_id = self.client_id
        con.save()
        async_to_sync(self.channel_layer.group_add)(
            ALL_CLIENTS_GROUP, self.channel_name)
        async_to_sync(self.channel_layer.group_add)(
            self.client_id, self.channel_name)
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            ALL_CLIENTS_GROUP, self.channel_name)
        async_to_sync(self.channel_layer.group_discard)(
            self.client_id, self.channel_name)

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        response = handle_input(message)
        self.send(text_data=json.dumps(response))


class AdminConsumer(WebsocketConsumer):
    def connect(self):
        self.client_id = self.scope['url_route']['kwargs']['client_id']
        con = ClientConnection()
        con.client_id = self.client_id
        con.save()
        async_to_sync(self.channel_layer.group_add)(
            ALL_CLIENTS_GROUP, self.channel_name)
        async_to_sync(self.channel_layer.group_add)(
            self.client_id, self.channel_name)
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            ALL_CLIENTS_GROUP, self.channel_name)
        async_to_sync(self.channel_layer.group_discard)(
            self.client_id, self.channel_name)

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        async_to_sync(self.channel_layer.group_add)(
            self.client_id, self.channel_name)
        self.send(text_data=json.dumps({
            'message': message
        }))
