from django.urls import path, re_path
from django.contrib.staticfiles.storage import staticfiles_storage
from django.views.generic.base import RedirectView
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('favicon.ico/', RedirectView.as_view(
         url=staticfiles_storage.url('dist/images/favicon.ico')),
         name='favicon'),
    path('player/', views.player, name='player'),
]
