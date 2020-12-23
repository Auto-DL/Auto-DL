from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
import bcrypt

from .models import User


@api_view(['POST'])
def login(request):

    username = request.data.get('username')
    password = request.data.get('password')
    user = User(username, password)
    user = user.find()

    if user is None or not bcrypt.checkpw( password.encode('utf-8'),
                                           user.get('password')
                                          ):
        status = 401
        message = "Invalid credentials"
        token = None
    else:
        status = 200
        message = "Login Successful"
        token = user.get('token', 'asdfghjklkjhgfdsa')
    # TODO: Implement token based authentication

    return JsonResponse({
                            'message': message, 
                            'status': status,
                            'user': username,
                            'token': token
                        })


@api_view(['POST'])
def register(request):
    try:
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')


        user = User(username, password, **{'email': email, "first_name": first_name, "last_name": last_name})
        user_id = user.create()

        message = "Registered Successfully"
        status = 200

    except Exception as e:
        message = str(e)
        status = 401

    return JsonResponse({
                            'message': message, 
                            'status': status,
                            'username': username
                        })
