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
        fields = '__all__'



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
    
class NGOShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = NGO
        fields = ['id', 'username', 'localisation']

# Sérialiseur simplifié pour les informations de la personne dans le besoin
class PersonInNeedShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonInNeed
        fields = ['id', 'username']

# Sérialiseur complet pour les résultats de recherche de demandes d'aide
class HelpRequestSearchSerializer(serializers.ModelSerializer):
    # Ajouter des champs calculés ou des relations
    ngo_details = NGOShortSerializer(source='ngo', read_only=True)
    person_details = PersonInNeedShortSerializer(source='person_in_need', read_only=True)
    progress_percentage = serializers.SerializerMethodField()
    remaining_amount = serializers.SerializerMethodField()
    
    class Meta:
        model = HelpRequest
        fields = [
            'id', 'title', 'description', 'category', 'location', 
            'urgency', 'required_amount', 'current_amount', 'status',
            'ngo_details', 'person_details', 'progress_percentage',
            'remaining_amount', 'needs_list'
        ]
    
    def get_progress_percentage(self, obj):
        """Calcule le pourcentage de progression du financement"""
        if obj.required_amount == 0:
            return 100.0
        return round((obj.current_amount / obj.required_amount) * 100, 2)
    
    def get_remaining_amount(self, obj):
        """Calcule le montant restant à collecter"""
        return max(0, obj.required_amount - obj.current_amount)
    
    def to_representation(self, instance):
        """Personnalise la représentation des données"""
        data = super().to_representation(instance)
        
        # Formatage des besoins (needs_list)
        if isinstance(data['needs_list'], list) and data['needs_list']:
            # Limiter à 3 besoins pour l'aperçu, avec indication du nombre total
            if len(data['needs_list']) > 3:
                data['needs_preview'] = data['needs_list'][:3]
                data['total_needs_count'] = len(data['needs_list'])
            else:
                data['needs_preview'] = data['needs_list']
                data['total_needs_count'] = len(data['needs_list'])
        
        return data    
    
class PersonInNeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonInNeed
        fields = '__all__'