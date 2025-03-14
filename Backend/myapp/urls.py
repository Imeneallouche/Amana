from django.urls import path
from .views import user_list
from .views import *

urlpatterns = [
    path('users/', user_list, name='user-list'),
    path('help-requests/', help_request_list, name='help-request-list'),
    path('help-requests/<int:pk>/', help_request_detail, name='help-request-detail'),
    path('ngos/', ngo_list , name='ngos-list'),
    path('ngos/<int:pk>/', ngo_detail,name='ngos-detail'),
    path('all-ngos/',get_all_ngos),  
    path('filtered-ngos/',get_filtered_ngos),  
]