from rest_framework import permissions

from .models import User


class CommentOwnerPerms(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, comment):
        """
        Return `True` if permission is granted, `False` otherwise.
        """

        return request.user == comment.user


class PostOwnerPerms(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        return request.user == obj.user


class OwnerProfilePerms(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        return obj.pk == request.user.pk

