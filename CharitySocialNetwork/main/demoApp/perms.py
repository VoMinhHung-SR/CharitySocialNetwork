from rest_framework import permissions

from .models import User, Post


class CommentOwnerPerms(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, comment):
        """
        Return `True` if permission is granted, `False` otherwise.
        """

        return request.user == comment.user


class AuctioneersPerms(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        return request.user == obj.user


class PostOwnerPerms(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        return request.user == obj.author


class OwnerProfilePerms(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        return obj.pk == request.user.pk

