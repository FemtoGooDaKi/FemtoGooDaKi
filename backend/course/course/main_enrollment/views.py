import datetime
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from course.settings import decode_jwt_data, verify_jwt


@csrf_exempt
def enroll_endpoint(request):
    pass


@csrf_exempt
def get_courses(request, username):
    pass
