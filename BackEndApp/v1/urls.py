from django.contrib import admin
from django.urls import path, include
from . import views
from knox import views as knox_views
from .views import LoginAPI

urlpatterns = [
    path('generate/', views.generate, name='generate'),
    path('train/', views.train, name='train'),
    path('compile/', views.compile, name='compile'),
    path('api/login/', LoginAPI.as_view(), name='login'),
]
