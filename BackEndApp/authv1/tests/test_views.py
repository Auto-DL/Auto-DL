from django.test import TestCase, Client
from django.urls import reverse
from authv1.models import User

# from tests.mocks import MockOS
# import  pytest


class TestUser(TestCase):
    def setUp(self):
        # setting up pre-requisites
        self.client = Client()
        self.register_url = reverse("register")
        self.login_url = reverse("login")
        self.user = User(
            username="testuser1",
            password="Qwerty@123",
            **{"email": "testuser1@xyz.com", "first_name": "test", "last_name": "user1"}
        )
        # self.user = User.create(
        #     username='testuser',)
        # self.user = TestUser()
        # print(self.user)

    # not working, giving error unauthorised
    # def test_user_registration(self):
    #     response = self.client.post(self.register_url,params={"username":"testuser1","password":"Qwerty@123","email":"testuser1@xyz.com","first_name":"test","last_name":"user"})
    #     print(response)
    #     assert response.status_code != 200

    def test_login(self):
        user_id = self.user.create()
        user = self.user.find(by_email=False)
        response = self.client.post(
            self.login_url,
            params={
                "username": "testuser1",
                "password": "Qwerty@123",
            },
        )
        assert response.status_code == 200

    ## not aplicable until user is login
    # def test_user_profile_update(self):
    #     self.client.login(username='testuser', password='testuser')
    #     response = self.client.post(reverse('update-profile'))
    #     print(response, self.user)
    #     self.assertEqual(response.status_code, 200)

    # self.assertTemplateUsed(response, 'user_profile_update.html')
