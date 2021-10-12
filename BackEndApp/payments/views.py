from django.shortcuts import render, redirect
import razorpay
import json
# Create your views here.
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import os
# from payments.utils import get_db_handle
# MONGODB_URI = os.getenv('MONGODB_URI')
# db_handle, mongo_client = get_db_handle('AutoDl', MONGODB_URI, "", "")

RAZORPAY_API_KEY = os.getenv('RAZORPAY_API_KEY')
RAZORPAY_API_SECRET = os.getenv('RAZORPAY_API_SECRET')
FRONTEND_HOST = os.getenv('FRONTEND_HOST')

client = razorpay.Client(auth=(RAZORPAY_API_KEY, RAZORPAY_API_SECRET))

@api_view(["POST"])
def start_payment(request): 
    payableAmount = request.data["amount"]

    payment = client.order.create(
        {
            "amount": int(payableAmount) * 100, 
            "currency": "INR", 
            "payment_capture": "1"
        })
    return Response(payment)

@api_view(["POST"])
def verify_payment(request):

    if request.method == "POST": 
        payment_id = request.POST.get("razorpay_payment_id")
        razorpay_order_id = request.POST.get("razorpay_order_id")
        signature = request.POST.get("razorpay_signature")

        details = {
                'razorpay_order_id': razorpay_order_id,
                'razorpay_payment_id': payment_id,
                'razorpay_signature': signature
            }

        result = client.utility.verify_payment_signature(details)   
        if result is None:
            orderDetails = client.order.fetch(razorpay_order_id)
            userName = "Priyansh"
            amount = orderDetails["amount"]/100
        else: 
            userName = "Not Found"
            amount = 0

        return redirect(f'http://localhost:3000/project/paymentSuccess?name={userName}&amount={amount}')
