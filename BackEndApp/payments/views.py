import os
import razorpay
import json

# from authv1.decorators import is_authenticated

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse
from django.shortcuts import redirect

RAZORPAY_API_KEY = os.getenv("RAZORPAY_API_KEY")
RAZORPAY_API_SECRET = os.getenv("RAZORPAY_API_SECRET")
FRONTEND_HOST = os.getenv("FRONTEND_HOST")
USER = "testUser"

RAZORPAY_CLIENT = razorpay.Client(auth=(RAZORPAY_API_KEY, RAZORPAY_API_SECRET))


@api_view(["POST"])
# @is_authenticated
def start_payment(request):
    payableAmount = request.data.get("amount")
    payment = RAZORPAY_CLIENT.order.create(
        {
            "amount": int(payableAmount) * 100,
            "currency": "INR",
            "payment_capture": "1",
            "notes": {
                "username": USER,
            },
        }
    )
    return Response(payment)


@api_view(["POST"])
# @is_authenticated
def verify_payment(request):
    res = json.loads(request.data.get("response"))

    ord_id = ""
    raz_pay_id = ""
    raz_signature = ""

    for key in res.keys():
        if key == "razorpay_order_id":
            ord_id = res[key]
        elif key == "razorpay_payment_id":
            raz_pay_id = res[key]
        elif key == "razorpay_signature":
            raz_signature = res[key]

    orderDetails = RAZORPAY_CLIENT.order.fetch(ord_id)

    data = {
        "razorpay_order_id": ord_id,
        "razorpay_payment_id": raz_pay_id,
        "razorpay_signature": raz_signature,
    }

    check = RAZORPAY_CLIENT.utility.verify_payment_signature(data)

    if check is not None:
        return Response({"error": "Something went wrong"})

    res_data = {"message": "payment successfully received!"}
    return Response(res_data)
