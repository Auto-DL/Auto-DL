from django.urls import path

from . import views

urlpatterns = [
    path("pay/", views.start_payment),
    path("verify/", views.verify_payment),
]
