def get_course_detail(course_id):
    knowledge = [
        {
            'id': '1111',
            'knowledgeName': 'DummyKnowledge1',
            'description': 'This is A Dummy Knowledge 1. Id 1111',
            'author': 'chain',
        },
        {
            'id': '2222',
            'knowledgeName': 'DummyKnowledge2',
            'description': 'This is A Dummy Knowledge 1. Id 2222',
            'author': 'chain',
        },
        {
            'id': '3333',
            'knowledgeName': 'DummyKnowledge3',
            'description': 'This is A Dummy Knowledge 1. Id 3333',
            'author': 'kevin',
        },
    ]
    result = {
        'id': course_id,
        'courseName': 'Google Data Engineer Training',
        'description': 'Train Data Engineer from Zero to Hero',
        'job': 'Data Engineer',
        'author': 'chain',
        'knowledge': knowledge,
    }

    return result
