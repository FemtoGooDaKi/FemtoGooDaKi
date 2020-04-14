from django.test import TestCase
from main_course.models import Course
from django.http import HttpRequest
from datetime import datetime
import json
from io import BytesIO
from main_knowledge.models import Knowledge
from main_enrollment.models import Enrollment
from main_enrollment.views import enroll, enroll_endpoint, get_courses, get_or_create_enrollment

class enrollmentTestCase(TestCase):

    def setUp(self):
        self.enroll2 = Enrollment(
            username="testusername2"
        ).save()
        enroll2_ = Enrollment.objects.get(username="testusername2")
        self.courses2 = enroll2_.courses.create(
            id="2",
            author="author002",
            courseName="course002",
            description="description",
            createDate=datetime(2020,2,4),
            job="Author"
        ).save()

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
        enroll = Enrollment.objects.get(username="testusername2")
        self.assertEquals(enroll.username,"testusername2")
    
    # ------------------------------------

    def test_enroll_endpoint_method_not_post(self):
        endpoint_response = enroll_endpoint(enrollmentTestCase.mock_request(self,"GET"))
        self.assertEquals(endpoint_response.status_code, 405)
    
    def test_enroll_endpoint_no_authorization(self):
        endpoint_response = enroll_endpoint(enrollmentTestCase.mock_request(self,"POST"))
        self.assertEquals(endpoint_response.status_code, 401)
    
    def test_enroll_endpoint_value_error_or_no_data(self):
        authen = self.get_token()
        headers = {"Content-Type":"application/json","Authorization":str(authen)}
        endpoint_response = enroll_endpoint(enrollmentTestCase.mock_request(self,"POST",header=headers))
        self.assertEquals(endpoint_response.status_code, 400)

    def test_enroll_endpoint_no_username(self):
        # mock Bearer
        authen = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyYWRuYW1lIjoiZGVsMSJ9.STuyNkPLdj0uFV7SUtr_L9ggLJ0wcs39KKHu5LtB-Ro"
        headers = {"Content-Type":"application/json","Authorization":str(authen)}
        endpoint_response = enroll_endpoint(enrollmentTestCase.mock_request(self,"POST",header=headers))
        self.assertEquals(endpoint_response.status_code, 401)
    
    def test_enroll_endpoint_pass(self):
        authen = self.get_token()
        headers = {"Content-Type":"application/json","Authorization":str(authen)}
        data = json.dumps({"courseId":2})
        endpoint_response = enroll_endpoint(enrollmentTestCase.mock_request(self,"POST",header=headers,content=data))
        self.assertEquals(endpoint_response.status_code, 201)

    def test_get_course_method_not_GET(self):
        endpoint_response = get_courses(enrollmentTestCase.mock_request(self,"POST"),"testusername2")
        self.assertEquals(endpoint_response.status_code, 405)
    
    def test_get_course_method_username_not_exist(self):
        endpoint_response = get_courses(enrollmentTestCase.mock_request(self,"GET"),"testusernamenotexist")
        self.assertEquals(endpoint_response.status_code, 404)

    def test_get_course_method_username_exist(self):
        endpoint_response = get_courses(enrollmentTestCase.mock_request(self,"GET"),"testusername2")
        self.assertEquals(endpoint_response.status_code, 200)