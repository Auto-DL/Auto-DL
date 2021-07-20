from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path("login/", views.login, name="login"),
    path("register/", views.register, name="register"),
    path("logout/", views.logout, name="logout"),
    path("forgot_password/", views.forgot_password, name="forgot_password"),
    path("fetch_otp/", views.fetch_otp, name="fetch_otp"),
    path("password/update", views.update_password, name="update_password"),
]
