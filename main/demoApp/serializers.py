from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Post, Product, Tag


class TagSerializer(ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"


class PostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = ["id", "created_date", "updated_date", "title",
                  "description", "author"]


class PostDetailSerializer(PostSerializer):
    tags = TagSerializer(many=True)

    class Meta:
        model = PostSerializer.Meta.model
        fields = PostSerializer.Meta.fields + \
                ["products", "tags", "creators", "shared", "auctioneers"]


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
