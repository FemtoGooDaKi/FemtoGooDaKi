import datetime
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from course.settings import decode_jwt_data, verify_jwt

from main_enrollment.models import Enrollment
from main_enrollment.serializers import EnrollmentSerializer


def get_or_create_enrollment(username):
    try:
        obj = Enrollment.objects.get(username=username)
    except Enrollment.DoesNotExist:
        obj = Enrollment.objects.create(username=username)

    return obj


def enroll(username, course_id):
    obj = get_or_create_enrollment(username)
    obj.courses.add(course_id)

    serializer = EnrollmentSerializer(obj)
    if serializer.is_valid():
        serializer.save()
        return HttpResponse(status=201)
    return JsonResponse(serializer.errors, status=400)


@csrf_exempt
def enroll_endpoint(request):
    if request.method != 'POST':
        return HttpResponse(status=405)

    token = request.headers.get('Authorization', None)
    if not token or not verify_jwt(token.split(' ')[1]):
        return HttpResponse(status=401)

    data = JSONParser().parse(request)
    payload = decode_jwt_data(token)

    username = payload.get('username', '')
    if not username or username != payload.get('username', ''):
        return HttpResponse(status=401)

    course_id = data.get('course_id', '')
    try:
        course_id = int(course_id)
    except ValueError:
        return HttpResponse(status=400)

    return enroll(username, course_id)


@csrf_exempt
def get_courses(request, username):
    if request.method != 'GET':
        return HttpResponse(status=405)
    pass
