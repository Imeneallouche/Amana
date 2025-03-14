from rest_framework import serializers
from .models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from rest_framework import viewsets
from rest_framework.decorators import action

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
    

# A serializer for HelpRequest : 
class HelpRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = HelpRequest
        fields = ['id','title','location','urgency','required_amount','current_amount']



class NGOSerializer(serializers.ModelSerializer):
    class Meta:
        model = NGO
        fields = ['id', 'username', 'email', 'phone_number', 'localisation', 'description']
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance