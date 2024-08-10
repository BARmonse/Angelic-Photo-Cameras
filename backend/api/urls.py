from django.urls import path
from .views import login, get_shared_camera, get_shared_cameras, get_shared_camera_records, get_shared_camera_recording_stream

urlpatterns = [
    path("auth/login", login, name="login"),
    path("shared-camera", get_shared_camera, name="shared-camera"),
    path("shared-cameras", get_shared_cameras, name="shared-cameras"),
    path("shared-cameras/<int:camera_id>/records", get_shared_camera_records, name="shared-camera-records"),
    path("shared-cameras/recording/<int:camera_id>/stream", get_shared_camera_recording_stream, name="sahred-camera-recording-stream"),
]