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
            id="2",
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

    def get_token(self):
        return "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYWluIn0.Zrm7f9vw9qLA8dWxK9TRDZxO7U1XZQqSsgxFitf8Leg"
    # ------------------------------------

    def test_model(self):
        course = Course.objects.get(author="author002")
        self.assertEquals(course.courseName,"course002")
    
    # ------------------------------------

    def test_course_endpoint_wrong_method(self):
        authen = self.get_token()
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
    
    def test_course_endpoint_method_POST_pass(self):
        authen = self.get_token()
        headers = {"Content-Type":"application/json","Authorization":str(authen)}
        data = json.dumps({"courseName":"testcourse001","description":"description","knowledge_set":[2],"job":"student"})
        endpoint_response = course_endpoint(courseTestCase.mock_request(self,"POST",header=headers,content=data))
        self.assertEquals(endpoint_response.status_code, 201)
    
    def test_course_endpoint_method_POST_fail(self):
        authen = self.get_token()
        headers = {"Content-Type":"application/json","Authorization":str(authen)}
        data = json.dumps({"courseName":"testcourse001","description":"description","knowledge_set":[99],"job":"student"})
        endpoint_response = course_endpoint(courseTestCase.mock_request(self,"POST",header=headers,content=data))
        self.assertEquals(endpoint_response.status_code, 400)

    def test_course_endpoint_POST_no_username(self):
        authen = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyYWRuYW1lIjoiZGVsMSJ9.STuyNkPLdj0uFV7SUtr_L9ggLJ0wcs39KKHu5LtB-Ro"
        headers = {"Content-Type":"application/json","Authorization":str(authen)}
        data = json.dumps({"courseName":"testcourse001","description":"description","knowledge_set":[2],"job":"student"})
        endpoint_response = course_endpoint(courseTestCase.mock_request(self,"POST",header=headers,content=data))
        self.assertEquals(endpoint_response.status_code, 401)

    def test_search_course_exist(self):
        data = search_course("course").content.decode()
        self.assertTrue(data != '{"results": []}')

    def test_search_course_not_exist(self):
        data = search_course("xxxx").content.decode()
        self.assertTrue(data == '{"results": []}')