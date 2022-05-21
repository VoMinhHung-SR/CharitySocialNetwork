from rest_framework import permissions


class CommentOwnerPerms(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, comment):

        return request.user == comment.user


class SharingOwnerPerms(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        return request.user.pk == obj.user.pk


class AuctioneersPerms(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        return request.user == obj.user


class PostOwnerPerms(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        return request.user == obj.author


class OwnerProfilePerms(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        return obj.pk == request.user.pk

