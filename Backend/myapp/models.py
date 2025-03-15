from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models import JSONField

# Utilisateur de base
class User(AbstractUser):
    phone_number = models.CharField(max_length=20, unique=True)
    localisation = models.CharField(max_length=255, blank=True, null=True)
    groups = models.ManyToManyField("auth.Group",related_name="custom_user_set",blank=True)
    user_permissions = models.ManyToManyField("auth.Permission",related_name="custom_user_permissions_set",null=True)
# Bénévole
class Volunteer(User):
    transaction_history = models.JSONField(default=list)  # List of transactions

# NGO
class NGO(User):
    description = models.TextField()

# Person in Need
class PersonInNeed(User):
    associated_ngo = models.ForeignKey(NGO, on_delete=models.SET_NULL, null=True, blank=True)

# Help Request
class HelpRequest(models.Model):
    id = models.AutoField(primary_key=True)
    person_in_need = models.ForeignKey(PersonInNeed, on_delete=models.SET_NULL, null=True, blank=True)
    ngo = models.ForeignKey(NGO, on_delete=models.SET_NULL, null=True, blank=True)
    title = models.CharField(max_length=255)
    needs_list = models.JSONField(default=list)
    category = models.CharField(max_length=50, choices=[('Health', 'Health'), ('Food', 'Food'), ('Education', 'Education')])
    description = models.TextField()
    required_amount = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=255, blank=True, null=True)
    urgency = models.CharField(max_length=20, blank=True, null=True)  # Completed by AI
    proof_list = models.JSONField(default=list)  # Images, documents
    status = models.CharField(max_length=50, choices=[('Pending', 'Pending'), ('Approved', 'Approved'), ('Funding', 'Funding'), ('Completed', 'Completed')])
    current_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    document_list = models.JSONField(default=list)


# Transaction
class Transaction(models.Model):
    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("ESCROW", "In Escrow"),
        ("RELEASED", "Funds Released"),
        ("DISPUTED", "Disputed"),
        ("REFUNDED", "Refunded"),
    ]

    class Stages(models.IntegerChoices):
        INITIALIZED = 0
        VALIDATED = 1
        INCLUDED = 2
        FINALIZED = 3

    class Methods(models.TextChoices):
        ETHEREUM = "ETH"
        PAYSERA = "PSR"
        BARIDIMOB = "BRM"
        CCP = "CCP"

    id = models.AutoField(primary_key=True)
    request = models.ForeignKey(HelpRequest, on_delete=models.CASCADE)
    donor = models.ForeignKey(Volunteer, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    method = models.CharField(max_length=3, choices=Methods.choices)
    stage = models.IntegerField(choices=Stages.choices)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    beneficiary_proof =models.JSONField(default=list)
    network = models.CharField(max_length=20)
    impact_percentage = models.FloatField(default=0.0)
    tx_hash = models.CharField(max_length=66, unique=True)

    transaction_date = models.DateTimeField(auto_now_add=True)
    arrival_date = models.DateTimeField(blank=True, null=True)
    blockchain_hash = models.CharField(max_length=255)
    send_block_id = models.CharField(max_length=255)
    validation_block_id = models.CharField(max_length=255)
    fund_arrival_date = models.DateTimeField(blank=True, null=True)
    accomplishment_images = models.JSONField(default=list)  # Uploaded by beneficiaries
    

class Badge(models.Model):
    BADGE_TYPES = [
        ("VOLUNTEER", "Volunteer"),
        ("NGO", "Organization"),
        ("BENEFICIARY", "Beneficiary"),
    ]

    name = models.CharField(max_length=100, unique=True)
    badge_id = models.PositiveIntegerField(unique=True)
    badge_type = models.CharField(max_length=20, choices=BADGE_TYPES)
    criteria = models.JSONField()  # {"metric": "meals_provided", "threshold": 1000}
    image_ipfs_hash = models.CharField(max_length=46)
    description = models.TextField()
    ipfs_media = models.CharField(max_length=46)
    network = models.CharField(max_length=20)


class UserAchievement(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    missions_joined = models.PositiveIntegerField(default=0)
    total_donated = models.DecimalField(max_digits=20, decimal_places=2)
    lives_saved = models.PositiveIntegerField(default=0)
    people_fed = models.PositiveIntegerField(default=0)
    education_impact = models.PositiveIntegerField(default=0)
    last_updated = models.DateTimeField(auto_now=True)


class UserBadge(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    badge = models.ForeignKey(Badge, on_delete=models.CASCADE)
    award_tx = models.CharField(max_length=66)  # Blockchain proof
    awarded_at = models.DateTimeField(auto_now_add=True)
