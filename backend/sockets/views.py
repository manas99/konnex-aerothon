from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .serializers import ClientConnSer
from .models import ClientConnection
from helpers import response_success, has_parameters


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def read(request):
    ser = {x.client_id: ClientConnSer(
        x).data for x in ClientConnection.objects.all()}
    return response_success(result=ser)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@has_parameters(['conn_id'])
def delete(request):
    ClientConnection.objects.filter(id=request.data['conn_id']).delete()
    return response_success(message="Connection record successfully deleted.")
