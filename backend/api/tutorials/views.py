from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import Tutorial, Step
from helpers import has_parameters, response_success, response_error

from serializers import TutorialSerializer, TutorialStepSerializer

@api_view(["POST"])
@permission_classes([IsAuthenticated])
@has_parameters(['intent', 'description', 'client_id', 'steps'])
def create(request):
    ser = TutorialSerializer(data=request.data)
    if not ser.is_valid():
        err_ = []
        for x in ser.errors:
            err_ = err_ + ser.errors[x]
        return response_error(message=err_, code=400)
    tutorial = ser.save()
    tutorial.save()
    return response_success(message='Tutorial created successfully.')

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def read(request):
    ser = TutorialSerializer(Tutorial.objects.all(), many=True)
    return response_success(result=ser.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
@has_parameters(['tutorial_id'])
def delete(request):
    Tutorial.objects.filter(id=request.data['tutorial_id']).delete()
    return response_success(message='Tutorial deleted successfully.')