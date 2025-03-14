from django.http import JsonResponse
from rest_framework.decorators import api_view
from .models import User  # Import your custom User model
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User

@api_view(['GET'])
def get_all_users(request):
    users = User.objects.all().values('id', 'username', 'email', 'user_type', 'wallet_address', 'profile_picture')
    return JsonResponse(list(users), safe=False)

@api_view(['POST'])
def add_user(request):
    data = request.data
    try:
        user = User.objects.create(
            username=data.get("username"),
            email=data.get("email"),
            password=make_password(data.get("password")),  # Hash the password
            user_type=data.get("user_type"),
            wallet_address=data.get("wallet_address"),
            profile_picture=data.get("profile_picture", ""),
        )
        return Response({"message": "User created successfully", "user_id": user.id}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
