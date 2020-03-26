from django.db import models


# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=30, primary_key=True)
    password_hash = models.CharField(max_length=128)
    firstName = models.CharField(max_length=30)
    lastName = models.CharField(max_length=30)
    birthDate = models.DateField()
    registerDate = models.DateField()
    job = models.CharField(max_length=30)
