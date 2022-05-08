from django.conf import settings
from rest_framework.views import APIView
from rest_framework import viewsets, generics
from .models import (Post, Product, Tag, Like,
                     Comment, User, Auction, Sharing,
                     Notification, FriendRequest)
from .serializers import (PostSerializer, ProductSerializer,
                          PostDetailSerializer, AuthPostDetailSerializer,
                          CommentSerializer, UserSerializer,
                          AuctionSerializer, SharingSerializer,
                          NotificationSerializer, FriendSuggestSerializer)
from .paginator import BasePagination
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from django.http import Http404
from rest_framework.parsers import MultiPartParser
from rest_framework.parsers import JSONParser
from .perms import (CommentOwnerPerms, PostOwnerPerms,
                    OwnerProfilePerms)


# Create your views here.
class UserViewSet(viewsets.ViewSet, generics.CreateAPIView,
                  generics.UpdateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    parser_classes = [JSONParser, MultiPartParser, ]

    def get_permissions(self):
        if self.action in ['get_current_user', 'get_notifications',
                           'send_friend_request', 'accept-friend-request']:
            return [permissions.IsAuthenticated()]
        if self.action in ['update', 'partial_update']:
            return [OwnerProfilePerms()]
        return [permissions.AllowAny()]

    @action(methods=['get'], detail=False, url_path='current-user')
    def get_current_user(self, request):
        return Response(self.serializer_class(request.user).data)

    @action(methods=['get'], detail=True, url_path='notifications')
    def get_notifications(self, request, pk):
        message = Notification.objects.filter(user=request.user)
        return Response(NotificationSerializer(message, many=True).data,
                        status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True, url_path='send-friend-request')
    def send_friend_request(self, request, pk):
        try:
            from_user = request.user
            to_user = User.objects.get(id=pk)
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            friend_request, created = FriendRequest.objects.get_or_create(from_user=from_user,
                                                                          to_user=to_user)
            if created:
                return Response(status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['post'], detail=True, url_path='accept-friend-request')
    def accept_friend_request(self, request, pk):
        try:
            # Who needs to accept a friend request
            friend_request = FriendRequest.objects.get(from_user_id=pk)
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            if friend_request.to_user == request.user:
                # B send to A; A accept : to_user is A, from_user is B
                # After accept A is a friend with B
                friend_request.to_user.friends.add(friend_request.from_user)
                friend_request.from_user.friends.add(friend_request.to_user)
                friend_request.delete()
                return Response(status=status.HTTP_200_OK)

            return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['get'], detail=True, url_path='friend-suggest')
    def get_friend_suggest(self, request, pk):
        try:
            friend_suggest = User.objects.filter(is_active=True) \
                .exclude(id=pk)
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            if friend_suggest:
                return Response(FriendSuggestSerializer(friend_suggest, many=True).data,
                                status=status.HTTP_200_OK)

            return Response(status=status.HTTP_400_BAD_REQUEST)


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
        if self.action in ['add_comment', 'like',
                           'auction', 'sharing',
                           'show_post', 'hide_post']:
            return [permissions.IsAuthenticated()]
        if self.action in ['destroy', 'update',
                           'partial_update']:
            return [PostOwnerPerms()]
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

    @action(methods=['get'], detail=True, url_path='comments')
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

    # @action(methods=['post'], detail=True, url_path='like')
    # def do_action(self, request, pk):
    #     try:
    #         action_type = int(request.data['type'])
    #         if action_type != 0 | action_type != 1:
    #             return Response(status=status.HTTP_400_BAD_REQUEST)
    #     except IndexError | ValueError:
    #         return Response(status=status.HTTP_400_BAD_REQUEST)
    #     else:
    #         act, _ = Action.objects.update_or_create(type=action_type,
    #                                                  creator=request.user,
    #                                                  post=self.get_object())
    #
    #         return Response(ActionSerializer(act).data,
    #                         status=status.HTTP_200_OK)

    @action(methods=['post'], url_path='like', detail=True)
    def like(self, request, pk):
        post = self.get_object()
        user = request.user

        l, _ = Like.objects.get_or_create(post=post, creator=user)
        l.active = not l.active
        try:
            l.save()
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(data=AuthPostDetailSerializer(post, context={'request': request}).data,
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

    # Chưa thử nghiệm
    @action(methods=['post'], detail=True, url_path='hide')
    def hide_post(self, request, pk):
        try:
            p = Post.objects.get(pk=pk)
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            p.active = False
            p.save()
            return Response(status=status.HTTP_200_OK)

    # Chưa thử nghiệm
    @action(methods=['post'], detail=True, url_path='show')
    def show_post(self, request, pk):
        try:
            p = Post.objects.get(pk=pk)
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            p.active = True
            p.save()
            return Response(status=status.HTTP_200_OK)


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
        if self.action in ['update', 'partial_update', 'destroy']:
            return [CommentOwnerPerms()]

        return [permissions.IsAuthenticated()]


# OAUTH2-INFO
class AuthInfo(APIView):
    def get(self, request):
        return Response(settings.OAUTH2_INFO, status=status.HTTP_200_OK)
