from rest_framework import serializers

from .models import ClientConnection


class ClientConnSer(serializers.ModelSerializer):
    class Meta:
        model = ClientConnection
        fields = ("id", "client_id", "device",
                  "created_at", "ended_at", "user")
