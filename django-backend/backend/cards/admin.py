from django.contrib import admin

# Register your models here.
from .models import Card, Task

admin.site.register(Card)
admin.site.register(Task)