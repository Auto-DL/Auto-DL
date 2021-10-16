from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("v1/", include("v1.urls")),
    path("auth/", include("authv1.urls")),
    path("deployments/", include("deployments.urls")),
]
