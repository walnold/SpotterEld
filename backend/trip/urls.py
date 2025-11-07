from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import TripViewSet, ActivityViewSet, ActivityCategoryViewSet, RegisterView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'trips', TripViewSet, basename='trip')
router.register(r'activities', ActivityViewSet, basename='activity')
router.register(r'activity-categories', ActivityCategoryViewSet, basename='activitycategory')

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='auth_register'),
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
]
