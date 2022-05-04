
from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register("post", views.PostViewSet, basename="post")
router.register("product", views.ProductViewSet, basename="product")

urlpatterns = [
    path('', include(router.urls)),
    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
]
