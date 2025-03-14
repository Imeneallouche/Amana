from django.db import models
from django.contrib.auth.models import AbstractUser

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
class PersonInNeed(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)  # Optional for anonymity
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    location = models.CharField(max_length=255, blank=True, null=True)
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
    requested_amount = models.DecimalField(max_digits=10, decimal_places=2)
    current_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    document_list = models.JSONField(default=list)

# Step Entity
class Step(models.Model):
    id = models.AutoField(primary_key=True)
    time = models.DateTimeField()
    block_id = models.CharField(max_length=255)
    description = models.TextField()

# Transaction
class Transaction(models.Model):
    id = models.AutoField(primary_key=True)
    request = models.ForeignKey(HelpRequest, on_delete=models.CASCADE)
    donor = models.ForeignKey(Volunteer, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_date = models.DateTimeField(auto_now_add=True)
    arrival_date = models.DateTimeField(blank=True, null=True)
    blockchain_hash = models.CharField(max_length=255)
    send_block_id = models.CharField(max_length=255)
    validation_block_id = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=[('Pending', 'Pending'), ('Completed', 'Completed'), ('Failed', 'Failed')])
    fund_arrival_date = models.DateTimeField(blank=True, null=True)
    steps = models.ManyToManyField(Step)
    accomplishment_images = models.JSONField(default=list)  # Uploaded by beneficiaries
