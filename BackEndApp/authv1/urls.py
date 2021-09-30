from django.urls import path
from . import views

urlpatterns = [
    path("login/", views.login, name="login"),
    path("register/", views.register, name="register"),
    path("logout/", views.logout, name="logout"),
    path("otp/verify/", views.verify_otp, name="verify-otp"),
    path("password/forgot/", views.forgot_password, name="forgot-password"),
    path("password/update/", views.update_password, name="update-password"),
    path("email/verify/", views.verify_email, name="verify-email"),
]
