from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Trip, Activity, ActivityCategory

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    pass

@admin.register(Trip)
class TripAdmin(admin.ModelAdmin):
    list_display = ('id','user','origin','destination','created_at')
    list_filter = ('created_at','user')

@admin.register(ActivityCategory)
class ActivityCategoryAdmin(admin.ModelAdmin):
    list_display = ('id','category')

@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('id','trip','location','started_at','ended_at','created_at')
    list_filter = ('created_at','category')
