from django.urls import path, include

from . import views

urlpatterns = [
    path('', views.UdisDollarPageView.as_view(), name='home_view'),
    path('query_udis_dollar', views.UdisDollarView.as_view(),
         name='query_udis_dollar')
]
