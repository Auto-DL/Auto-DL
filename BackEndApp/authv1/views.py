import email
import bcrypt
from django.conf import settings
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
        username = None
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
def forgot_password(request):
    try:
        username = request.data.get("username")
        user = User(username=username, password=None)
        this_user = user.find()

        if user is None:
            message = "Invalid Credentials."
            status = 401

        email_verified = this_user.get("is_verified")

        if email_verified == True:

            otp = OTP(this_user)
            generated_otp = otp.create()

            user_email = this_user.get("email")
            email = EmailTemplates(this_user)
            subject, msg = email.forgot_password(username, generated_otp)
            send_mail(subject, msg, settings.EMAIL_HOST_USER, [user_email])

            message = "Email sent successfully."
            status = 200

        else:
            message = "Sorry we can't help you right now, please email info.autodl@gmail.com if you think it's a mistake."
            status = 500

    except Exception as e:
        message = "Some error occurred! Please try again."
        status = 500

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
        send_mail(subject, msg, settings.EMAIL_HOST_USER, [user_email])

        message = "Email sent successfully"
        status = 200

    except Exception as e:
        message = "Some error occured! Please try again."
        status = 500

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

        else:
            message = "Incorrect OTP! Please try again."
            status = 401

    except Exception as e:
        message = "Some error occurred! Please try again."
        status = 500

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

        new_password = request.data.get("password")
        hashed_password = bcrypt.hashpw(new_password.encode("utf-8"), bcrypt.gensalt())
        old_password = this_user.get("password", "")

        if str(old_password) == str(hashed_password):
            message = "Please enter a new password!"
            status = 401

        else:
            status, error = user.update("password", hashed_password)
            message = "Password Reset successfull."
            status = 200

    except Exception as e:
        message = "Some error occurred! Please try again."
        status = 500

    return JsonResponse({"message": message}, status=status)


@api_view(["POST"])
def update_profile(request):
    """.. http:post:: /auth/profile/update/

    Update existing user details.

    :form username: Username of existing user for which changes to happen.
    :form new_username: (optional) new username for the user.
    :form new_email: (optional) new email for the user.
    """
    current_user = request.data.get("username")
    new_username = request.data.get("new_username", None)
    new_email = request.data.get("new_email", None)
    user = User(username=current_user, password=None)
    this_user = user.find()

    if this_user is None:
        message = "No user found. Please register if visiting first time"
        status = 500

    elif this_user is not None:
        if new_username is None and new_email is None:
            status = 200
            message = "No change provided"
        else:
            exist_user_obj = User(username=new_username, email=new_email)
            exist_user = exist_user_obj.find()
            exist_user_by_email = exist_user_obj.find(by_email=True)

            if exist_user or exist_user_by_email:
                message = "user with this username or email already exists"
                status = 200
            else:
                if new_username:
                    err, _ = user.update("username", new_username)
                    if err:
                        status = 500
                        message = "Error updating user profile."

                if new_email:
                    err, _ = user.update("email", new_email)
                    if err:
                        status = 500
                        message = "Error updating user profile."
                status = 200
                message = "User profile info updated successfully"
    else:
        message = "Some error occurred! Please try again."
        status = 500

    return JsonResponse({"message": message}, status=status)
