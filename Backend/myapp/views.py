from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from .models import *
from .serializers import *
from django.db.models import Q, F, ExpressionWrapper, FloatField
from .serializers import HelpRequestSearchSerializer
from datetime import datetime
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


#Fltering les demande d'aide with title and description , et selon : category , progress_status , location , 

@api_view(['GET'])
def search_help_requests(request):
    help_requests = HelpRequest.objects.all()
    
    applied_filters = {}
    
    # 1. Recherche par mots-clés dans le titre et la description
    search_term = request.query_params.get('q', '')
    keywords = []
    
    if search_term:
        keywords = search_term.split()
        
        query = Q()
        
        for keyword in keywords:
            query |= Q(title__icontains=keyword) | Q(description__icontains=keyword)
        
        help_requests = help_requests.filter(query)
        applied_filters['search_term'] = search_term
        applied_filters['keywords'] = keywords
    
    # 2. Filtre par catégorie 
    category = request.query_params.get('category', None)
    if category:
        help_requests = help_requests.filter(category=category)
        applied_filters['category'] = category
    
    # 3. Filtre par ONG
    ngo_username = request.query_params.get('ngo_username', None)
    if ngo_username:
        try:
            ngo = NGO.objects.get(username=ngo_username)
            help_requests = help_requests.filter(ngo=ngo)
            applied_filters['ngo_username'] = ngo_username
        except NGO.DoesNotExist:
            return Response({
                'count': 0,
                'error': f"ONG avec le nom d'utilisateur '{ngo_username}' non trouvée",
                'filters_applied': applied_filters,
                'results': []
            })
    
    # Recherche par ID de l'ONG (optionnel)
    ngo_id = request.query_params.get('ngo_id', None)
    if ngo_id:
        try:
            ngo_id = int(ngo_id)
            help_requests = help_requests.filter(ngo_id=ngo_id)
            applied_filters['ngo_id'] = ngo_id
        except ValueError:
            pass
    
    # 4. Filtre par nom de l'ONG (recherche partielle, optionnel)
    ngo_name = request.query_params.get('ngo_name', None)
    if ngo_name:
        help_requests = help_requests.filter(ngo__username__icontains=ngo_name)
        applied_filters['ngo_name'] = ngo_name
    
    # 5. Filtre par location (optionnel)
    location = request.query_params.get('location', None)
    if location:
        help_requests = help_requests.filter(location__icontains=location)
        applied_filters['location'] = location
    
    # 6. Filtre par statut (optionnel)
    status_filter = request.query_params.get('status', None)
    if status_filter:
        help_requests = help_requests.filter(status=status_filter)
        applied_filters['status'] = status_filter
    
    # 7. Filtre par urgence (optionnel)
    urgency = request.query_params.get('urgency', None)
    if urgency:
        help_requests = help_requests.filter(urgency=urgency)
        applied_filters['urgency'] = urgency
    
    # 8. Calculer le pourcentage de progression pour chaque demande d'aide
    help_requests = help_requests.annotate(
        progress=ExpressionWrapper(
            F('current_amount') * 100.0 / F('required_amount'),
            output_field=FloatField()
        )
    )
    
    # 9. Filtre par pourcentage de progression (optionnel)
    min_progress = request.query_params.get('min_progress', None)
    if min_progress:
        try:
            min_progress = float(min_progress)
            help_requests = help_requests.filter(progress__gte=min_progress)
            applied_filters['min_progress'] = min_progress
        except ValueError:
            pass
    
    max_progress = request.query_params.get('max_progress', None)
    if max_progress:
        try:
            max_progress = float(max_progress)
            help_requests = help_requests.filter(progress__lte=max_progress)
            applied_filters['max_progress'] = max_progress
        except ValueError:
            pass
    
    # 10. Filtre par montant requis (optionnel)
    min_amount = request.query_params.get('min_amount', None)
    if min_amount:
        try:
            min_amount = float(min_amount)
            help_requests = help_requests.filter(required_amount__gte=min_amount)
            applied_filters['min_amount'] = min_amount
        except ValueError:
            pass
    
    max_amount = request.query_params.get('max_amount', None)
    if max_amount:
        try:
            max_amount = float(max_amount)
            help_requests = help_requests.filter(required_amount__lte=max_amount)
            applied_filters['max_amount'] = max_amount
        except ValueError:
            pass
    
    # 11. Filtre par date de création (optionnel)
    created_after = request.query_params.get('created_after', None)
    if created_after:
        try:
            created_after_date = datetime.strptime(created_after, '%Y-%m-%d').date()
            help_requests = help_requests.filter(created_at__date__gte=created_after_date)
            applied_filters['created_after'] = created_after
        except ValueError:
            pass
    
    created_before = request.query_params.get('created_before', None)
    if created_before:
        try:
            created_before_date = datetime.strptime(created_before, '%Y-%m-%d').date()
            help_requests = help_requests.filter(created_at__date__lte=created_before_date)
            applied_filters['created_before'] = created_before
        except ValueError:
            pass
    
    # 12. Pagination (optionnel)
    page = request.query_params.get('page', '1')
    page_size = request.query_params.get('page_size', '10')
    
    try:
        page = int(page)
        page_size = min(int(page_size), 100)  # Limiter à 100 résultats max par page
    except ValueError:
        page = 1
        page_size = 10
    
    # 13. Tri des résultats
    ordering = request.query_params.get('ordering', 'urgency')
    valid_ordering_fields = ['urgency', '-urgency', 'created_at', '-created_at', 
                             'required_amount', '-required_amount', 'title', '-title']
    
    # Ajouter la progression si elle est demandée
    if ordering == 'progress' or ordering == '-progress':
        # Le queryset est déjà annoté avec 'progress'
        help_requests = help_requests.order_by(ordering)
    elif ordering in valid_ordering_fields:
        help_requests = help_requests.order_by(ordering)
    else:
        help_requests = help_requests.order_by('urgency')  # Tri par défaut
    
    # Calculer le nombre total avant pagination
    total_count = help_requests.count()
    
    # Appliquer la pagination
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    paginated_requests = help_requests[start_index:end_index]
    
    # 14. Sérialiser les résultats
    serializer = HelpRequestSearchSerializer(paginated_requests, many=True)
    
    # 15. Retourner les résultats avec des métadonnées
    return Response({
        'count': total_count,
        'page': page,
        'page_size': page_size,
        'total_pages': (total_count + page_size - 1) // page_size,
        'filters_applied': applied_filters,
        'results': serializer.data
    })
@api_view(['GET'])
def get_ngo_list(request):
   
    search = request.query_params.get('search', '')
    
    # Filtrer les ONGs par nom si un terme de recherche est fourni
    ngos = NGO.objects.all()
    if search:
        ngos = ngos.filter(username__icontains=search)
    
    # Limiter les résultats et sélectionner uniquement les champs nécessaires
    ngos = ngos[:30].values('id', 'username', 'description', 'localisation')
    
    return Response({
        'count': len(ngos),
        'results': list(ngos)
    })


#People in need 
@api_view(['GET','POST'])
def person_in_need_list(request):
    if request.method=='GET':
        person_need=PersonInNeed.objects.all()
        serializer =PersonInNeedSerializer(person_need, many=True)
        return Response(serializer.data)
    elif request.method=='POST':
        serializer = PersonInNeedSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET','PUT','DELETE'])
def person_in_need_detail(request,pk):
    try :
      person_need =PersonInNeed.objects.get(pk=pk)    
    except PersonInNeed.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    

    if request.method == 'GET':
       serializer =PersonInNeedSerializer(person_need)
       return Response(serializer.data)
    elif request.method =='PUT':
        serializer = PersonInNeedSerializer(person_need,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    elif request.method== 'DELETE':
        person_need.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

