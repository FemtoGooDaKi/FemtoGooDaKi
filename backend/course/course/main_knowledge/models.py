from django.db import models


# Create your models here.
class Knowledge(models.Model):
    author = models.CharField(max_length=30)
    subject = models.CharField(max_length=128)
    content = models.TextField()
    createDate = models.DateField()
