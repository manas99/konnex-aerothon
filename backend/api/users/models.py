from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(
        max_length=100, null=False, blank=False, unique=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []

    is_staff = models.BooleanField()
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)

    objects = UserManager()

    def __str__(self):
        return str(self.name) + " - " + str(self.username)

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return self.is_staff

    def has_module_perms(self, app_label):
        return self.is_staff
