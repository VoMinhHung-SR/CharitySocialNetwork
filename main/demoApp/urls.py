from rest_framework.routers import DefaultRouter
from django.urls import path, include
from . import views

router = DefaultRouter()

urlpatterns = [
    path('', views.index, name="index"),
    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
]
