from django.db import models


class Definition(models.Model):
    key = models.CharField(max_length=50)
    value = models.CharField(max_length=250)
