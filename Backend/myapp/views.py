from django.http import JsonResponse
from rest_framework.decorators import api_view
from .models import User  # Import your custom User model

@api_view(['GET'])
def get_all_users(request):
    users = User.objects.all().values('id', 'username', 'email', 'user_type', 'wallet_address', 'profile_picture')
    return JsonResponse(list(users), safe=False)
