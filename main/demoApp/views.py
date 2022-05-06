from django.conf import settings
from rest_framework.views import APIView
from rest_framework import viewsets, generics
from .models import (Post, Product, Tag, Action,
                     Comment, User, Auction, Sharing)
from .serializers import (PostSerializer, ProductSerializer,
                          PostDetailSerializer, ActionSerializer,
                          CommentSerializer, UserSerializer,
                          AuctionSerializer, SharingSerializer)
from .paginator import BasePagination
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from django.http import Http404
from rest_framework.parsers import MultiPartParser
from rest_framework.parsers import JSONParser
from .perms import CommentOwnerPerms


# Create your views here.
class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action in ['get_current_user']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    @action(methods=['get'], detail=False, url_path='current-user')
    def get_current_user(self, request):
        return Response(self.serializer_class(request.user).data)

    # Chưa thử nghiệm
    @action(methods=['get'], detail=True, url_path='notifications')
    def get_notifications(self, request, pk):
        pass


class PostViewSet(viewsets.ViewSet, generics.ListAPIView,
                  generics.RetrieveAPIView, generics.UpdateAPIView,
                  generics.DestroyAPIView):
    serializer_class = PostSerializer
    pagination_class = BasePagination
    parser_classes = [JSONParser, MultiPartParser, ]

    def get_queryset(self):
        post = Post.objects.filter(active=True)

        q = self.request.query_params.get('q')
        if q is not None:
            post = post.filter(title__icontains=q)

        post_id = self.request.query_params.get('author_id')
        if post_id is not None:
            post = post.filter(author=post_id)

        return post

    def get_serializer_class(self):
        if self.action in ['retrieve']:
            return PostDetailSerializer
        return self.serializer_class

    def get_permissions(self):
        if self.action in ['add_comment', 'do_action',
                           'auction', 'sharing']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    @action(methods=['post'], detail=True, url_path='tags')
    def add_tags(self, request, pk):
        try:
            post = self.get_object()
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:

            tags = request.data.get('tags')

            if tags is not None:
                for tag in tags:
                    tag_obj, _ = Tag.objects.get_or_create(name=tag)
                    post.tags.add(tag_obj)
                post.save()
                return Response(data=PostDetailSerializer(post).data,
                                status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['get'], detail=True, url_path='get-comment')
    def get_comments(self, request, pk):
        post = self.get_object()
        comments = post.comments.select_related('user').filter(active=True)

        return Response(CommentSerializer(comments, many=True).data,
                        status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True, url_path='add-comment')
    def add_comment(self, request, pk):
        try:
            content = request.data.get('content')
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            if content:
                c = Comment.objects.create(content=content,
                                           user=request.user,
                                           post=self.get_object())
                return Response(CommentSerializer(c).data,
                                status=status.HTTP_201_CREATED)

            return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['post'], detail=True, url_path='like')
    def do_action(self, request, pk):
        try:
            action_type = int(request.data['type'])
        except IndexError | ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            act = Action.objects.update_or_create(type=action_type,
                                                  creator=request.user,
                                                  post=self.get_object())

            return Response(ActionSerializer(act).data,
                            status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True, url_path='auction')
    def auction(self, request, pk):
        try:
            price = int(request.data['price'])
        except IndexError | ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            act = Auction.objects.update_or_create(price=price,
                                                   user=request.user,
                                                   post=self.get_object())

            return Response(AuctionSerializer(act).data,
                            status=status.HTTP_200_OK)

    # Chưa thử nghiệm
    @action(methods=['post'], detail=True, url_path='sharing')
    def sharing(self, request, pk):
        try:
            post = self.get_object()
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            description = request.data.get('description')
            tags = request.data.get('tags')

            if tags is not None:
                people_shared = Sharing.objects.create(description=description,
                                                       user=request.user,
                                                       post=post)
                for tag in tags:
                    tag_obj, _ = Tag.objects.get_or_create(name=tag)
                    people_shared.tags.add(tag_obj)
                people_shared.save()

                return Response(SharingSerializer(people_shared).data,
                                status=status.HTTP_200_OK)
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ProductViewSet(viewsets.ViewSet, generics.ListAPIView):
    serializer_class = ProductSerializer
    pagination_class = BasePagination

    def get_queryset(self):
        product = Product.objects.filter(active=True)

        q = self.request.query_params.get('q')
        if q is not None:
            product = product.filter(name__icontains=q)

        cate_id = self.request.query_params.get('category_id')
        if cate_id is not None:
            product = product.filter(category=cate_id)

        return product


class CommentViewSet(viewsets.ViewSet, generics.DestroyAPIView,
                     generics.UpdateAPIView):
    queryset = Comment.objects
    serializer_class = CommentSerializer
    permission_classes = permissions.IsAuthenticated()
    parser_classes = [MultiPartParser, ]

    def get_permissions(self):
        if self.action in ['update', 'destroy']:
            return [CommentOwnerPerms()]

        return [permissions.IsAuthenticated()]


# OAUTH2-INFO
class AuthInfo(APIView):
    def get(self, request):
        return Response(settings.OAUTH2_INFO, status=status.HTTP_200_OK)
