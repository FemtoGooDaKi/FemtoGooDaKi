import os
import flask
from flask import Flask
from flask import jsonify
from flask import request

app = Flask(__name__)


@app.route('/detail', methods=['POST'])
def user_detail():
    from user.detail import get_user_detail

    username = request.form.get('username', None)
    if username is None:
        response = flask.Response('please provide username', status=400)
    else:
        result = get_user_detail(username)
        response = jsonify(result)

    return response


@app.route('/register', methods=['POST'])
def register_user():
    from user.register import get_user_register_data, register

    register_data = get_user_register_data(request.form)
    response = register(register_data)
    return response


@app.route('/login', methods=['POST'])
def login():
    from user.login import login

    username = request.form.get('username', None)
    password = request.form.get('password', None)

    if username is None:
        response = flask.Response('please provide username', status=400)
    elif password is None:
        response = flask.Response('please provide password', status=400)
    else:
        result, status_code = login(username, password)
        response = jsonify(result), status_code

    return response


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=os.getenv('USER_ENDPOINT_PORT'))
