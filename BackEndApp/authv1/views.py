import bcrypt
from BackEndApp.settings import EMAIL_HOST_USER
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.core.mail import send_mail

from .auth import OTP
from .emails import EmailTemplates
from .models import Session, User
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

    except Exception as e:
        message = "Some error occured! Please try again."
        status = 500

    return JsonResponse({"message": message}, status=status)
