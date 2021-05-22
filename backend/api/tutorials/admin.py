from django.contrib import admin

# Register your models here.

from .models import Tutorial, TutorialStep

admin.site.register(Tutorial)
admin.site.register(TutorialStep)
