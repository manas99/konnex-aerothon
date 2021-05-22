from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import Definition
from helpers import has_parameters, response_success, response_error


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@has_parameters(['key', 'value'])
def create(request):
    Definition(key=request.data['key'],
               value=request.data['value']).save()
    return response_success(message='Definition created successfully.')


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def read(request):
    feedbacks = Definition.objects.all().values('id', 'key', 'value')
    return response_success(result=list(feedbacks))


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@has_parameters(['def_id', 'key', 'value'])
def update(request):
    def_ = Definition.objects.get(id=request.data['def_id'])
    def_.key = request.data['title']
    def_.value = request.data['value']
    def_.save()
    return response_success(message='Definition updated successfully.')


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@has_parameters(['def_id'])
def delete(request):
    Definition.objects.filter(id=request.data['def_id']).delete()
    return response_success(message='Definition deleted successfully.')
