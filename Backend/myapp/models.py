from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils import timezone
from django.db.models import JSONField


class User(AbstractUser):
    USER_TYPES = (
        ("VOLUNTEER", "Volunteer"),
        ("NGO", "Non-Profit Organization"),
        ("BENEFICIARY", "Person in Need"),
    )
    user_type = models.CharField(max_length=20, choices=USER_TYPES)
    wallet_address = models.CharField(max_length=42, unique=True)  # Ethereum-compatible
    profile_picture = models.URLField()  # IPFS URL
    tfa_enabled = models.BooleanField(default=False)
    last_activity = models.DateTimeField(auto_now=True)
    groups = models.ManyToManyField(Group, related_name="custom_user_set")
    user_permissions = models.ManyToManyField(
        Permission, related_name="custom_user_set"
    )

    class Meta:
        indexes = [
            models.Index(fields=["user_type"]),
            models.Index(fields=["wallet_address"]),
        ]


class VolunteerProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="volunteer_profile"
    )
    total_impact = models.JSONField(default=dict)  # {'meals': 150, 'lives_saved': 5}
    giving_history = models.JSONField(default=list)
    social_connections = models.ManyToManyField("self", symmetrical=False)


class NGOProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="ngo_profile"
    )
    verification_status = models.CharField(
        max_length=20,
        choices=[
            ("PENDING", "Pending"),
            ("VERIFIED", "Verified"),
            ("SUSPENDED", "Suspended"),
        ],
    )
    transparency_score = models.FloatField(default=0.0)
    operational_regions = JSONField(default=list)
    collaboration_network = models.ManyToManyField("self", through="NGOCollaboration")


class PersonInNeedProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="beneficiary_profile"
    )
    anonymous_id = models.UUIDField(unique=True)
    location_hash = models.CharField(max_length=64)  # Geohash
    privacy_settings = models.JSONField(default=dict)


class Mission(models.Model):
    URGENCY_LEVELS = [
        ("CRITICAL", "Urgent"),
        ("HIGH", "High"),
        ("MODERATE", "Moderate"),
    ]

    creator_ngo = models.ForeignKey(
        NGOProfile, null=True, blank=True, on_delete=models.SET_NULL
    )
    creator_beneficiary = models.ForeignKey(
        PersonInNeedProfile, null=True, blank=True, on_delete=models.SET_NULL
    )
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=50)
    subcategory = models.CharField(max_length=50)
    target_amount = models.DecimalField(max_digits=20, decimal_places=2)
    currency = models.CharField(max_length=3, default="USD")
    milestones = (
        models.JSONField()
    )  # {phase1: {target: 5000, description: "Procure supplies"}}
    smart_contract = models.ForeignKey("SmartContract", on_delete=models.PROTECT)
    urgency_score = models.FloatField()  # AI-generated
    geofence = models.JSONField()  # GeoJSON polygon
    verification_template = models.JSONField()  # Required proof types
    created_at = models.DateTimeField(auto_now_add=True)
    deadline = models.DateTimeField()

    class Meta:
        indexes = [
            models.Index(fields=["urgency_score"]),
            models.Index(fields=["deadline"]),
        ]


class MissionMedia(models.Model):
    mission = models.ForeignKey(Mission, related_name="media", on_delete=models.CASCADE)
    ipfs_hash = models.CharField(max_length=46)
    media_type = models.CharField(
        max_length=20,
        choices=[("IMAGE", "Image"), ("VIDEO", "Video"), ("DOCUMENT", "Document")],
    )
    timestamp = models.DateTimeField()
    geotag = models.JSONField(null=True)
    beneficiary_proof = models.BooleanField(default=False)
    ngo_verified = models.BooleanField(default=False)


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

    mission = models.ForeignKey(Mission, on_delete=models.PROTECT)
    sender = models.ForeignKey(
        "users.User", related_name="sent_txs", on_delete=models.PROTECT
    )
    receiver = models.ForeignKey(
        "users.User", related_name="received_txs", on_delete=models.PROTECT
    )
    tx_hash = models.CharField(max_length=66, unique=True)
    block_number = models.PositiveBigIntegerField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    escrow_release_conditions = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(null=True)
    amount = models.DecimalField(max_digits=20, decimal_places=2)
    method = models.CharField(max_length=3, choices=Methods.choices)
    stage = models.IntegerField(choices=Stages.choices)
    metadata = JSONField()
    beneficiary_proof = models.CharField(max_length=46, blank=True)
    network = models.CharField(max_length=20)
    impact_percentage = models.FloatField(default=0.0)

    class Meta:
        indexes = [
            models.Index(fields=["donor", "status"]),
            models.Index(fields=["tx_hash"]),
        ]

    def save(self, *args, **kwargs):
        if not self.pk:  # Initial save
            self.stages_log = [
                {"stage": self.Stage.INITIATED, "timestamp": self.created_at}
            ]
        super().save(*args, **kwargs)


class BeneficiaryRequest(models.Model):
    STATUS_CHOICES = [
        ("DRAFT", "Draft"),
        ("SUBMITTED", "Submitted"),
        ("APPROVED", "Approved"),
        ("REJECTED", "Rejected"),
        ("FUNDED", "Fully Funded"),
    ]

    beneficiary = models.ForeignKey(PersonInNeedProfile, on_delete=models.CASCADE)
    ngo = models.ForeignKey(
        NGOProfile, null=True, blank=True, on_delete=models.SET_NULL
    )
    mission = models.OneToOneField(
        Mission, null=True, blank=True, on_delete=models.SET_NULL
    )
    title = models.CharField(max_length=200)
    needs = models.JSONField()  # [{"item": "Medical supplies", "quantity": 10}]
    media_hashes = JSONField(default=list)  # IPFS hashes
    urgency_ai_score = models.FloatField()
    location_geohash = models.CharField(max_length=12)
    anonymity_level = models.CharField(
        max_length=20,
        choices=[
            ("FULL", "Fully Anonymous"),
            ("REGIONAL", "Regional Visibility"),
            ("VERIFIED_ONLY", "Visible to Verified NGOs"),
        ],
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Feedback(models.Model):
    mission = models.ForeignKey(Mission, on_delete=models.CASCADE)
    beneficiary = models.ForeignKey(PersonInNeedProfile, on_delete=models.CASCADE)
    rating = models.PositiveSmallIntegerField()
    testimonial = models.TextField()
    media_hashes = JSONField(default=list)
    tx_proof = models.CharField(max_length=66)  # Blockchain proof
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


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
    user = models.ForeignKey("users.User", on_delete=models.CASCADE)
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


class ImpactReport(models.Model):
    user = models.ForeignKey("users.User", on_delete=models.CASCADE)
    report_hash = models.CharField(max_length=66)
    pdf_url = models.URLField()

    mission = models.ForeignKey(Mission, on_delete=models.CASCADE)
    report_type = models.CharField(
        max_length=20,
        choices=[
            ("MONTHLY", "Monthly Summary"),
            ("MISSION", "Per-Mission"),
            ("CUSTOM", "Custom Range"),
        ],
    )
    visualization_data = models.JSONField()  # 3D/AR parameters
    pdf_ipfs_hash = models.CharField(max_length=46)
    metrics = (
        models.JSONField()
    )  # {"people_helped": 150, "malnutrition_reduction": "12%"}
    generated_at = models.DateTimeField(auto_now_add=True)


class SmartContract(models.Model):
    contract_type = models.CharField(
        max_length=20,
        choices=[
            ("ESCROW", "Escrow Management"),
            ("BADGE", "Badge Issuance"),
            ("VERIFICATION", "Proof Verification"),
        ],
    )
    address = models.CharField(max_length=42, unique=True)
    abi = models.JSONField()
    bytecode = models.TextField()
    compiler_version = models.CharField(max_length=20)
    network = models.CharField(max_length=20)  # Sepolia, Mainnet, etc.
    deployed_at = models.DateTimeField(auto_now_add=True)


class NGOCollaboration(models.Model):
    ngo1 = models.ForeignKey(
        NGOProfile, related_name="collaborations_initiated", on_delete=models.CASCADE
    )
    ngo2 = models.ForeignKey(
        NGOProfile, related_name="collaborations_received", on_delete=models.CASCADE
    )
    mission = models.ForeignKey(Mission, on_delete=models.CASCADE)
    terms_hash = models.CharField(max_length=66)  # IPFS hash of collaboration agreement
    created_at = models.DateTimeField(auto_now_add=True)


class AIAnalysis(models.Model):
    mission = models.ForeignKey(Mission, on_delete=models.CASCADE)
    analysis_type = models.CharField(
        max_length=20,
        choices=[
            ("URGENCY", "Urgency Scoring"),
            ("FRAUD", "Fraud Detection"),
            ("IMPACT", "Impact Prediction"),
        ],
    )
    input_data = models.JSONField()
    output_data = models.JSONField()
    model_version = models.CharField(max_length=20)
    executed_at = models.DateTimeField(auto_now_add=True)
