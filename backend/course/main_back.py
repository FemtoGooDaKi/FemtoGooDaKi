import sys
import os
import flask
from flask import Flask
from flask import jsonify
from flask import request

from course_back.util import validate_token

app = Flask(__name__)


@app.route('/detail', methods=['POST'])
def course_detail():
    from course_back.detail import get_course_detail

    course_id = request.form.get('courseId', None)
    if course_id is None:
        response = flask.Response('please provide courseId', status=400)
    else:
        result = get_course_detail(course_id)
        response = jsonify(result)

    return response


@app.route('/search', methods=['GET'])
def search():
    from course_back.search import search_courses

    keyword = request.args.get('keyword', None)
    last_id = request.args.get('lastId', None)
    if keyword is None:
        response = flask.Response('please enter a keyword', status=400)
    else:
        response = search_courses(keyword, last_id)

    return response


@app.route('/addCourse', methods=['POST'])
def add_course():
    from course_back.add_course import get_course_creation_data, add_course

    author = request.form.get('author', None)
    token = request.form.get('token', None)

    if author is None:
        response = flask.Response('please provide author username', status=400)
    elif token is None:
        response = flask.Response('please provide token', status=400)
    else:
        if not validate_token(author, token):
            response = flask.Response('invalid token', status=401)
        else:
            creation_data = get_course_creation_data(request.form)
            response = add_course(creation_data)
    return response


if __name__ == '__main__':
    if len(sys.argv) > 1:
        port = sys.argv[1]
    elif os.getenv('COURSE_ENDPOINT_PORT'):
        port = os.getenv('COURSE_ENDPOINT_PORT')
    else:
        port = 3000

    print('running at port:', port)
    app.run(host='0.0.0.0', port=port)
