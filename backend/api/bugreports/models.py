from django.db import models
from django.utils import timezone


class BugReport(models.Model):
    client_id = models.CharField(max_length=100)
    title = models.CharField(max_length=50, blank=True, default="")
    description = models.CharField(max_length=1000)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ('created_at',)

    def __str__(self):
        return str(self.client_id) + " - " + str(self.title) + " - " + str(self.description) + " - " + str(self.created_at)

    def get_client_id(self):
        return self.client_id

    def get_title(self):
        return self.title

    def get_description(self):
        return self.description

    def get_created_at(self):
        return self.created_at
