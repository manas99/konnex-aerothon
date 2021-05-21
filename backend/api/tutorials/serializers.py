from rest_framework import serializers
from .models import Tutorial, TutorialStep

class TutorialSerializer(serializers.ModelSerializer):
    steps = TutorialStepSerializer(many=True)
    class Meta:
        model = Tutorial
        fields = ('client_id', 'intent', 'description', 'steps')

    def create(self, validated_data):
        steps_validated_data = validated_data.pop('steps')
        tutorial = Tutorial.objects.create(**validated_data)
        steps_serializer = self.fields['steps']
        for each in steps_validated_data:
            each['tutorial'] = tutorial
        steps = steps_serializer.create(steps_validated_data)
        return tutorial

class TutorialStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = TutorialStep
        fields = ('html_id', 'description', 'step_number')
