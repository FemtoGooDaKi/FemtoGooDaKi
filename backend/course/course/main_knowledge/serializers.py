from main_knowledge.models import Knowledge
from rest_framework import serializers


class KnowledgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Knowledge
        fields = '__all__'
