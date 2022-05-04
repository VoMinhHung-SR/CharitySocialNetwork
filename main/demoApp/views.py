from rest_framework import viewsets, generics
from .models import Post, Product
from .serializers import (PostSerializer, ProductSerializer,
                          PostDetailSerializer)
from .paginator import BasePagination

# Create your views here.


class PostViewSet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    serializer_class = PostSerializer
    pagination_class = BasePagination

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
