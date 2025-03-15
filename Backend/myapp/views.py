from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.db import IntegrityError
from django.db.models import Sum
@api_view(['GET', 'POST'])
def user_list(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
def list_transactions(request):
    transactions = Transaction.objects.all()
    serializer = TransactionSerializer(transactions, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_transaction(request):
    serializer = TransactionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','POST'])
def help_request_list(request):
    if request.method=='GET':
        help_requests=HelpRequest.objects.all()
        serializer =HelpRequestSerializer(help_requests, many=True)
        return Response(serializer.data)
    elif request.method=='POST':
        serializer = HelpRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET','PUT','DELETE'])
def help_request_detail(request,pk):
    try :
      help_request =HelpRequest.objects.get(pk=pk)    
    except HelpRequest.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    

    if request.method == 'GET':
       serializer =HelpRequestSerializer(help_request)
       return Response(serializer.data)
    elif request.method =='PUT':
        serializer = HelpRequestSerializer(help_request,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    elif request.method== 'DELETE':
        help_request.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

@api_view(['GET', 'POST'])
def ngo_list(request):
    """
    List all NGOs or create a new NGO
    """
    if request.method == 'GET':
        ngos = NGO.objects.all()
        serializer = NGOSerializer(ngos, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = NGOSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def ngo_detail(request, pk):
    """
    Retrieve, update or delete an NGO
    """
    try:
        ngo = NGO.objects.get(pk=pk)
    except NGO.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = NGOSerializer(ngo)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = NGOSerializer(ngo, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        ngo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def get_all_ngos(request):
    """
    Récupère toutes les ONGs avec leurs détails complets
    """
    ngos = NGO.objects.all()
    serializer = NGOSerializer(ngos, many=True)
    return Response(serializer.data)

# Option avec filtrage
@api_view(['GET'])
def get_filtered_ngos(request):
    """
    Récupère toutes les ONGs avec possibilité de filtrage
    """
    ngos = NGO.objects.all()
    
    # Filtrage par localisation
    localisation = request.query_params.get('localisation', None)
    if localisation:
        ngos = ngos.filter(localisation__icontains=localisation)
    
    # Recherche textuelle dans la description
    description = request.query_params.get('description', None)
    if description:
        ngos = ngos.filter(description__icontains=description)
    
    # Tri des résultats
    ordering = request.query_params.get('ordering', 'username')
    ngos = ngos.order_by(ordering)
    
    serializer = NGOSerializer(ngos, many=True)
    return Response({
        'count': ngos.count(),
        'results': serializer.data
    })        


@api_view(['POST'])
def create_volunteer(request):
    serializer = VolunteerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def retrieve_transaction(request, pk):
    try:
        transaction = Transaction.objects.get(pk=pk)
    except Transaction.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = TransactionSerializer(transaction)
    return Response(serializer.data)

@api_view(['PUT'])
def update_transaction(request, pk):
    try:
        transaction = Transaction.objects.get(pk=pk)
    except Transaction.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = TransactionSerializer(transaction, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def register_user(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_user(request):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def volunteer_total_missions(request, volunteer_id):
    try:
        # Get the volunteer
        volunteer = Volunteer.objects.get(pk=volunteer_id)

        # Count the number of transactions for this volunteer
        total_missions = Transaction.objects.filter(donor=volunteer).count()

        return Response({'volunteer_id': volunteer_id, 'total_missions': total_missions}, status=status.HTTP_200_OK)
    except Volunteer.DoesNotExist:
        return Response({'error': 'Volunteer not found'}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(['GET'])
def volunteer_total_donations(request, volunteer_id):
    try:
        # Get the volunteer
        volunteer = Volunteer.objects.get(pk=volunteer_id)

        # Calculate the total amount donated by this volunteer
        total_donations = Transaction.objects.filter(donor=volunteer).aggregate(Sum('amount'))['amount__sum']

        if total_donations is None:
            total_donations = 0

        return Response({'volunteer_id': volunteer_id, 'total_donations': total_donations}, status=status.HTTP_200_OK)
    except Volunteer.DoesNotExist:
        return Response({'error': 'Volunteer not found'}, status=status.HTTP_404_NOT_FOUND)



@api_view(['GET'])
def is_donor_life_saver_in_health(request, volunteer_id):
    try:
        # Get the volunteer
        volunteer = Volunteer.objects.get(pk=volunteer_id)

        # Count the number of distinct help requests in the "Health" category associated with the volunteer's transactions
        help_request_count = (
            Transaction.objects
            .filter(donor=volunteer, request__category='Health')
            .values('request')
            .distinct()
            .count()
        )

        # Determine if the volunteer is a life saver in the "Health" category
        is_life_saver = help_request_count > 5

        return Response({'volunteer_id': volunteer_id, 'is_life_saver_in_health': is_life_saver}, status=status.HTTP_200_OK)
    except Volunteer.DoesNotExist:
        return Response({'error': 'Volunteer not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def is_donor_food_champion(request, volunteer_id):
    try:
        # Get the volunteer
        volunteer = Volunteer.objects.get(pk=volunteer_id)

        # Count the number of distinct help requests in the "Food" category associated with the volunteer's transactions
        help_request_count = (
            Transaction.objects
            .filter(donor=volunteer, request__category='Food')
            .values('request')
            .distinct()
            .count()
        )

        # Determine if the volunteer is a food champion
        is_food_champion = help_request_count > 5

        return Response({'volunteer_id': volunteer_id, 'is_food_champion': is_food_champion}, status=status.HTTP_200_OK)
    except Volunteer.DoesNotExist:
        return Response({'error': 'Volunteer not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def is_donor_education_advocate(request, volunteer_id):
    try:
        # Get the volunteer
        volunteer = Volunteer.objects.get(pk=volunteer_id)

        # Count the number of distinct help requests in the "Education" category associated with the volunteer's transactions
        help_request_count = (
            Transaction.objects
            .filter(donor=volunteer, request__category='Education')
            .values('request')
            .distinct()
            .count()
        )

        # Determine if the volunteer is an education advocate
        is_education_advocate = help_request_count > 5

        return Response({'volunteer_id': volunteer_id, 'is_education_advocate': is_education_advocate}, status=status.HTTP_200_OK)
    except Volunteer.DoesNotExist:
        return Response({'error': 'Volunteer not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def volunteer_accomplishment_images(request, volunteer_id):
    try:
        # Get the volunteer
        volunteer = Volunteer.objects.get(pk=volunteer_id)

        # Retrieve transactions associated with the volunteer
        transactions = Transaction.objects.filter(donor=volunteer)

        # Extract accomplishment images from the transactions
        accomplishment_images = []
        for transaction in transactions:
            if transaction.accomplishment_images:
                accomplishment_images.extend(transaction.accomplishment_images)

        return Response({'volunteer_id': volunteer_id, 'accomplishment_images': accomplishment_images}, status=status.HTTP_200_OK)
    except Volunteer.DoesNotExist:
        return Response({'error': 'Volunteer not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def help_requests_by_ngo(request, ngo_id, help_request_id=None):
    try:
        # Get the NGO
        ngo = NGO.objects.get(pk=ngo_id)

        if help_request_id is not None:
            # Retrieve a specific help request by ID
            try:
                help_request = HelpRequest.objects.get(pk=help_request_id, person_in_need__associated_ngo=ngo)
                serializer = HelpRequestSerializer(help_request)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except HelpRequest.DoesNotExist:
                return Response({'error': 'Help request not found for this NGO'}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Retrieve all help requests where the person in need is associated with the NGO
            help_requests = HelpRequest.objects.filter(person_in_need__associated_ngo=ngo)
            serializer = HelpRequestSerializer(help_requests, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
    except NGO.DoesNotExist:
        return Response({'error': 'NGO not found'}, status=status.HTTP_404_NOT_FOUND)