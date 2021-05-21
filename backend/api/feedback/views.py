from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import Feedback
from helpers import has_parameters, response_success, response_error
from django.http import JsonResponse

@api_view(["POST"])
@permission_classes([IsAuthenticated])
@has_parameters(['title', 'description', 'client_id'])
def create(request):
    Feedback(client_id=request.data['client_id'], title=request.data['title'], description=request.data['description']).save()
    return response_success(message='Feedback created successfully.')

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def read(request):
    feedbacks = Feedback.objects.all().values('id', 'client_id', 'title', 'description', 'created_at')
    return JsonResponse(list(feedbacks), safe=False)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
@has_parameters(['feedback_id'])
def delete(request):
    Feedback.objects.filter(id=request.data['feedback_id']).delete()
    return response_success(message='Feedback deleted successfully.')
