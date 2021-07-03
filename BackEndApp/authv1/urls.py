from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path("login/", views.login, name="login"),
    path("register/", views.register, name="register"),
    path("logout/", views.logout, name="logout"),
    path("forgot-password/", views.ForgotPassword, name="forgot-password"),
    path("password-reset/", views.PasswordReset, name="password-reset"),
]
