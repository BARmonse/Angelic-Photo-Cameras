from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
import requests

from .clients.angelcam_client import Angelcam_client

def health_check(request):
    return HttpResponse("OK")

@csrf_exempt
def login(request):
    access_token = request.GET.get('accessToken')
    
    client = Angelcam_client(access_token)
        
    try:
        response = client.get('me/')
        return JsonResponse(response, safe=False)
    except requests.RequestException as e:
        return JsonResponse({'error': "Please check your personal access token"}, status=500)

@csrf_exempt
def get_shared_camera(request):
    access_token = request.GET.get('accessToken')
    camera_id = request.GET.get('cameraId')

    client = Angelcam_client(access_token)

    try:
        response = client.get(f'shared-cameras/{camera_id}/')
        return JsonResponse(response, safe=False)
    except requests.RequestException as e:
        return JsonResponse({'error': e}, status=500)

@csrf_exempt
def get_shared_cameras(request):
    access_token = request.GET.get('accessToken')
    
    client = Angelcam_client(access_token)
        
    try:
        response = client.get('shared-cameras/')
        return JsonResponse(response, safe=False)
    except requests.RequestException as e:
        return JsonResponse({'error': e}, status=500)

@csrf_exempt
def get_shared_camera_records(request, camera_id):
    access_token = request.GET.get('accessToken')

    client = Angelcam_client(access_token)

    params = {
        "start": "2024-08-08T00:00:00.000Z",
        "end": "2024-08-09T00:00:00.000Z"
    }

    try:
        response = client.get(f'shared-cameras/{camera_id}/recording/timeline/', params=params)
        return JsonResponse(response, safe=False)
    except requests.RequestException as e:
        return JsonResponse({'error': e}, status=500)
    
@csrf_exempt
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

@csrf_exempt
def get_camera_recordings(request, camera_id):
    access_token = request.GET.get('accessToken')

    client = Angelcam_client(access_token)

    try:
        response = client.get(f'cameras/{camera_id}/recordings')
        return JsonResponse(response, safe=False)
    except requests.RequestException as e:
        return JsonResponse({'error': e}, status=500)
    
