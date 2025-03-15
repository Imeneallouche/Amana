from django.urls import path
from .views import  *

urlpatterns = [
    path('users/', user_list, name='user-list'),
      path('transactions/', list_transactions, name='list-transactions'),
    path('transactions/create/', create_transaction, name='create-transaction'),
      path('help-requests/', help_request_list, name='help-request-list'),
    path('help-requests/<int:pk>/', help_request_detail, name='help-request-detail'),
    path('ngos/', ngo_list , name='ngos-list'),
    path('ngos/<int:pk>/', ngo_detail,name='ngos-detail'),
    path('all-ngos/',get_all_ngos),  
    path('filtered-ngos/',get_filtered_ngos),  
    path('volunteers/create/', create_volunteer, name='create-volunteer'),
    path('transactions/<int:pk>/', retrieve_transaction, name='retrieve-transaction'),
    path('transactions/<int:pk>/update/', update_transaction, name='update-transaction'),
   path('register/', register_user, name='register-user'),
    path('login/', login_user, name='login-user'),
    path('volunteers/<int:volunteer_id>/total-missions/', volunteer_total_missions, name='volunteer-total-missions'),
    path('volunteers/<int:volunteer_id>/total-donations/', volunteer_total_donations, name='volunteer-total-donations'),
    path('volunteers/<int:volunteer_id>/is-life-saver-in-health/', is_donor_life_saver_in_health, name='is-donor-life-saver-in-health'),
     path('volunteers/<int:volunteer_id>/is-food-champion/', is_donor_food_champion, name='is-donor-food-champion'),
    path('volunteers/<int:volunteer_id>/is-education-advocate/', is_donor_education_advocate, name='is-donor-education-advocate'),
    path('volunteers/<int:volunteer_id>/accomplishment-images/', volunteer_accomplishment_images, name='volunteer-accomplishment-images'),
    path('ngos/<int:ngo_id>/help-requests/', help_requests_by_ngo, name='help-requests-by-ngo'),
    path('ngos/<int:ngo_id>/help-requests/<int:help_request_id>/', help_requests_by_ngo, name='help-request-detail-by-ngo'),
    ]