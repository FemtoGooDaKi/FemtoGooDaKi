import hashlib
from .util import SALT


def get_hashed_password(password):
    return hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), SALT, 100000)


def login(username, password):
    key_to_check = get_hashed_password(password)
    key_correct = get_hashed_password('chainlor1234')

    if username == 'chain' and key_to_check == key_correct:
        result = {
            'token': 'login-token',
            'status': 'success',
        }
        status_code = 200
    else:
        result = {
            'status': 'failed'
        }
        status_code = 401

    return result, status_code


def validate_token(username, token):
    if token == 'login-token':
        result = {
            'status': 'success',
        }
        status_code = 200
    else:
        result = {
            'status': 'failed',
        }
        status_code = 401

    return result, status_code
