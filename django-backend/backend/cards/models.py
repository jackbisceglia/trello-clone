from django.db import models

# Create your models here.
class Card(models.Model):
    title = models.CharField(max_length=150, null=False)

class Task(models.Model):
    title = models.CharField(max_length=150, null=False)
    strikethrough = models.BooleanField(default=False)
    card = models.ForeignKey(Card, on_delete=models.CASCADE)