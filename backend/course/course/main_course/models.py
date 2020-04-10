from django.db import models
from main_knowledge.models import Knowledge


# Create your models here.
class Course(models.Model):
    author = models.CharField(max_length=30)
    courseName = models.CharField(max_length=128)
    description = models.TextField()
    knowledge_set = models.ManyToManyField(Knowledge)
    createDate = models.DateField()
    job = models.CharField(max_length=30)
