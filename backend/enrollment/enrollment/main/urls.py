from django.urls import path

from . import views

urlpatterns = [
    path('enroll/', views.enroll_endpoint),
    path('<slug:username>/courses/', views.get_courses),
]
