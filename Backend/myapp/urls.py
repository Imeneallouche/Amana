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
    path('search-help-requests/',search_help_requests),
    path('ngo-list/',get_ngo_list), 
    path('person_need/', person_in_need_list, name='person_in_need-list'),
    path('person_need/<int:pk>/', person_in_need_detail, name='person_in_need-detail'),
 
]