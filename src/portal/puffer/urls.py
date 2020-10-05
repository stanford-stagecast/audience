from django.urls import path, re_path
from django.contrib.staticfiles.storage import staticfiles_storage
from django.views.generic.base import RedirectView
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('favicon.ico/', RedirectView.as_view(
         url=staticfiles_storage.url('puffer/dist/images/favicon.ico')),
         name='favicon'),
    path('player/', views.player, name='player'),
    path('faq/', views.faq, name='faq'),
    path('terms/', views.terms, name='terms'),
    path('results/', views.results, name='results'),
    re_path(r'^results/(?P<input_date>[0-9]{4}-[0-9]{2}-[0-9]{2})/$',
            views.results, name='results'),
    path('data-description/', views.data_description, name='data-description'),
    path('error_reporting/', views.error_reporting, name='error_reporting'),
]
