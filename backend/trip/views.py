from rest_framework import viewsets, generics, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Trip, Activity, ActivityCategory, User
from .serializers import (
    TripSerializer, ActivitySerializer, ActivityCategorySerializer,
    UserSerializer, RegisterSerializer
)
from .permissions import IsOwnerOrReadOnly
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

# Registration endpoint
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer


class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all().order_by('-created_at')
    serializer_class = TripSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        # Optionally restrict list to current user's trips if query param ?mine=true
        qs = super().get_queryset()
        mine = self.request.query_params.get('mine')
        if mine and self.request.user.is_authenticated:
            return qs.filter(user=self.request.user)
        return qs


class ActivityCategoryViewSet(viewsets.ModelViewSet):
    queryset = ActivityCategory.objects.all()
    serializer_class = ActivityCategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all().order_by('-created_at')
    serializer_class = ActivitySerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        # ensure the trip belongs to the requesting user
        trip = serializer.validated_data.get('trip') or serializer.initial_data.get('trip')
        # If client passes trip as id, DRF will convert to model instance in validated_data.
        # Here we rely on the permission check and IsOwnerOrReadOnly on object-level, but better to check now:
        if isinstance(trip, int) or isinstance(trip, str):
            from .models import Trip
            trip = Trip.objects.get(pk=trip)
        if trip.user != self.request.user:
            raise PermissionError("Cannot add activities to someone else's trip.")
        serializer.save()
