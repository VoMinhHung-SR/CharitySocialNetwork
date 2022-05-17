
from django.urls import path, include
from . import views
from rest_framework import routers
from .admin import admin_site

router = routers.DefaultRouter()
router.register("posts", views.PostViewSet, basename="post")
router.register("users", views.UserViewSet, basename="user")
router.register("comments", views.CommentViewSet, basename="comment")
router.register("auctions", views.AuctionViewSet, basename="auction")
router.register("tags", views.TagViewSet, basename="tag")
router.register("sharing", views.SharingViewSet, basename="sharing")
urlpatterns = [
    path('', include(router.urls)),
    path('oauth2-info/', views.AuthInfo.as_view()),
    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('admin/', admin_site.urls),
]
