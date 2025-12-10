from rest_framework import serializers
from .models import Exercise, Topic, Language

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'

class TopicSerializer(serializers.ModelSerializer):
    # Opcional: Si quieres ver los ejercicios dentro del tema de una vez
    # exercises = ExerciseSerializer(many=True, read_only=True) 
    class Meta:
        model = Topic
        fields = ['id', 'name', 'order', 'description']

class LanguageSerializer(serializers.ModelSerializer):
    # Incluimos los temas dentro del lenguaje
    topics = TopicSerializer(many=True, read_only=True)

    class Meta:
        model = Language
        fields = ['id', 'name', 'icon', 'topics']