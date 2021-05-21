from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import Tutorial, TutorialStep
from helpers import has_parameters, response_success, response_error

from .serializers import TutorialSerializer, TutorialStepSerializer
import json
from rest_framework.parsers import JSONParser
from django.http import HttpResponse

@api_view(["POST"])
@permission_classes([IsAuthenticated])
@has_parameters(['intent', 'description', 'client_id', 'steps'])
def create(request):
    json_body = {}
    for param in request.data:
        if param == 'steps':
            json_body[param] = json.loads(request.data[param].replace("'",'"'))
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

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def read(request):
    all_tutorials = []
    tutorial_steps = TutorialStep.objects.filter().all()
    tutorials = Tutorial.objects.filter().all()
    for tutorial in tutorials:
        curr_tutorial = {"intent": tutorial.intent, "description": tutorial.description, "steps":[]}
        for step in tutorial_steps:
            if step.tutorial == tutorial:
                curr_step = {"step_number": step.step_number, "html_id": step.html_id,
                "description": step.description}
                curr_tutorial["steps"].append(curr_step)
        all_tutorials.append(curr_tutorial)
    return HttpResponse(json.dumps(all_tutorials))
    
@api_view(["POST"])
@permission_classes([IsAuthenticated])
@has_parameters(['intent'])
def delete(request):
    Tutorial.objects.filter(intent=request.data['intent']).delete()
    return response_success(message='Tutorial deleted successfully.')