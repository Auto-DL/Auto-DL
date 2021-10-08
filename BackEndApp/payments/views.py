from django.shortcuts import render, redirect
import razorpay
import json
# Create your views here.
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import os
from payments.utils import get_db_handle
MONGODB_URI = os.getenv('MONGODB_URI')
db_handle, mongo_client = get_db_handle('AutoDl', MONGODB_URI, "", "")

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
    
    # res = json.loads(request.data["response"])
    print("Response: ",request.data)
    
    ord_id = ""
    raz_pay_id = ""
    raz_signature = ""
    
    # for key in res.keys():
    #     if key == 'razorpay_order_id':
    #         ord_id = res[key]
    #     elif key == 'razorpay_payment_id':
    #         raz_pay_id = res[key]
    #     elif key == 'razorpay_signature':
    #         raz_signature = res[key]        
    try:
        print("Going Ahead")
        orderId = request.data.get("razorpay_order_id")
        paymentId = request.data.get("razorpay_payment_id")
        userName = "Priyansh"
        status = 200
    except:
        print("Stopped Error")
        orderId = None
        userName = None
        status = 401
    data = {
        orderId, userName
    }
    return redirect(f'http://localhost:3000/project/paymentSuccess?name={userName}&orderId={orderId}')