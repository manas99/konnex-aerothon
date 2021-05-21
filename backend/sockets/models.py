from django.db import models
from django.utils import timezone
# Create your models here.


class ClientConnection(models.Model):
    client_id = models.CharField(max_length=100)
    resolved = models.BooleanField(default=True)
    user = models.ForeignKey('users.User', null=True,
                             default=None, on_delete=models.SET_NULL)
    device = models.CharField(
        max_length=100, default=None, null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    ended_at = models.DateTimeField(default=None, null=True, blank=True)

    class Meta:
        ordering = ('-created_at',)
