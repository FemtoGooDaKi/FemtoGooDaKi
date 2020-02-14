from .util import user_detail_fields


def register(register_data):
    result = {
        'id': 1234,
        'status': 'success',
    }

    return result


def get_user_register_data(form):
    register_data = {}
    for field in user_detail_fields:
        if field not in ('id', 'registerDate'):
            continue

        register_data[field] = form.get(field, None)

    return register_data


