from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import BugReport
from helpers import has_parameters, response_success, response_error


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@has_parameters(['title', 'description', 'client_id'])
def create(request):
    BugReport(client_id=request.data['client_id'], title=request.data['title'],
             description=request.data['description']).save()
    return response_success(message='Bug report added successfully.')


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def read(request):
    bug_reports = BugReport.objects.all().values(
        'id', 'client_id', 'title', 'description', 'created_at')
    return response_success(result=list(bug_reports))


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@has_parameters(['bug_id'])
def delete(request):
    BugReport.objects.filter(id=request.data['bug_id']).delete()
    return response_success(message='Bug report deleted successfully.')
