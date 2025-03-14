from django.urls import path
from .views import get_all_users,add_user

urlpatterns = [
    path('users/', get_all_users, name='get_all_users'),
        path('api/users/add/', add_user, name='add_user'),

]
