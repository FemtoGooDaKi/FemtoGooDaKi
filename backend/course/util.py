import os
import requests

USER_URL = os.getenv('USER_ENDPOINT_URL').strip('/') + ':' + os.getenv('USER_ENDPOINT_PORT')

course_detail_fields = [
    'id',
    'courseName',
    'description',
    'job',
    'author',
]


def validate_token(username, token):
    url = USER_URL.strip('/') + '/validateToken'
    data = {
        'username': username,
        'token': token,
    }

    resp = requests.post(url, data=data)
    return resp.status_code == 200
