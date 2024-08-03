from django.urls import path
from .views import health_check, login, get_shared_cameras

urlpatterns = [
    path("health/", health_check, name="health"),
    path("auth/login", login, name="login"),
    path("shared-cameras", get_shared_cameras, name="shared-cameras"),
]