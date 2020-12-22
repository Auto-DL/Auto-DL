from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json

from .models import User


@api_view(['POST'])
def login(request):

    username = request.data.get('username')
    password = request.data.get('password')

    user = User(username, password)
    user = user.find()
    token = user.get('token', 'asdfghjklkjhgfdsa')
    return JsonResponse({
                            'message': "Login Successful", 
                            'status': 200,
                            'user': username,
                            'token': token
                        })


@api_view(['POST'])
def register(request):

    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')

    user = User(username, password, **{'email': email, "first_name": first_name, "last_name": last_name})
    user_id = user.create()
    
    return JsonResponse({
                            'message': "Registered Successful", 
                            'status': 200,
                            'username': username
                        })
