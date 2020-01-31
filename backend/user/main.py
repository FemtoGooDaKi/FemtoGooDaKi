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


@app.route('/register', methods=['POST'])
def register_user():
    from .register import get_user_register_data, register

    register_data = get_user_register_data(request.form)
    response = register(register_data)
    return response


if __name__ == '__main__':
    app.run()
