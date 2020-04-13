from django.db import models
from main_course.models import Course


# Create your models here.
class Enrollment(models.Model):
    username = models.CharField(max_length=30)
    course = models.ManyToManyField(Course)
    enrollDate = models.DateField()

    class Meta:
        unique_together = (('username', 'course'),)
