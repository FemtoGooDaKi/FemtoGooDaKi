from rest_framework import serializers
from main_course.models import Course
from main_knowledge.serializers import KnowledgeSerializer


class CourseCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class CourseReadSerializer(serializers.ModelSerializer):
    knowledge_set = KnowledgeSerializer(read_only=True, many=True)

    class Meta:
        model = Course
        fields = '__all__'


class CoursePreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('courseName', 'author', 'description', 'createDate', 'job')
