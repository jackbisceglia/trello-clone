from rest_framework import serializers
from cards.models import Card, Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ("title", "strikethrough", "id")

# Card Serializer
class CardSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)
    class Meta:
        model = Card
        fields = ("title", "tasks", "id")




