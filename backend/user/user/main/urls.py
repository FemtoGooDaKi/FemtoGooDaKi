from django.urls import path

from . import views

urlpatterns = [
    path('user/<slug:username>/', views.user_endpoint),
    path('login/', views.login),
    path('register/', views.register),
]
