from django.urls import path

from . import views

urlpatterns = [
    path('<int:pk>/', views.course_id_endpoint),
    path('', views.course_endpoint),
]
