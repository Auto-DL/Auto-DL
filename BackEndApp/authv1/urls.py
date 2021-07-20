from os import name
from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path("login/", views.login, name="login"),
    path("register/", views.register, name="register"),
    path("logout/", views.logout, name="logout"),
    path("send_otp/", views.send_otp, name="send_otp"),
    path("verify_email/", views.verify_email, name="verify_email"),
]
