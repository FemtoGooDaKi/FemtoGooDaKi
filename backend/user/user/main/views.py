import datetime
from dateutil.relativedelta import relativedelta
import dateutil.parser
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from user.settings import encode_password, encode_jwt, decode_jwt_data, verify_jwt
from main.models import User
from main.serializers import UserSerializer


def get_user_detail(username):
    try:
        obj = User.objects.get(username=username)
    except User.DoesNotExist:
        return HttpResponse(status=404)
    serializer = UserSerializer(obj)
    data = serializer.data
    del data['password_hash']

    data['age'] = relativedelta(datetime.datetime.now(), dateutil.parser.parse(data['birthDate'])).years

    return JsonResponse(data)


def update_user_detail(username, data):
    try:
        obj = User.objects.get(username=username)
    except User.DoesNotExist:
        return HttpResponse(status=404)

    if 'password_hash' in data:
        del data['password_hash']
    if 'username' in data:
        del data['username']
    serializer = UserSerializer(obj, data=data)
    if serializer.is_valid():
        serializer.save()

        data = serializer.data
        del data['password_hash']
        return HttpResponse(status=200)
    return JsonResponse(serializer.errors, status=400)


def delete_user(username):
    try:
        obj = User.objects.get(username=username)
    except User.DoesNotExist:
        return HttpResponse(status=404)

    obj.delete()
    return HttpResponse(status=204)


@csrf_exempt
def user_endpoint(request, username):
    token = request.headers.get('Authorization', None)
    if not token or not verify_jwt(token.split(' ')[1]):
        return HttpResponse(status=401)

    if request.method == 'GET':
        return get_user_detail(username)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        payload = decode_jwt_data(token)
        if payload.get('username', '') != username:
            return HttpResponse(status=401)
        return update_user_detail(username, data)

    elif request.method == 'DELETE':
        payload = decode_jwt_data(token)
        if payload.get('username', '') != username:
            return HttpResponse(status=401)
        return delete_user(username)

    return HttpResponse(status=405)


@csrf_exempt
def login(request):
    if request.method != 'POST':
        return HttpResponse(status=405)

    data = JSONParser().parse(request)
    try:
        password_hash = encode_password(data.get('password', ''))
        obj = User.objects.get(username=data.get('username', ''), password_hash=password_hash)
    except User.DoesNotExist:
        return HttpResponse(status=401)

    payload = UserSerializer(obj).data
    payload = {key: value for key, value in payload.items() if key in {'username'}}

    token = encode_jwt(payload)
    response = HttpResponse(status=200)
    response['Authorization'] = 'Bearer {}'.format(token)
    return response


@csrf_exempt
def register(request):
    if request.method != 'POST':
        return HttpResponse(status=405)

    data = JSONParser().parse(request)
    data['registerDate'] = datetime.datetime.now().date()
    data['password_hash'] = encode_password(data.get('password', ''))
    del data['password']

    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return HttpResponse(status=201)
    return JsonResponse(serializer.errors, status=400)
