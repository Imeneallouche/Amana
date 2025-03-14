from django.urls import path
from .views import user_list
from .views import *

urlpatterns = [
    path('users/', user_list, name='user-list'),
    path('help-requests/', help_request_list, name='help-request-list'),
    path('help-requests/<int:pk>/', help_request_detail, name='help-request-detail'),
]