from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import Announcement
from helpers import has_parameters, response_success, response_error
from django.http import JsonResponse


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@has_parameters(['title', 'description', 'client_id'])
def create(request):
    Announcement(client_id=request.data['client_id'], title=request.data['title'],
                 description=request.data['description']).save()
    return response_success(message='Announcement created successfully.')


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def read(request):
    announcement = Announcement.objects.all().values(
        'id', 'client_id', 'title', 'description', 'created_at')
    return response_success(result=list(announcement))


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@has_parameters(['announcement_id'])
def delete(request):
    Announcement.objects.filter(id=request.data['announcement_id']).delete()
    return response_success(message='Announcement deleted successfully.')
