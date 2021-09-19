from os import name
from django.urls import path
from . import views

urlpatterns = [
    # deployment routes
    path("local", views.local_deploy, name="local-deploy"),
    path("cloud", views.cloud_deploy, name="cloud-deploy"),
    path("hybrid", views.hybrid_deploy, name="hybrid-deploy"),
]
