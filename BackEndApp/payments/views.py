from django.shortcuts import render
import razorpay
# Create your views here.
from django.http import HttpResponse, JsonResponse
# from authv1.decorators import is_authenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(["POST"])
def start_payment(request): 
    amount = 50
    name = "priyansh"
    client = razorpay.Client(auth=("rzp_test_j9RsK0fDeYlYxn", "9DtW2UuzOVucuzvhJU4YDONJ"))

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
