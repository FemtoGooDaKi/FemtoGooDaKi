from django.test import TestCase
from main.models import User
from django.http import HttpRequest
from main.views import update_user_detail, delete_user, user_endpoint, login, register
from datetime import datetime
import json
from io import BytesIO

class testCase(TestCase):
    # ---- start init ----
    def setUp(self):
        self.user = User.objects.create(
            username="name001",
            password_hash="e1b4709a5674e4c77d741d8b28442861c36985f194e1a46b621082dec57d588fff58bd02ecf4d2fb0b406181d0b7f53eb44c1a9f46bc000778026e4fceec637c",
            firstName="name001-1",
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
        user = User.objects.get(username="name001")
        self.assertEquals(user.firstName,"name001-1")
    
    def test_update_user_detail_user_not_exist(self):
        data = {"firstName":"name001-1","lastName":"lastname","birthDate":"2000-02-20","job":"Author"}
        response = update_user_detail("username002", data)
        self.assertEquals(response.status_code, 404)

    def test_delete_user_not_exist(self):
        response = delete_user("username002")
        self.assertEquals(response.status_code, 404)

    def test_user_endpoint_GET_pass(self):
        # test GET request 
        # get authen
        user = User.objects.get(username="name001")
        data = json.dumps({"username":"name001","password":"password"})
        response = login(testCase.mock_request(self,"POST",content=data))
        authen = response['Authorization']
        headers = {"Content-Type":"application/json","Authorization":str(authen)}
        endpoint_response = user_endpoint(testCase.mock_request(self,"GET",header=headers),"name001")
        self.assertEquals(endpoint_response.status_code, 200)
        self.assertIn(user.username, endpoint_response.content.decode("utf-8"))

    def test_user_endpoint_GET_user_not_exist(self):    
        # get with user not exist
        data = json.dumps({"username":"name001","password":"password"})
        response = login(testCase.mock_request(self,"POST",content=data))
        authen = response['Authorization']
        headers = {"Content-Type":"application/json","Authorization":str(authen)}
        endpoint_response = user_endpoint(testCase.mock_request(self,"GET",header=headers),"username002")
        self.assertEquals(endpoint_response.status_code, 404)
    
    def test_user_endpoint_GET_authorization_fail(self): 
        # get with wrong or no token
        endpoint_response = user_endpoint(testCase.mock_request(self,"GET"),"name001")
        self.assertEquals(endpoint_response.status_code, 401)

    def test_user_endpoint_PUT_username_fail(self):
        # test 401
        data = json.dumps({"username":"name001","password":"password"})
        response = login(testCase.mock_request(self,"POST",content=data))
        authen = response['Authorization']
        data = json.dumps({"firstName":"name001-2","lastName":"lastname","birthDate":str(datetime(2000, 12, 30)),"job":"Author"})
        headers = {"Content-Type":"application/json","Authorization":str(authen)}
        endpoint_response = user_endpoint(testCase.mock_request(self,"PUT",content=data,header=headers),"username002")
        self.assertEquals(endpoint_response.status_code, 401)

    def test_user_endpoint_PUT_pass(self):
        # test 200
        data = json.dumps({"username":"name001","password":"password"})
        response = login(testCase.mock_request(self,"POST",content=data))
        authen = response['Authorization']
        data = json.dumps({"firstName":"name001-2","lastName":"lastname","birthDate":"2020-02-20","job":"Author"})
        headers = {"Content-Type":"application/json","Authorization":str(authen)}
        endpoint_response = user_endpoint(testCase.mock_request(self,"PUT",content=data,header=headers),"name001")
        self.assertEquals(endpoint_response.status_code, 200)

    def test_user_endpoint_DELETE_username_fail(self):
        data = json.dumps({"username":"name001","password":"password"})
        response = login(testCase.mock_request(self,"POST",content=data))
        authen = response['Authorization']
        headers = {"Content-Type":"application/json","Authorization":str(authen)}
        endpoint_response = user_endpoint(testCase.mock_request(self,"DELETE",header=headers),"username002")
        self.assertEquals(endpoint_response.status_code, 401)

    def test_user_endpoint_DELETE_username_pass(self):
        data = json.dumps({"username":"name001","password":"password"})
        response = login(testCase.mock_request(self,"POST",content=data))
        authen = response['Authorization']
        headers = {"Content-Type":"application/json","Authorization":str(authen)}
        endpoint_response = user_endpoint(testCase.mock_request(self,"DELETE",header=headers),"name001")
        self.assertEquals(endpoint_response.status_code, 204)

    def test_user_endpoint_method_wrong(self):
        data = json.dumps({"username":"name001","password":"password"})
        response = login(testCase.mock_request(self,"POST",content=data))
        authen = response['Authorization']
        headers = {"Content-Type":"application/json","Authorization":str(authen)}
        endpoint_response = user_endpoint(testCase.mock_request(self,"VIEW",header=headers),"name001")
        self.assertEquals(endpoint_response.status_code, 405)

    def test_login_method_not_POST(self):
        # test method not POST
        data = json.dumps({"username":"name001","password":"password"})
        response = login(testCase.mock_request(self,"GET",content=data))
        self.assertEquals(response.status_code, 405)

    def test_login_pass(self):    
        # test 200 OK
        data = json.dumps({"username":"name001","password":"password"})
        response = login(testCase.mock_request(self,"POST",content=data))
        self.assertEquals(response.status_code, 200)

    def test_login_user_not_exist(self):    
        # test 401
        data = json.dumps({"username":"username002","password":"password"})
        response = login(testCase.mock_request(self,"POST",content=data))
        self.assertEquals(response.status_code, 401)

    def test_register_method_not_POST(self):
        data = json.dumps({
            "username":"babe",
            "password":"password",
            "firstName":"Natthapong",
            "lastName":"Jiemjintanarom",
            "birthDate":"1998-04-02",
            "job":"student"
        })
        response = register(testCase.mock_request(self,"GET",content=data))
        self.assertEquals(response.status_code, 405)
    
    def test_register_data_invalid(self):
        data = json.dumps({
            "username":"babe",
            "password":"password",
            "firstName":"Natthapong",
            "lastName":"Jiemjintanarom",
            "job":"student"
        })
        response = register(testCase.mock_request(self,"POST",content=data))
        self.assertEquals(response.status_code, 400)

    def test_register_data_valid(self):
        data = json.dumps({
            "username":"babe",
            "password":"password",
            "firstName":"Natthapong",
            "lastName":"Jiemjintanarom",
            "birthDate":"1998-04-02",
            "job":"student"
        })
        response = register(testCase.mock_request(self,"POST",content=data))
        self.assertEquals(response.status_code, 201)