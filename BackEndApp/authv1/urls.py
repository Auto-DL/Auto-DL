from django.urls import path
from . import views

urlpatterns = [
    path("login/", views.login, name="login"),
    path("register/", views.register, name="register"),
    path("user/delete/", views.delete_user, name="delete-user"),
    path("logout/", views.logout, name="logout"),
    path("otp/verify/", views.verify_otp, name="verify-otp"),
    path("password/forgot/", views.forgot_password, name="forgot-password"),
    path("password/update/", views.update_password, name="update-password"),
    path("email/verify/", views.verify_email, name="verify-email"),
    path("oauth/verify/", views.verify_oauth, name="verify-oauth"),
    path("oauth/register/", views.register_oauth, name="register-oauth"),
]
