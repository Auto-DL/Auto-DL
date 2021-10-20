# unit test to test the urls

from django.urls import reverse, resolve
from django.test import SimpleTestCase
from authv1.views import login, logout, register, update_profile

# Test to check the urls. Good practice to test all urls
class TestUrls(SimpleTestCase):
    def test_login_url(self):
        url = reverse("login")
        self.assertEquals(resolve(url).func, login)

    def test_logout_url(self):
        url = reverse("logout")
        self.assertEquals(resolve(url).func, logout)

    def test_register_url(self):
        url = reverse("register")
        self.assertEquals(resolve(url).func, register)

    def test_update_profile_url(self):
        url = reverse("update-profile")
        self.assertEquals(resolve(url).func, update_profile)
