from django.test import TestCase
from main_course.models import Course
from django.http import HttpRequest
from main_course.views import course_endpoint, course_id_endpoint, create_course, search_course
from datetime import datetime
import json
from io import BytesIO
from main_knowledge.models import Knowledge

class courseTestCase(TestCase):

    def setUp(self):
        self.knowledge = Knowledge.objects.create(
            author="author001",
            subject="subject001",
            content="hihihihihihihihihihhihi",
            createDate=datetime(2020,3,1)
        )
        # course = Course.objects.create(
        #     author="author001",
        #     courseName="course001",
        #     description="description",
        #     createDate=datetime(2020,3,4),
        #     job="Author"
        # )
        self.course2 = Course(
            id="2",
            author="author002",
            courseName="course002",
            description="description",
            createDate=datetime(2020,2,4),
            job="Author"
        ).save()
        course2_ = Course.objects.get(id="2")
        self.knowledge_set2 = course2_.knowledge_set.create(
            author="author002",
            subject="subject002",
            content="hihihihihihihihihihhihi",
            createDate=datetime(2020,2,1)
        ).save

    def mock_request(self, method, content = json.dumps({}), header = {"Content-Type":"application/json"}):
        request1 = HttpRequest()
        request1.method = method
        body_content = content
        request1._stream = BytesIO(body_content.encode())
        request1.content_type = "application/json"
        request1.headers = header

        return request1
    
    # ------------------------------------

    def test_model(self):
        course = Course.objects.get(author="author002")
        self.assertEquals(course.courseName,"course002")
    
    # ------------------------------------

    def test_course_endpoint_wrong_method(self):
        authen = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYWluIn0.Zrm7f9vw9qLA8dWxK9TRDZxO7U1XZQqSsgxFitf8Leg'
        headers = {"Content-Type":"application/json","Authorization":str(authen)}
        endpoint_response = course_endpoint(courseTestCase.mock_request(self,"VIEW",header=headers))
        self.assertEquals(endpoint_response.status_code, 405)
    
    def test_course_endpoint_wrong_and_no_authorization(self):
        authen = 'Bearer eyJhbGcwrongoneIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYWluIn0.Zrm7f9vw9qLA8dWxK9TRDZxO7U1XZQqSsgxFitf8Leg'
        headers = {"Content-Type":"application/json","Authorization":str(authen)}
        # wrong authen
        endpoint_response = course_endpoint(courseTestCase.mock_request(self,"GET",header=headers))
        self.assertEquals(endpoint_response.status_code, 401)
        # no authen
        endpoint_res = course_endpoint(courseTestCase.mock_request(self,"GET"))
        self.assertEquals(endpoint_res.status_code, 401)
        