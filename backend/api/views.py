from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
import requests

from .clients.angelcam_client import Angelcam_client

def health_view(request):
    return HttpResponse("OK")

@csrf_exempt
def auth_view(request):
    access_token = request.GET.get('accessToken')
    
    client = Angelcam_client(access_token)

    print(client)
        
    try:
        response = client.get('me/')
        return JsonResponse(response, safe=False)
    except requests.RequestException as e:
        return JsonResponse({'error': str(e)}, status=500)