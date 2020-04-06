def search_courses(keyword, last_id=None):
    last_id = int(last_id or 1234)
    data = [
        {
            'id': str(last_id + 1),
            'courseName': 'CourseDummy1',
            'description': 'This is a dummy course 1. Id ' + str(last_id + 1),
            'job': 'DummyJobA',
            'author': 'Chain',
        },
        {
            'id': str(last_id + 2),
            'courseName': 'CourseDummy2',
            'description': 'This is a dummy course 2. Id ' + str(last_id + 2),
            'job': 'DummyJobA',
            'author': 'Kevin',
        },
        {
            'id': str(last_id + 3),
            'courseName': 'CourseDummy3',
            'description': 'This is a dummy course 3. Id ' + str(last_id + 3),
            'job': 'DummyJobB',
            'author': 'Chain',
        },
    ]

    last_id = str(last_id + 3)
    return {
        'data': data,
        'lastId': last_id,
    }