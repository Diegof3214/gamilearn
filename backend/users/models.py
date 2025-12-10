from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    points = models.IntegerField(default=0)
    level = models.IntegerField(default=1)
    badges = models.TextField(default="", blank=True, null=True)

    def __str__(self):
        return self.username
