from django.urls import path
from .views import get_all_users

urlpatterns = [
    path('users/', get_all_users, name='get_all_users'),
]
