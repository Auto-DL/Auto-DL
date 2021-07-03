from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
import bcrypt
from BackEndApp.settings import EMAIL_HOST_USER
from django.core.mail import send_mail
from .models import User, Session
from .store import Store


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
    else:
        session = Session(user)
        token = session.create()
        status = 200
        message = "Login Successful"

        if token is None:
            status = 500
            message = "Some error occured"
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
def ForgotPassword(request):
    try:
        username = request.data.get("username")
        user = User(username=username, password=None)
        user = user.find()

        if user is None:
            status = 401
            message = "User does not exist"

        email = user["email"]
        subject = "Auto-DL Request for Reset password"
        msg = (
            "You ("
            + username
            + ") requested a password reset. Click here to reset your password http://127.0.0.1:8000/auth/password-reset/"
        )
        send_mail(subject, msg, EMAIL_HOST_USER, [email])

        message = "Email Sent!!"
        status = 200

    except Exception as e:
        message = "Some error occurred!! Please try again."
        status = 500

    return JsonResponse({"message": message}, status=status)


@api_view(["POST"])
def PasswordReset(request):
    try:
        username = request.data.get("username")
        user = User(username=username, password=None)
        this_user = user.find()

        if this_user is None:
            status = 401
            message = "User does not exist"

        new_password = request.data.get("password")
        hashed_password = bcrypt.hashpw(new_password.encode("utf-8"), bcrypt.gensalt())
        old_password = this_user["password"]

        if str(old_password) == str(hashed_password):
            message = "Your new password is invalid, try a new one!!! "
            status = 401
        else:
            status, error = user.update("password", hashed_password)
            this_user = user.find()

            message = "Password Reset successful!!"
            status = 200

    except Exception as e:
        message = "Some error occurred!! Please try again."
        status = 500

    return JsonResponse({"message": message}, status=status)
