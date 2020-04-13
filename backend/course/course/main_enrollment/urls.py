from django.urls import path

from . import views

urlpatterns = [
    path('user/<slug:username>/', views.get_courses),
    path('', views.enroll_endpoint),
]
