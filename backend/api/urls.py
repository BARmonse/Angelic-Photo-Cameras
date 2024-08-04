from django.urls import path
from .views import health_check, login, get_shared_cameras, get_shared_camera_records

urlpatterns = [
    path("health/", health_check, name="health"),
    path("auth/login", login, name="login"),
    path("shared-cameras", get_shared_cameras, name="shared-cameras"),
    path("shared-cameras/recording/<int:camera_id>/", get_shared_camera_records, name="shared-camera-recordings")
]