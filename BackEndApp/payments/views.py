from django.shortcuts import render, redirect
import razorpay 
import json
# Create your views here.
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import os

RAZORPAY_API_KEY = os.getenv('RAZORPAY_API_KEY')
RAZORPAY_API_SECRET = os.getenv('RAZORPAY_API_SECRET')
FRONTEND_HOST = os.getenv('FRONTEND_HOST')
USERNAME = os.getenv('USERNAME')

client = razorpay.Client(auth=(RAZORPAY_API_KEY, RAZORPAY_API_SECRET))

@api_view(["POST"])
def start_payment(request): 
    payableAmount = request.data.get("amount")
    payment = client.order.create(
        {
            "amount": int(payableAmount) * 100, 
            "currency": "INR", 
            "payment_capture": "1",
            "notes": {
                "username": USERNAME,
            }
        })
    return Response(payment)

@api_view(["POST"])
def verify_payment(request):
    print(request.data)
    payment_id = request.POST.get("razorpay_payment_id")
    razorpay_order_id = request.POST.get("razorpay_order_id")
    signature = request.POST.get("razorpay_signature")
    details = {
            'razorpay_order_id': razorpay_order_id,
            'razorpay_payment_id': payment_id,
            'razorpay_signature': signature
        }
    print("Details: ", details)
    result = client.utility.verify_payment_signature(details)   
    print(result)
    if result is None:
        orderDetails = client.order.fetch(razorpay_order_id)
        print("order :", orderDetails)
        userName = orderDetails["notes"]["username"]
        amount = orderDetails["amount"]/100
    else: 
        userName = "Not Found"
        amount = 0
    # return HttpResponse("<h1>Thanks {userName}</h1>")
    return redirect(f'http://localhost:3000/project/paymentSuccess?name={userName}&amount={amount}')