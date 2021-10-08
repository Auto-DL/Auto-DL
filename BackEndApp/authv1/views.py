import bcrypt
from BackEndApp.settings import EMAIL_HOST_USER
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
import bcrypt

from django.core.mail import send_mail
from .auth import OTP
from .emails import EmailTemplates
from .models import Session, User
from .store import Store

import logging

logger = logging.get_logger(__name__)


@api_view(["POST"])
def login(request):

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
        logger.warn(f"[API][POST][login] {message}")

    else:
        session = Session(user)
        token = session.create()
        status = 200
        message = "Login Successful"
        logger.info(f"[API][POST][login] {message}")

        if token is None:
            status = 500
            message = "Some error occured"
            logger.error(f"[API][POST][login] {message}")

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
        user = user.find()

        store_obj = Store(user)
        cache_path = store_obj.create()

        session = Session(user)
        token = session.create()

        message = "Registered Successfully"
        status = 200
        logger.info(f"[API][POST][register] {message}")

    except Exception as e:
        message = "Some error occurred!! Please try again."
        status = 401
        token = None
        username = None
        logger.warn(f"[API][POST][register] {message}")

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
            error_message = "Some error occured while logging out"
            logger.error(f"[API][POST][generate] {error_message}")
            raise Exception(error_message)

        message = "Logged out successfully"
        status = 200
        logger.info(f"[API][POST][logout] {message}")

    except Exception as e:
        message = "Some error occurred!! Please try again."
        status = 500
        logger.error(f"[API][POST][logout] {message}")

    return JsonResponse({"message": message}, status=status)


@api_view(["POST"])
def forgot_password(request):
    try:
        username = request.data.get("username")
        user = User(username=username, password=None)
        this_user = user.find()

        if user is None:
            message = "Invalid Credentials."
            status = 401
            logger.warn(f"[API][POST][forgot_password] {message}")

        email_verified = this_user.get("is_verified")

        if email_verified == True:

            otp = OTP(this_user)
            generated_otp = otp.create()

            user_email = this_user.get("email")
            email = EmailTemplates(this_user)
            subject, msg = email.forgot_password(username, generated_otp)
            send_mail(subject, msg, EMAIL_HOST_USER, [user_email])

            message = "Email sent successfully."
            status = 200
            logger.info(f"[API][POST][forgot_password] {message}")

        else:
            message = "Sorry we can't help you right now, please email info.autodl@gmail.com if you think it's a mistake."
            status = 500
            logger.error(f"[API][POST][forgot_password] {message}")

    except Exception as e:
        message = "Some error occurred! Please try again."
        status = 500
        logger.error(f"[API][POST][forgot_password] {message}")

    return JsonResponse({"message": message}, status=status)


@api_view(["POST"])
def verify_email(request):
    try:
        username = request.data.get("username")
        user = User(username=username, password=None)
        this_user = user.find()

        otp_obj = OTP(this_user)
        generated_otp = otp_obj.create()
        user_email = this_user.get("email")
        email = EmailTemplates(this_user)
        subject, msg = email.verify_email(username, generated_otp)
        send_mail(subject, msg, EMAIL_HOST_USER, [user_email])

        message = "Email sent successfully"
        status = 200
        logger.info(f"[API][POST][verify_email] {message}")

    except Exception as e:
        message = "Some error occured! Please try again."
        status = 500
        logger.error(f"[API][POST][verify_email] {message}")

    return JsonResponse({"message": message}, status=status)


@api_view(["POST"])
def verify_otp(request):
    try:
        username = request.data.get("username")
        received_otp = request.data.get("received_otp")
        user = User(username=username, password=None)
        this_user = user.find()

        otp = OTP(this_user)
        otp_verified = otp.verify(received_otp)

        if otp_verified == True:

            if request.data.get("is_email_validation"):
                user.update("is_verified", True)

            message = "OTP verification successfull."
            status = 200
            logger.info(f"[API][POST][verify_otp] {message}")

        else:
            message = "Incorrect OTP! Please try again."
            status = 401
            logger.warn(f"[API][POST][verify_otp] {message}")

    except Exception as e:
        message = "Some error occurred! Please try again."
        status = 500
        logger.error(f"[API][POST][verify_otp] {message}")

    return JsonResponse({"message": message}, status=status)


@api_view(["POST"])
def update_password(request):
    try:
        username = request.data.get("username")
        user = User(username=username, password=None)
        this_user = user.find()

        if this_user is None:
            message = "Invalid Credentials."
            status = 401
            logger.warn(f"[API][POST][update_password] {message}")

        new_password = request.data.get("password")
        hashed_password = bcrypt.hashpw(new_password.encode("utf-8"), bcrypt.gensalt())
        old_password = this_user.get("password", "")

        if str(old_password) == str(hashed_password):
            message = "Please enter a new password!"
            status = 401
            logger.warn(f"[API][POST][update_password] {message}")

        else:
            status, error = user.update("password", hashed_password)
            message = "Password Reset successfull."
            status = 200
            logger.info(f"[API][POST][update_password] {message}")

    except Exception as e:
        message = "Some error occurred! Please try again."
        status = 500
        logger.error(f"[API][POST][update_password] {message}")

    return JsonResponse({"message": message}, status=status)
