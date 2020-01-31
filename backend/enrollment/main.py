import os
import flask
from flask import Flask
from flask import jsonify
from flask import request

from .util import validate_token


app = Flask(__name__)


@app.route('/enroll', methods=['POST'])
def enroll():
    from .enroll import enroll

    course_id = request.form.get('courseId', None)
    username = request.form.get('username', None)
    token = request.form.get('token', None)

    if course_id is None:
        response = flask.Response('please provide courseId', status=400)
    elif username is None:
        response = flask.Response('please provide username', status=400)
    elif token is None:
        response = flask.Response('please provide token', status=400)
    else:
        if not validate_token(username, token):
            response = flask.Response('invalid token', status=401)
        else:
            result, status_code = enroll(username, course_id)
            response = jsonify(result), status_code

    return response


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=os.getenv('ENROLL_ENDPOINT_PORT'))
