from rest_framework import serializers
from main_course.models import Course
from main_knowledge.serializers import KnowledgeSerializer, KnowledgePreviewSerializer


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
    knowledge_set = KnowledgePreviewSerializer(read_only=True, many=True)

    class Meta:
        model = Course
        fields = ('id', 'courseName', 'knowledge_set', 'author', 'description', 'createDate', 'job')
