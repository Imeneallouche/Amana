# Generated by Django 5.1.7 on 2025-03-14 23:07

import django.contrib.auth.models
import django.contrib.auth.validators
import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Badge',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('badge_id', models.PositiveIntegerField(unique=True)),
                ('badge_type', models.CharField(choices=[('VOLUNTEER', 'Volunteer'), ('NGO', 'Organization'), ('BENEFICIARY', 'Beneficiary')], max_length=20)),
                ('criteria', models.JSONField()),
                ('image_ipfs_hash', models.CharField(max_length=46)),
                ('description', models.TextField()),
                ('ipfs_media', models.CharField(max_length=46)),
                ('network', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('phone_number', models.CharField(max_length=20, unique=True)),
                ('localisation', models.CharField(blank=True, max_length=255, null=True)),
                ('groups', models.ManyToManyField(blank=True, related_name='custom_user_set', to='auth.group')),
                ('user_permissions', models.ManyToManyField(null=True, related_name='custom_user_permissions_set', to='auth.permission')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='NGO',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='myapp.user')),
                ('description', models.TextField()),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('myapp.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Volunteer',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='myapp.user')),
                ('transaction_history', models.JSONField(default=list)),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('myapp.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='UserAchievement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('missions_joined', models.PositiveIntegerField(default=0)),
                ('total_donated', models.DecimalField(decimal_places=2, max_digits=20)),
                ('lives_saved', models.PositiveIntegerField(default=0)),
                ('people_fed', models.PositiveIntegerField(default=0)),
                ('education_impact', models.PositiveIntegerField(default=0)),
                ('last_updated', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.user')),
            ],
        ),
        migrations.CreateModel(
            name='UserBadge',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('award_tx', models.CharField(max_length=66)),
                ('awarded_at', models.DateTimeField(auto_now_add=True)),
                ('badge', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.badge')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.user')),
            ],
        ),
        migrations.CreateModel(
            name='PersonInNeed',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='myapp.user')),
                ('associated_ngo', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='myapp.ngo')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('myapp.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='HelpRequest',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('needs_list', models.JSONField(default=list)),
                ('category', models.CharField(choices=[('Health', 'Health'), ('Food', 'Food'), ('Education', 'Education')], max_length=50)),
                ('description', models.TextField()),
                ('required_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('location', models.CharField(blank=True, max_length=255, null=True)),
                ('urgency', models.CharField(blank=True, max_length=20, null=True)),
                ('proof_list', models.JSONField(default=list)),
                ('status', models.CharField(choices=[('Pending', 'Pending'), ('Approved', 'Approved'), ('Funding', 'Funding'), ('Completed', 'Completed')], max_length=50)),
                ('current_amount', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('ngo', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='myapp.ngo')),
                ('person_in_need', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='myapp.personinneed')),
            ],
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('method', models.CharField(choices=[('ETH', 'Ethereum'), ('PSR', 'Paysera'), ('BRM', 'Baridimob'), ('CCP', 'Ccp')], max_length=3)),
                ('stage', models.IntegerField(choices=[(0, 'Initialized'), (1, 'Validated'), (2, 'Included'), (3, 'Finalized')])),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('completed_at', models.DateTimeField(null=True)),
                ('status', models.CharField(choices=[('PENDING', 'Pending'), ('ESCROW', 'In Escrow'), ('RELEASED', 'Funds Released'), ('DISPUTED', 'Disputed'), ('REFUNDED', 'Refunded')], max_length=20)),
                ('beneficiary_proof', models.JSONField(default=list)),
                ('network', models.CharField(max_length=20)),
                ('impact_percentage', models.FloatField(default=0.0)),
                ('tx_hash', models.CharField(max_length=66, unique=True)),
                ('transaction_date', models.DateTimeField(auto_now_add=True)),
                ('arrival_date', models.DateTimeField(blank=True, null=True)),
                ('blockchain_hash', models.CharField(max_length=255)),
                ('send_block_id', models.CharField(max_length=255)),
                ('validation_block_id', models.CharField(max_length=255)),
                ('fund_arrival_date', models.DateTimeField(blank=True, null=True)),
                ('accomplishment_images', models.JSONField(default=list)),
                ('request', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.helprequest')),
                ('donor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.volunteer')),
            ],
        ),
    ]
