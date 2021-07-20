from django.core.mail import message
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
from .emails import EmailTemplates
from .auth import OTP


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
            **{"email": email, "first_name": first_name, "last_name": last_name}
        )
        user_id = user.create()
        user = user.find()

        store_obj = Store(user)
        cache_path = store_obj.create()

        session = Session(user)
        token = session.create()

        message = "Registered Successfully"
        status = 200

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


@api_view(["POST"])
def send_otp(request):
    try:
        username = request.data.get("username")
        user = User(username=username, password=None)
        this_user = user.find()

        otp_obj = OTP(this_user)
        otp = otp_obj.create()

        email = EmailTemplates(this_user)
        subject, msg = email.verify_email(username, otp)
        send_email = EmailMessage(
            subject,
            msg,
            EMAIL_HOST_USER,
            [this_user.get("email")],
        )
        send_email.send(fail_silently=False)

        message = "OTP sent successfully"
        status = 200

    except Exception as e:
        message = "Internal server error"
        status = 500

    return JsonResponse({"message": message}, status=status)


@api_view(["GET"])
def verify_email(request):
    try:
        username = request.data.get("username")
        user = User(username=username, password=None)
        this_user = user.find()

        otp = request.data.get("otp")
        otp_obj = OTP(this_user)

        if otp_obj.verify(otp):
            user.update("is_verified", True)
            message = "Verified Successfully"
            status = 200
        else:
            message = "Invalid OTP!"
            status = 401

    except Exception as e:
        print(str(e))
        message = "Internal service error"
        status = 500

    return JsonResponse({"message": message}, status=status)
