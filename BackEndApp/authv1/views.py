from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
import bcrypt

from .models import User, Session
from .store import Store


@api_view(["POST"])
def login(request):

    username = request.data.get("username")
    password = request.data.get("password")
    user = User(username, password)
    user = user.find()

    session = Session(user)
    token = session.create()

    if user is None or not bcrypt.checkpw(
        password.encode("utf-8"), user.get("password")
    ):
        status = 401
        message = "Invalid credentials"
        token = None
    else:
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
        token = str(token, "utf-8")

        message = "Registered Successfully"
        status = 200

    except Exception as e:
        message = str(e)
        status = 401
        token = None
    return JsonResponse(
        {"message": message, "username": username, "token": token}, status=status
    )


@api_view(["POST"])
def logout(request):
    try:
        session_obj = Session({})
        token = request.META.get('HTTP_TOKEN')
        flag = session_obj.delete(token)

        if not flag:
            raise Exception("Some error occured while logging out")

        message = "Logged out successfully"
        status = 200

    except Exception as e:
        message = str(e)
        status = 500

    return JsonResponse(
        {"message": message}, status=status
    )
