from .util import course_detail_fields


def add_course(creation_data):
    result = {
        'id': 5678,
        'status': 'success',
    }

    return result


def get_course_creation_data(form):
    data = {}
    for field in course_detail_fields:
        if field == 'id':
            continue

        data[field] = form.get(field, None)

    return data


