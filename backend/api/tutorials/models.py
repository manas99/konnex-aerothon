from django.db import models


class Tutorial(models.Model):
    intent = models.CharField(max_length=50)
    description = models.CharField(max_length=500)

    def __str__(self):
        return str(self.intent) + " - " + str(self.description)

    def get_intent(self):
        return self.intent

    def get_description(self):
        return self.description


class TutorialStep(models.Model):
    tutorial = models.ForeignKey(Tutorial, on_delete=models.CASCADE)
    html_id = models.CharField(max_length=50)
    description = models.CharField(max_length=500)
    step_number = models.IntegerField()

    class Meta:
        ordering = ('-tutorial__id', 'step_number',)

    def __str__(self):
        return str(self.html_id) + " - " + str(self.description) + " - " + str(self.step_number)

    def get_html_id(self):
        return self.html_id

    def get_description(self):
        return self.description

    def get_step_number(self):
        return self.step_number
