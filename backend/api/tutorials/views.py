import json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import Tutorial, TutorialStep
from helpers import has_parameters, response_success, response_error

from .serializers import TutorialSerializer
from django.http import HttpResponse


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@has_parameters(['intent', 'description', 'steps'])
def create(request):
    json_body = {}
    for param in request.data:
        if param == 'steps':
            json_body[param] = json.loads(request.data[param])
            continue
        json_body[param] = request.data[param]

    ser = TutorialSerializer(data=json_body)
    if not ser.is_valid():
        err_ = []
        for x in ser.errors:
            err_.append(x)
        return response_error(message=err_, code=400)
    ser.save()
    return response_success(message='Tutorial created successfully.')


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def read(request):
    res = [
        {
            "id": x.id,
            "intent": x.intent,
            "description": x.description,
            "steps": [
                {
                    "id": y.id, "html_id": y.html_id,
                    "description": y.description, "step_number": y.step_number
                } for y in x.tutorialstep_set.all()]
        } for x in Tutorial.objects.all()
    ]
    return response_success(result=res)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@has_parameters(['tutorial_id'])
def delete(request):
    Tutorial.objects.filter(id=request.data['tutorial_id']).delete()
    return response_success(message='Tutorial deleted successfully.')
