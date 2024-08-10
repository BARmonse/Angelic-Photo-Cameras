from datetime import datetime, timezone, timedelta
from django.http import JsonResponse
from .decorators import token_required
import requests

from .clients.angelcam_client import Angelcam_client

def login(request):
    access_token = request.GET.get('accessToken')
    
    client = Angelcam_client(access_token)
        
    try:
        response = client.get('me/')
        return JsonResponse(response, safe=False)
    except requests.RequestException as e:
        return JsonResponse({'error': "Please check your personal access token"}, status=500)

@token_required
def get_shared_camera(request):
    access_token = request.GET.get('accessToken')
    camera_id = request.GET.get('cameraId')

    client = Angelcam_client(access_token)

    try:
        response = client.get(f'shared-cameras/{camera_id}/')
        return JsonResponse(response, safe=False)
    except requests.RequestException as e:
        return JsonResponse({'error': e}, status=500)

@token_required
def get_shared_cameras(request):
    access_token = request.GET.get('accessToken')
    
    client = Angelcam_client(access_token)
        
    try:
        response = client.get('shared-cameras/')
        return JsonResponse(response, safe=False)
    except requests.RequestException as e:
        return JsonResponse({'error': e}, status=500)

@token_required
def get_shared_camera_records(request, camera_id):
    access_token = request.GET.get('accessToken')

    client = Angelcam_client(access_token)

    now = datetime.now(timezone.utc)
    end_date = now.replace(hour=0, minute=0, second=0, microsecond=0)
    start_date = (end_date - timedelta(days=1))

    params = {
    "start": start_date.strftime('%Y-%m-%dT%H:%M:%S.000Z'),
    "end": end_date.strftime('%Y-%m-%dT%H:%M:%S.000Z')
}

    try:
        response = client.get(f'shared-cameras/{camera_id}/recording/timeline/', params=params)
        return JsonResponse(response, safe=False)
    except requests.RequestException as e:
        return JsonResponse({'error': e}, status=500)
    
@token_required
def get_shared_camera_recording_stream(request, camera_id):
    access_token = request.GET.get('accessToken')
    start_date = request.GET.get('startDate')
    end_date = request.GET.get('endDate')

    client = Angelcam_client(access_token)

    params = {
        "start": start_date,
        "end": end_date
    }

    try:
        response = client.get(f'shared-cameras/{camera_id}/recording/stream/', params=params)
        return JsonResponse(response, safe=False)
    except requests.RequestException as e:
        return JsonResponse({'error': e}, status=500)