from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from .models import Announcement
from helpers import has_parameters, response_success
from sockets.constants import ALL_CLIENTS_GROUP
from sockets.messages import get_announcement


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@has_parameters(['title', 'description', 'is_enabled'])
def create(request):
    enable = False
    if request.data['is_enabled']:
        enable = True
    ann = Announcement(title=request.data['title'],
                       description=request.data['description'],
                       is_enabled=enable
                       )
    ann.save()
    if enable:
        layer = get_channel_layer()
        async_to_sync(layer.group_send)(ALL_CLIENTS_GROUP, {
            'type': 'show.announcement',
            'message': get_announcement(ann)
        })
    return response_success(message='Announcement created successfully.')


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def read(request):
    announcement = Announcement.objects.all().values(
        'id', 'title', 'description', 'created_at', 'is_enabled')
    return response_success(result=list(announcement))


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@has_parameters(['announcement_id', 'title', 'description', 'is_enabled'])
def update(request):
    ann = Announcement.objects.get(id=request.data['announcement_id'])
    ann.title = request.data['title']
    ann.description = request.data['description']
    if request.data['is_enabled']:
        ann.is_enabled = True
    else:
        ann.is_enabled = False
    ann.save()
    if request.data['is_enabled']:
        layer = get_channel_layer()
        async_to_sync(layer.group_send)(ALL_CLIENTS_GROUP, {
            'type': 'show.announcement',
            'message': get_announcement(ann)
        })
    return response_success(message='Announcement created successfully.')


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@has_parameters(['announcement_id'])
def delete(request):
    Announcement.objects.filter(id=request.data['announcement_id']).delete()
    return response_success(message='Announcement deleted successfully.')
