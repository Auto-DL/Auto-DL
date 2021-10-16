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

client = razorpay.Client(auth=(RAZORPAY_API_KEY, RAZORPAY_API_SECRET))


@api_view(["POST"])
# @is_authenticated
def start_payment(request):
    payableAmount = request.data.get("amount")
    payment = client.order.create(
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
    # payment_id = request.POST.get("razorpay_payment_id")
    # razorpay_order_id = request.POST.get("razorpay_order_id")
    # signature = request.POST.get("razorpay_signature")
    # details = {
    #     "razorpay_order_id": razorpay_order_id,
    #     "razorpay_payment_id": payment_id,
    #     "razorpay_signature": signature,
    # }
    # result = client.utility.verify_payment_signature(details)
    # if result is None:
    #     orderDetails = client.order.fetch(razorpay_order_id)
    #     userName = orderDetails["notes"]["username"]
    #     amount = orderDetails["amount"] / 100
    # else:
    #     userName = "Not Found"
    #     amount = 0
    # return redirect(
    #     f"{FRONTEND_HOST}/project/paymentSuccess?name={userName}&amount={amount}"
    # )

    res = json.loads(request.data["response"])
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
    orderDetails = client.order.fetch(ord_id)
    print("Order Details: ", orderDetails)
    data = {
        "razorpay_order_id": ord_id,
        "razorpay_payment_id": raz_pay_id,
        "razorpay_signature": raz_signature,
    }
    check = client.utility.verify_payment_signature(data)
    if check is not None:
        print("Redirect to error url or error page")
        return Response({"error": "Something went wrong"})
    res_data = {"message": "payment successfully received!"}

    return Response(res_data)
