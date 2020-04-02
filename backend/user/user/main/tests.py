from django.test import TestCase
from main.models import User
from django.http import HttpRequest
from main.views import get_user_detail, update_user_detail, delete_user, user_endpoint, login, register
from datetime import datetime
import requests, json
from rest_framework.parsers import JSONParser
from io import BytesIO

class testCase(TestCase):
    # ---- start init ----
    def setUp(self):
        self.user = User.objects.create(
            username="username001",
            password_hash="e1b4709a5674e4c77d741d8b28442861c36985f194e1a46b621082dec57d588fff58bd02ecf4d2fb0b406181d0b7f53eb44c1a9f46bc000778026e4fceec637c",
            firstName="username001-1",
            lastName="lastname",
            birthDate=datetime(2000, 12, 24),
            registerDate=datetime.now(),
            job="Author"
            )
    
    def mock_request(self, method, content = json.dumps({}), header = {"Content-Type":"application/json"}):
        request1 = HttpRequest()
        request1.method = method
        body_content = content
        request1._stream = BytesIO(body_content.encode())
        request1.content_type = "application/json"
        request1.headers = header

        return request1
    
    
    # ---- end init ----
    
    # ---- start test ----
    def test_model(self):
        user = User.objects.get(username="username001")
        self.assertEquals(user.firstName,"username001-1")
    
    def test_user_endpoint(self):
        # test GET request 
        # get authen
        user = User.objects.get(username="username001")
        contents = json.dumps({"username":"username001","password":"password"})
        response = login(testCase.mock_request(self,"POST",content=contents))
        authen = response['Authorization']
        headers = {"Content-Type":"application/json","Authorization":str(authen)}
        endpoint_response = user_endpoint(testCase.mock_request(self,"GET",header=headers),"username001")
        self.assertEquals(endpoint_response.status_code, 200)
        self.assertIn(user.username, endpoint_response.content.decode("utf-8"))
        
        # get with user not exist
        endpoint_response = user_endpoint(testCase.mock_request(self,"GET",header=headers),"username002")
        self.assertEquals(endpoint_response.status_code, 404)
        
        # get with wrong or no token
        endpoint_response = user_endpoint(testCase.mock_request(self,"GET"),"username001")
        self.assertEquals(endpoint_response.status_code, 401)



    def test_login(self):
        # test method not POST
        contents = json.dumps({"username":"username001","password":"password"})
        response = login(testCase.mock_request(self,"GET",content=contents))
        self.assertEquals(response.status_code, 405)
        
        # test 200 OK
        response = login(testCase.mock_request(self,"POST",content=contents))
        self.assertEquals(response.status_code, 200)
        
        # test 401
        contents = json.dumps({"username":"username002","password":"password"})
        response = login(testCase.mock_request(self,"POST",content=contents))
        self.assertEquals(response.status_code, 401)



        #cloud_sql_proxy -instances=femtogudaki:asia-northeast1:user-db=tcp:3306 -credential_file=femtogudakiKey.json &