from rest_framework import serializers
from .models import Tutorial, TutorialStep


class TutorialStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = TutorialStep
        fields = ('html_id', 'description', 'step_number')


class TutorialSerializer(serializers.ModelSerializer):
    steps = serializers.SerializerMethodField()

    class Meta:
        model = Tutorial
        fields = ('id', 'description', 'intent', 'steps')

    def create(self, validated_data):
        steps_validated_data = validated_data.pop('steps')
        tutorial = Tutorial.objects.create(**validated_data)
        steps_serializer = self.fields['steps']
        for each in steps_validated_data:
            each['tutorial'] = tutorial
        steps_serializer.create(steps_validated_data)
        return tutorial

    def get_steps(self, obj):
        return TutorialStepSerializer(obj.tutorialstep_set.all(), many=True).data
