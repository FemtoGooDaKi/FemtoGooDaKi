import flask
from flask import Flask
from flask import jsonify
from flask import request

from .util import user_detail_fields

app = Flask(__name__)


def _get_user_detail(user_id):
    result = {
        'id': user_id,
        'firstName': 'Chain',
        'lastName': 'Sripilaipong',
        'birthDate': '1998-07-25',
        'age': 21,
        'registerDate': '2020-01-01',
        'job': 'Data Engineer',
    }

    return result


@app.route('/detail', methods=['POST'])
def get_user_detail():
    user_id = request.form.get('userId', None)
    if user_id is None:
        response = flask.Response('please provide userId', status=400)
    else:
        result = _get_user_detail(user_id)
        response = jsonify(result)

    return response


def _register(register_data):
    result = {
        'id': 1234,
        'status': 'success',
    }

    return result


def get_user_register_data(form):
    register_data = {}
    for field in user_detail_fields:
        if field == 'id':
            continue

        register_data[field] = form.get(field, None)

    return register_data


@app.route('/register', methods=['POST'])
def register():
    register_data = get_user_register_data(request.form)
    response = _register(register_data)
    return response


if __name__ == '__main__':
    app.run()
