from django.shortcuts import render
import razorpay
# Create your views here.
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import os

RAZORPAY_API_KEY = os.getenv('RAZORPAY_API_KEY')
RAZORPAY_API_SECRET = os.getenv('RAZORPAY_API_SECRET')

@api_view(["POST"])
def start_payment(request): 
    amount = request.data.get("amount")
    client = razorpay.Client(auth=(RAZORPAY_API_KEY, RAZORPAY_API_SECRET))

    payment = client.order.create(
        {
            "amount": int(amount) * 100, 
            "currency": "INR", 
            "payment_capture": "1"
        })
    data = {
        "payment": payment,
    }
    return Response(data)