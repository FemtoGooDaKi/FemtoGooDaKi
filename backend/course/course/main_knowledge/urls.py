from django.urls import path

from . import views

urlpatterns = [
    path('<int:pk>/', views.knowledge_id_endpoint),
    path('', views.knowledge_endpoint),
]
