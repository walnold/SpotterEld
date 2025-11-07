from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

class User(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email
    

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    profile_picture = models.ImageField(upload_to='profiles/', null=True, blank=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"


class Trip(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='trips')
    origin = models.CharField(max_length=150)        # use origin instead of 'from'
    destination = models.CharField(max_length=150)   # use destination instead of 'to'
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.origin} → {self.destination}"


class ActivityCategory(models.Model):
    category = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.category


class Activity(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='activities')
    category = models.ForeignKey(ActivityCategory, on_delete=models.SET_NULL, null=True, related_name='activities')
    location = models.CharField(max_length=200)
    started_at = models.DateTimeField()
    ended_at = models.DateTimeField()
    lat = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    lng = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.location} ({self.category})"
