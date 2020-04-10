import datetime
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from course.settings import decode_jwt_data, verify_jwt

from main_knowledge.models import Knowledge
from main_knowledge.serializers import KnowledgeSerializer


@csrf_exempt
def knowledge_id_endpoint(request, pk):
    pass


def create_knowledge(data, username):
    data['author'] = username
    data['createDate'] = datetime.datetime.now().date()

    serializer = KnowledgeSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return HttpResponse(status=201)
    return JsonResponse(serializer.errors, status=400)


def search_knowledge(query):
    try:
        obj = Knowledge.objects.filter(subject__contains=query)
        data = {'results': KnowledgeSerializer(obj, many=True).data}
        print(data)
    except Knowledge.DoesNotExist:
        data = {'results': []}

    return JsonResponse(data)


@csrf_exempt
def knowledge_endpoint(request):
    token = request.headers.get('Authorization', None)
    if not token or not verify_jwt(token.split(' ')[1]):
        return HttpResponse(status=401)

    if request.method == 'POST':
        data = JSONParser().parse(request)
        payload = decode_jwt_data(token)
        username = payload.get('username', '')
        if not username:
            return HttpResponse(status=401)

        return create_knowledge(data, username)

    if request.method == 'GET':
        query = request.GET.get('query', '')

        return search_knowledge(query)

    return HttpResponse(status=405)

