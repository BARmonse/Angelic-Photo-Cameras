from django.http import JsonResponse
from functools import wraps

def token_required(view_func):
    @wraps(view_func)
    def _secure_view(request, *args, **kwargs):
        access_token = request.GET.get('accessToken')
        if not access_token:
            return JsonResponse({'error': 'Access token is required'}, status=401)
        
        if not is_valid_token(access_token):
            return JsonResponse({'error': 'Invalid access token'}, status=401)
                
        return view_func(request, *args, **kwargs)
    
    return _secure_view

# TODO: Must be improved
def is_valid_token(token):
    
    return len(token) == 40