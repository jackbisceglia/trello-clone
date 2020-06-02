from django.db import models

# Create your models here.
class Card(models.Model):
    title = models.CharField(max_length=150, null=False)

    def __str__(self):
        return self.title

        
class Task(models.Model):
    card = models.ForeignKey(Card, on_delete=models.CASCADE, related_name="tasks")
    title = models.CharField(max_length=150, null=False)
    strikethrough = models.BooleanField(default=False)

    def __str__(self):
        return self.card.title