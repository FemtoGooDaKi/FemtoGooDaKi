from rest_framework import serializers
from main_enrollment.models import Enrollment
from main_course.serializers import CoursePreviewSerializer


class EnrollmentSerializer(serializers.ModelSerializer):
    courses = CoursePreviewSerializer(read_only=True, many=True)

    class Meta:
        model = Enrollment
        fields = '__all__'
