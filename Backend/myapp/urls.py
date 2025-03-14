from django.urls import path
from .views import user_list

urlpatterns = [
    path('users/', user_list, name='user-list'),
]