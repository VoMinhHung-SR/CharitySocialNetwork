from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import (Post, Tag, Comment, User,
                     Auction, Sharing, Notification)
from rest_framework import serializers


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "username", "password",
                  "email", "phone_number", "address", "date_of_birth",
                  "date_joined", "gender", "avatar"]
        extra_kwargs = {
            'password': {'write_only': 'true'}
        }

    def create(self, validated_data):
        data = validated_data.copy()
        user = User(**data)
        user.set_password(user.password)
        user.save()

        return user

    avatar = serializers.SerializerMethodField(source='avatar')

    def get_avatar(self, obj):
        request = self.context['request']
        if obj.avatar and not obj.avatar.name.startswith("/static"):
            path = '/static/%s' % obj.avatar.name

            return request.build_absolute_uri(path)


class TagSerializer(ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name"]


class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'content', 'created_date']


class AuctionSerializer(ModelSerializer):
    class Meta:
        model = Auction
        fields = ['id', 'price', 'user', 'post']


class AuthorSerializer(ModelSerializer):
    avatar = serializers.SerializerMethodField(source='avatar')

    def get_avatar(self, obj):
        request = self.context['request']
        if obj.avatar and not obj.avatar.name.startswith("/static"):
            path = '/static/%s' % obj.avatar.name

            return request.build_absolute_uri(path)

    class Meta:
        model = User
        fields = ['id', 'username', 'avatar']


class PostSerializer(ModelSerializer):
    tags = TagSerializer(many=True)
    image = serializers.SerializerMethodField(source='image')
    author = AuthorSerializer()

    class Meta:
        model = Post
        fields = ["id", "title", "description", "image",
                  "created_date", "updated_date", "author", "tags"]

    def get_image(self, obj):
        request = self.context['request']
        if obj.image and not obj.image.name.startswith("/static"):
            path = '/static/%s' % obj.image.name

            return request.build_absolute_uri(path)


class PostDetailSerializer(PostSerializer):
    tags = TagSerializer(many=True)
    author = AuthorSerializer()
    class Meta:
        model = PostSerializer.Meta.model
        fields = PostSerializer.Meta.fields + ["creators_comment", "people_shared", "auctioneers"]


class AuthPostDetailSerializer(PostDetailSerializer):
    like = serializers.SerializerMethodField()

    def get_like(self, post):
        request = self.context.get('request')
        if request:
            return post.actions.filter(creator=request.user, active=True).exists()

    class Meta:
        model = Post
        fields = PostDetailSerializer.Meta.fields + ['like']


class SharingSerializer(ModelSerializer):
    tags = TagSerializer(many=True)

    class Meta:
        model = Sharing
        fields = ['id', 'description', 'user', 'post', 'tags']


class NotificationSerializer(ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'message', 'created_date']


class FriendSuggestSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'avatar']
