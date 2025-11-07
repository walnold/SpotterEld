from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Assumes the model instance has an `user` attribute for ownership (Trip).
    For Activity, ownership is determined via `trip.user`.
    """

    def has_object_permission(self, request, view, obj):
        # Read-only permissions are allowed for any request
        if request.method in permissions.SAFE_METHODS:
            return True

        # For Trip objects:
        user = getattr(obj, 'user', None)
        if user is not None:
            return obj.user == request.user

        # For Activity objects: check trip.user
        trip = getattr(obj, 'trip', None)
        if trip is not None:
            return trip.user == request.user

        return False
