import datetime
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from course.settings import decode_jwt_data, verify_jwt

from main_course.models import Course
from main_course.serializers import CourseReadSerializer, CourseCreateSerializer


def get_course_detail(pk):
    try:
        obj = Course.objects.get(pk=pk)
        data = CourseReadSerializer(obj).data
    except Course.DoesNotExist:
        return HttpResponse(status=404)

    return JsonResponse(data)


@csrf_exempt
def course_id_endpoint(request, pk):
    if request.method == 'GET':
        return get_course_detail(pk)

    return HttpResponse(status=405)


def create_course(data, username):
    data['author'] = username
    data['createDate'] = datetime.datetime.now().date()

    serializer = CourseCreateSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return HttpResponse(status=201)
    return JsonResponse(serializer.errors, status=400)


def search_course(query):
    try:
        obj = Course.objects.filter(courseName__contains=query)
        data = {'results': CourseReadSerializer(obj, many=True).data}
    except Course.DoesNotExist:
        data = {'results': []}

    return JsonResponse(data)


@csrf_exempt
def course_endpoint(request):
    if request.method == 'POST':
        token = request.headers.get('Authorization', None)
        if not token or not verify_jwt(token.split(' ')[1]):
            return HttpResponse(status=401)

        data = JSONParser().parse(request)
        payload = decode_jwt_data(token)
        username = payload.get('username', '')
        if not username:
            return HttpResponse(status=401)

        return create_course(data, username)

    if request.method == 'GET':
        query = request.GET.get('query', '')

        return search_course(query)

    return HttpResponse(status=405)

