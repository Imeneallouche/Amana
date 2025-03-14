from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from .models import *
from .serializers import *

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

# list all the help request and create new ones
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