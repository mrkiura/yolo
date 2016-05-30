"""Defines custom permissions for use in the api."""
from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    """
    Object-level permission to only allow owners to
    CREATE, READ, UPDATE or DELETE objects.
    """

    def has_object_permission(self, request, view, obj):
        return obj.created_by == request.user.username
