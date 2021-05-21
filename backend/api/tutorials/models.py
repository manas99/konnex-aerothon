from django.db import models
from django.utils import timezone

# Create your models here.

class Tutorial(models.Model):
    client_id = models.CharField(max_length=100)
    intent = models.CharField(max_length=50)
    description = models.CharField(max_length=500)

    def __str__(self):
        return str(self.client_id) + " - " + str(self.intent) + " - " + str(self.description)

    def get_client_id(self):
        return self.client_id

    def get_intent(self):
        return self.intent

    def get_description(self):
        return self.description

class TutorialStep(models.Model):
    tutorial = models.ForeignKey(Tutorial, on_delete=models.CASCADE)
    html_id = models.CharField(max_length=50)
    description = models.CharField(max_length=500)
    step_number = models.IntegerField()

    def __str__(self):
        return str(self.html_id) + " - " + str(self.description) + " - " + str(self.step_number)

    def get_html_id(self):
        return self.html_id

    def get_description(self):
        return self.description

    def get_step_number(self):
        return self.step_number