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