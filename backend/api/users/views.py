import requests
from django.db import transaction
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny

from .serializers import UserSer
from .models import User
from backend.settings import OAUTH2_CLIENT_ID, OAUTH2_CLIENT_SECRET, OAUTH2_BASE_URL
from helpers import has_parameters, response_success, response_error


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@has_parameters(['username', 'password', 'name'])
@transaction.atomic
def create(request):
    ser = UserSer(data=request.data)
    if not ser.is_valid():
        err_ = []
        for x in ser.errors:
            err_ = err_ + ser.errors[x]
        return response_error(message=err_, code=400)
    user = ser.save()
    user.save()
    return response_success(message='User created successfully.')


@api_view(["POST"])
@permission_classes([AllowAny])
@has_parameters(['username', 'password'])
def login(request):
    r = requests.post(
        OAUTH2_BASE_URL + '/oauth2/token/',
        data={
            'grant_type': 'password',
            'username': request.data['username'],
            'password': request.data['password'],
            'client_id': OAUTH2_CLIENT_ID,
            'client_secret': OAUTH2_CLIENT_SECRET,
        },
    )
    if r.status_code >= 200 and r.status_code <= 299:
        return response_success(result=r.json(), message="Successfully logged in!")
    else:
        return response_error(message=r.json()["error"], code=r.status_code)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def read(request):
    ser = UserSer(User.objects.all(), many=True)
    return response_success(result=ser.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@has_parameters(['user_id'])
def delete(request):
    User.objects.filter(id=request.data['user_id']).delete()
    return response_success(message='User deleted successfully.')


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@has_parameters(['user_id', 'name', 'is_active'])
def update(request):
    user = User.objects.get(id=request.data['user_id'])
    user.name = request.data['name']
    if request.data['is_active'] == 'active':
        user.is_active = True
    else:
        user.is_active = False
    if 'new_password' in request.data:
        if len(request.data['new_password']) >= 8:
            user.set_password(request.data['new_password'])
    user.save()
    return response_success(message='User updated successfully.')


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def validate(request):
    return response_success(
        result={
            'user': UserSer(request.user).data,
        }
    )
