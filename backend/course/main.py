import flask
from flask import Flask
from flask import jsonify
from flask import request

app = Flask(__name__)


@app.route('/detail', methods=['POST'])
def course_detail():
    from .detail import get_course_detail

    course_id = request.form.get('courseId', None)
    if course_id is None:
        response = flask.Response('please provide courseId', status=400)
    else:
        result = get_course_detail(course_id)
        response = jsonify(result)

    return response


@app.route('/addCourse', methods=['POST'])
def add_course():
    from .add_course import get_course_creation_data, add_course

    creation_data = get_course_creation_data(request.form)
    response = add_course(creation_data)
    return response


if __name__ == '__main__':
    app.run()
