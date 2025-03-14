from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils import timezone



class User(AbstractUser):
    USER_TYPES = (
        ("VOLUNTEER", "Volunteer"),
        ("NGO", "Non-Profit Organization"),
        ("BENEFICIARY", "Person in Need"),
    )
    user_type = models.CharField(max_length=20, choices=USER_TYPES)
    wallet_address = models.CharField(
        max_length=42, blank=True, null=True
    )  # Crypto wallet
    profile_picture = models.ImageField(upload_to="profiles/", null=True, blank=True)
    groups = models.ManyToManyField(Group, related_name="custom_user_set", blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name="custom_user_set", blank=True)

    def __str__(self):
        return f"{self.username} ({self.get_user_type_display()})"


class VolunteerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    total_donated = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    impact_score = models.PositiveIntegerField(default=0)

    @property
    def completed_missions(self):
        return self.transaction_set.filter(status="COMPLETED").count()


class NGOProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    registration_number = models.CharField(max_length=50)
    verification_documents = models.FileField(upload_to="ngo_docs/")
    transparency_score = models.FloatField(default=0.0)
    website = models.URLField(blank=True)


class PersonInNeedProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    anonymous_id = models.CharField(max_length=36, unique=True)
    location = models.CharField(max_length=100)
    is_anonymous = models.BooleanField(default=True)


class Mission(models.Model):
    URGENCY_LEVELS = (
        ("CRITICAL", "Urgent"),
        ("HIGH", "High"),
        ("MODERATE", "Moderate"),
    )

    creator_ngo = models.ForeignKey(
        NGOProfile, on_delete=models.CASCADE, null=True, blank=True
    )
    creator_beneficiary = models.ForeignKey(
        PersonInNeedProfile, on_delete=models.CASCADE, null=True, blank=True
    )
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=50)
    target_amount = models.DecimalField(max_digits=15, decimal_places=2)
    amount_raised = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    location = models.CharField(max_length=100)
    deadline = models.DateTimeField()
    urgency = models.CharField(max_length=20, choices=URGENCY_LEVELS)
    smart_contract_address = models.CharField(max_length=42, blank=True)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def progress(self):
        return (self.amount_raised / self.target_amount) * 100


class MissionMedia(models.Model):
    mission = models.ForeignKey(Mission, on_delete=models.CASCADE, related_name="media")
    file = models.FileField(upload_to="mission_media/")
    caption = models.CharField(max_length=200)
    timestamp = models.DateTimeField(auto_now_add=True)
    ipfs_hash = models.CharField(max_length=66, blank=True)  # IPFS storage


class Transaction(models.Model):
    STATUS_CHOICES = (
        ("PENDING", "Pending"),
        ("CONFIRMED", "Confirmed"),
        ("COMPLETED", "Completed"),
        ("DISPUTED", "Disputed"),
    )

    mission = models.ForeignKey(Mission, on_delete=models.CASCADE)
    donor = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    tx_hash = models.CharField(max_length=66)  # Blockchain transaction hash
    block_number = models.PositiveBigIntegerField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="PENDING")
    created_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)


class BeneficiaryRequest(models.Model):
    STATUS_CHOICES = (
        ("PENDING", "Pending"),
        ("APPROVED", "Approved"),
        ("REJECTED", "Rejected"),
    )

    beneficiary = models.ForeignKey(PersonInNeedProfile, on_delete=models.CASCADE)
    ngo = models.ForeignKey(NGOProfile, on_delete=models.CASCADE, null=True, blank=True)
    mission = models.ForeignKey(
        Mission, on_delete=models.CASCADE, null=True, blank=True
    )
    title = models.CharField(max_length=200)
    description = models.TextField()
    needs_list = models.JSONField()  # Stores list of required items
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="PENDING")
    created_at = models.DateTimeField(auto_now_add=True)


class Feedback(models.Model):
    RATING_CHOICES = [(i, str(i)) for i in range(1, 6)]

    mission = models.ForeignKey(Mission, on_delete=models.CASCADE)
    beneficiary = models.ForeignKey(PersonInNeedProfile, on_delete=models.CASCADE)
    rating = models.PositiveSmallIntegerField(choices=RATING_CHOICES)
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    verified = models.BooleanField(default=False)  # Verified via smart contract


class Badge(models.Model):
    BADGE_TYPES = (
        ("VOLUNTEER", "Volunteer"),
        ("NGO", "NGO"),
    )

    name = models.CharField(max_length=100)
    description = models.TextField()
    badge_type = models.CharField(max_length=20, choices=BADGE_TYPES)
    criteria = models.JSONField()  # e.g., {"min_donations": 5, "min_amount": 1000}


class UserBadge(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    badge = models.ForeignKey(Badge, on_delete=models.CASCADE)
    awarded_at = models.DateTimeField(auto_now_add=True)
    tx_proof = models.CharField(max_length=66)  # Blockchain proof


class ImpactReport(models.Model):
    mission = models.ForeignKey(Mission, on_delete=models.CASCADE)
    report_file = models.FileField(upload_to="impact_reports/")
    generated_at = models.DateTimeField(auto_now_add=True)
    metrics = models.JSONField()  # Stores structured impact data
    visualization_data = models.TextField()  # 3D/AR visualization config


# Blockchain Event Logging
class BlockchainEvent(models.Model):
    EVENT_TYPES = (
        ("TX_CONFIRMED", "Transaction Confirmed"),
        ("CONTRACT_EXECUTED", "Smart Contract Executed"),
        ("DISPUTE_RAISED", "Dispute Raised"),
    )

    event_type = models.CharField(max_length=50, choices=EVENT_TYPES)
    tx_hash = models.CharField(max_length=66)
    block_number = models.PositiveBigIntegerField()
    log_data = models.JSONField()
    timestamp = models.DateTimeField()


class SmartContract(models.Model):
    contract_address = models.CharField(max_length=42, unique=True)
    abi = models.JSONField()
    bytecode = models.TextField()
    deployed_at = models.DateTimeField(auto_now_add=True)
