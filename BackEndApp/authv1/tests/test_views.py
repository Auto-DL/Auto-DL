from django.test import TestCase, Client
from django.urls import reverse
from authv1.models import User


class TestUser(TestCase):
    def setUp(self):
        # setting up pre-requisites
        self.client = Client()
        self.register_url = reverse("register")
        self.login_url = reverse("login")
        self.profile_update_url = reverse("update-profile")
        self.user = User(
            username="testuser1",
            password="Qwerty@123",
            **{"email": "testuser1@xyz.com", "first_name": "test", "last_name": "user1"}
        )

    # not working, giving error unauthorised
    # def test_user_registration(self):
    #     response = self.client.post(self.register_url,params={"username":"testuser1","password":"Qwerty@123","email":"testuser1@xyz.com","first_name":"test","last_name":"user"})
    #     print(response)
    #     assert response.status_code != 200

    def test_login(self):
        data = {
            "username": "testuser1",
            "password": "Qwerty@123",
        }
        user = self.user.find(by_email=False)
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, 200)

    ## not aplicable until user is login
    def test_user_profile_update(self):
        bad_data = {"username": ""}
        bad_response = self.client.post(self.profile_update_url, bad_data)
        existing_data = {"username": "testuser1", "new_email": ""}
        no_change_response = self.client.post(self.profile_update_url, existing_data)
        change_email_data = {
            "username": "testuser1",
            "new_email": "email_update@xyz.com",
        }
        email_update_response = self.client.post(
            self.profile_update_url, change_email_data
        )

        self.assertEqual(
            bad_response.json()["message"],
            "No user found. Please register if visiting first time",
        )
        self.assertEqual(no_change_response.json()["message"], "Invalid data")
        self.assertEqual(
            email_update_response.json()["message"], "User detail updated successfully"
        )
