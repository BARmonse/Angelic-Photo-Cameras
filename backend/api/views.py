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
def get_shared_cameras(request):
    access_token = request.GET.get('accessToken')
    
    client = Angelcam_client(access_token)
        
    try:
        response = client.get('shared-cameras/')
        return JsonResponse(response, safe=False)
    except requests.RequestException as e:
        return JsonResponse({'error': e}, status=500)
    

@csrf_exempt
def get_shared_camera_records(request, cameraId):
    access_token = request.GET.get('accessToken')
    start_date = request.GET.get('startDate')
    end_date = request.GET.get('endDate')

    client = Angelcam_client(access_token)

    try:
        response = client.get(f'shared-cameras/{cameraId}/recording/timeline', params= { "start": start_date, "end": end_date })
        return JsonResponse(response, safe=False)
    except requests.RequestException as e:
        return JsonResponse({'error': e}, status=500)
    
@csrf_exempt
def get_shared_camera_record_stream(request, cameraId):
    access_token = request.GET.get('accessToken')
    start_date = request.GET.get('startDate')
    end_date = request.GET.get('endDate')

    client = Angelcam_client(access_token)

    try:
        response = client.get(f'shared-cameras/{cameraId}/recording/timeline', params = { "start": start_date, "end": end_date })
        return JsonResponse(response, safe=False)
    except requests.RequestException as e:
        return JsonResponse({'error': e}, status=500)