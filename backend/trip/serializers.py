from rest_framework import serializers
from .models import User, Trip, Activity, ActivityCategory
from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','email','first_name','last_name','phone','country')


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username','password','password2','email','first_name','last_name','phone','country')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2', None)
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class ActivityCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityCategory
        fields = '__all__'


class ActivitySerializer(serializers.ModelSerializer):
    category = ActivityCategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(queryset=ActivityCategory.objects.all(), source='category', write_only=True)

    class Meta:
        model = Activity
        fields = ('id','trip','location','started_at','ended_at','category','category_id','lat','lng','created_at')
        read_only_fields = ('id','created_at')


class TripSerializer(serializers.ModelSerializer):
    activities = ActivitySerializer(many=True, read_only=True)

    class Meta:
        model = Trip
        fields = ('id','user','origin','destination','created_at','activities')
        read_only_fields = ('id','user','created_at')
