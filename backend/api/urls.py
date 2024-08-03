from django.urls import path
from .views import health_view, auth_view

urlpatterns = [
    path("health/", health_view, name="health"),
    path("auth/login", auth_view, name="login")
]