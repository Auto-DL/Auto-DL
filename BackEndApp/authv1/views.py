from django.core.mail.message import EmailMessage
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
import bcrypt

from BackEndApp.settings import EMAIL_HOST_USER
from .models import User, Session
from .store import Store


@api_view(["POST"])
def login(request):
    try:
        username = request.data.get("username")
        password = request.data.get("password")
        user = User(username, password)
        user = user.find()

        if user is None or not bcrypt.checkpw(
            password.encode("utf-8"), user.get("password")
        ):
            status = 401
            message = "Invalid credentials"
            token = None

        if user.get("is_verified") == True:
            session = Session(user)
            token = session.create()
            status = 200
            message = "Login Successful"
        if token is None:
            status = 500
            raise Exception("Some error occured")
    except Exception as e:
        status = 500
        message = "Some Error Occured please try again!"
        return JsonResponse({"message": message, "user": username}, status=status)
    return JsonResponse(
        {"message": message, "user": username, "token": token}, status=status
    )


@api_view(["POST"])
def register(request):
    try:
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")
        first_name = request.data.get("first_name")
        last_name = request.data.get("last_name")

        user = User(
            username,
            password,
            **{"email": email, "first_name": first_name, "last_name": last_name},
        )
        user_id = user.create()
        this_user = user.find()

        store_obj = Store(this_user)
        cache_path = store_obj.create()

        session = Session(this_user)
        token = session.create()

        # Email Verification
        user.update("auth_token", token)

        email_subject = "Verify Your Account"

        domain = get_current_site(request).domain
        link = reverse("verify", kwargs={"username": username, "token": token})
        activation_link = " http://" + domain + link

        email_body = f"Click this link to verify your account" + activation_link

        email = EmailMessage(
            email_subject,
            email_body,
            EMAIL_HOST_USER,
            [this_user.get("email")],
        )
        email.send(fail_silently=False)

        status, message = 200, "Verification email sent succesfuly"
    except Exception as e:
        message = "Some error occurred!! Please try again."
        status = 401
        token = None

    return JsonResponse(
        {"message": message, "username": username, "token": token}, status=status
    )


@api_view(["POST"])
def logout(request):
    try:

        username = request.data.get("username")
        user = User(username=username, password=None)
        user = user.find()
        session_obj = Session(user)
        token = request.META.get("HTTP_TOKEN")
        flag = session_obj.delete(token)

        if not flag:
            raise Exception("Some error occured while logging out")

        message = "Logged out successfully"
        status = 200

    except Exception as e:
        message = "Some error occurred!! Please try again."
        status = 500

    return JsonResponse({"message": message}, status=status)


@api_view(["GET"])
def verify(request, username, token):
    try:
        username = username
        auth_token_recieved = token
        user = User(username=username, password=None)
        this_user = user.find()
        auth_token = this_user.get("auth_token")
        if auth_token == auth_token_recieved:
            user.update("is_verified", True)
            message = "Account Verified successfully"
            status = 200
        else:
            message = "Account verification failed"
            status = 401
    except Exception as e:
        message = "Email verification failed! Please try again later."
        status = 500
        return JsonResponse({"message": message}, status=status)
    return JsonResponse({"message": message}, status=status)
