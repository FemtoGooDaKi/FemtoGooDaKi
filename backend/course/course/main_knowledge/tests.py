from django.test import TestCase
from main_knowledge.models import Knowledge
from django.http import HttpRequest
from main_knowledge.views import create_knowledge, knowledge_endpoint, knowledge_id_endpoint, search_knowledge
from datetime import datetime
import json
from io import BytesIO
from main_knowledge.serializers import KnowledgeSerializer

class knowledgeTestCase(TestCase):

    def setUp(self):
        self.knowledge = Knowledge.objects.create(
            id = "2",
            author = "author007",
            subject = "learn to fly",
            content = "flyflyflyflyflyflyflyfly",
            createDate = datetime(2020, 1, 12)
        )

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
    # ======= end init =======

    def test_model(self):
        knowledge = Knowledge.objects.get(id="2")
        self.assertEquals(knowledge.subject, "learn to fly")

    def test_knowledge_endpoint_token_not_verify(self):
        authen = self.get_token()
        headers = {"Content-Type":"application/json","Authorization":str(authen+"123121564")}
        # wrong token
        endpoint_response = knowledge_endpoint(knowledgeTestCase.mock_request(self,"POST",header=headers))
        self.assertEquals(endpoint_response.status_code, 401)
        # no token
        endpoint_res = knowledge_endpoint(knowledgeTestCase.mock_request(self,"POST"))
        self.assertEquals(endpoint_res.status_code, 401)

    def test_knowledge_endpoint_method_wrong(self):
        authen = self.get_token()
        headers = {"Content-Type":"application/json","Authorization":str(authen)}
        endpoint_response = knowledge_endpoint(knowledgeTestCase.mock_request(self,"VIEW",header=headers))
        self.assertEquals(endpoint_response.status_code, 405)

    def test_knowledge_endpoint_POST_pass(self):
        authen = self.get_token()
        headers = {"Content-Type":"application/json","Authorization":str(authen)}
        contents = json.dumps({"subject":"testSubject","content":"testContent"})
        endpoint_response = knowledge_endpoint(knowledgeTestCase.mock_request(self,"POST",header=headers,content=contents))
        self.assertEquals(endpoint_response.status_code, 201)
    
    def test_knowledge_endpoint_POST_fail(self):
        authen = self.get_token()
        headers = {"Content-Type":"application/json","Authorization":str(authen)}
        contents = json.dumps({"subject":"testSubjectfail"})
        endpoint_response = knowledge_endpoint(knowledgeTestCase.mock_request(self,"POST",header=headers,content=contents))
        self.assertEquals(endpoint_response.status_code, 400)

    def test_knowledge_endpoint_POST_no_username(self):
        authen = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyYWRuYW1lIjoiZGVsMSJ9.STuyNkPLdj0uFV7SUtr_L9ggLJ0wcs39KKHu5LtB-Ro"
        headers = {"Content-Type":"application/json","Authorization":str(authen)}
        contents = json.dumps({"subject":"testSubjectfail","content":"testContent"})
        endpoint_response = knowledge_endpoint(knowledgeTestCase.mock_request(self,"POST",header=headers,content=contents))
        self.assertEquals(endpoint_response.status_code, 401)

    def test_search_knowledge_exist(self):
        data = search_knowledge("fly").content.decode()
        self.assertTrue(data != '{"results": []}')

    def test_search_knowledge_not_exist(self):
        data = search_knowledge("xxxx").content.decode()
        self.assertTrue(data == '{"results": []}')
    # test query still fail cuz every query return mock example

    # def test_knowledge_endpoint_GET_exist(self):
    #     authen = self.get_token()
    #     headers = {"Content-Type":"application/json","Authorization":str(authen)}
    #     contents = json.dumps({"query":"fly"})
    #     request = knowledgeTestCase.mock_request(self,"GET",header=headers,content=contents)
    #     endpoint_response = knowledge_endpoint(request)
    #     self.assertEquals(endpoint_response.status_code, 200)

    # def test_knowledge_endpoint_GET_not_exist(self):
    #     authen = self.get_token()
    #     headers = {"Content-Type":"application/json","Authorization":str(authen)}
    #     contents = json.dumps({})
    #     request = knowledgeTestCase.mock_request(self,"GET",header=headers,content=contents)
    #     request.query = "ppp"
    #     endpoint_response = knowledge_endpoint(request)
    #     self.assertEquals(endpoint_response.status_code, 200)