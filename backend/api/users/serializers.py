from rest_framework import serializers

from rest_framework.validators import UniqueValidator
from django.core.validators import RegexValidator
from .models import User


class UserSer(serializers.ModelSerializer):
    username = serializers.CharField(min_length=5, validators=[RegexValidator(
        regex=r"^[a-zA-Z0-9_]*$", message="Username can contain a-z, A-Z, 0-9 and '_'. "), UniqueValidator(queryset=User.objects.all(), message="The user name is already in use.")])
    name = serializers.CharField(min_length=4)

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.set_password(user.username)
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'name')
