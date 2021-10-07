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

@api_view(["POST"])
def start_payment(request): 
    payableAmount = request.data["amount"]
    client = razorpay.Client(auth=(RAZORPAY_API_KEY, RAZORPAY_API_SECRET))

    payment = client.order.create(
        {
            "amount": int(payableAmount) * 100, 
            "currency": "INR", 
            "payment_capture": "1"
        })
    return Response(payment)

@api_view(["POST"])
def verify_payment(request):
    
    res = json.loads(request.data["response"])
    print("Response: ",res)
    
    ord_id = ""
    raz_pay_id = ""
    raz_signature = ""
    
    try:
        print("Going Ahead")
        for key in res.keys():
            if key == 'razorpay_order_id':
                ord_id = res[key]
            elif key == 'razorpay_payment_id':
                raz_pay_id = res[key]
            elif key == 'razorpay_signature':
                raz_signature = res[key]        
        userName = "Priyansh"
    except:
        print("Stopped Error")
        order_id = None
        userName = None
    return redirect(f'http://localhost:3000/project/paymentSuccess?name={userName}&orderId={order_id}')