from django.urls import path
from .views import health_check, login, get_shared_camera, get_shared_cameras, get_camera_recordings

urlpatterns = [
    path("health/", health_check, name="health"),
    path("auth/login", login, name="login"),
    path("shared-camera", get_shared_camera, name="shared-camera"),
    path("shared-cameras", get_shared_cameras, name="shared-cameras"),
    path("camera/<int:camera_id>/recordings", get_camera_recordings, name="camera-recordings"),
]