course_detail_fields = [
    'id',
    'courseName',
    'description',
    'job',
    'author',
]


def validate_token(username, token):
    if token == 'login-token':
        return True
