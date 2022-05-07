from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import (Post, Product, Tag,
                     Action, Comment, User,
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
        user = User(**validated_data)
        user = user.set_password(user.password)
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


class PostSerializer(ModelSerializer):
    tags = TagSerializer(many=True)

    class Meta:
        model = Post
        fields = ["id", "created_date", "updated_date", "title",
                  "description", "author", "tags"]


class ProductSerializer(ModelSerializer):
    image = SerializerMethodField()

    def get_image(self, product):
        request = self.context['request']
        name = product.image.name
        if name.startswith('static/'):
            path = '/%s' % name
        else:
            path = '/static/%s' % name
        return request.build_absolute_uri(path)

    class Meta:
        model = Product
        fields = ['id', 'name', 'image', 'category']


class PostDetailSerializer(PostSerializer):
    tags = TagSerializer(many=True)

    class Meta:
        model = PostSerializer.Meta.model
        fields = PostSerializer.Meta.fields + \
                 ["product", "creators_comment", "people_shared", "auctioneers"]


class ActionSerializer(ModelSerializer):
    class Meta:
        model = Action
        fields = ['id', 'type', 'created_date']


class AuctionSerializer(ModelSerializer):
    class Meta:
        model = Auction
        fields = ['id', 'price', 'user', 'post', 'created_date']


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