from django.urls import path, re_path
from django.contrib.staticfiles.storage import staticfiles_storage
from django.views.generic.base import RedirectView
from django.conf import settings
from django.conf.urls.static import static

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('favicon.ico/', RedirectView.as_view(
         url=staticfiles_storage.url('dist/images/favicon.ico')),
         name='favicon'),
    path('player/', views.player, name='player'),
    path('feedback/', views.audience_feedback, name='feedback'),
    path('audiofeedback/', views.audio_feedback, name='audio_feedback'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)