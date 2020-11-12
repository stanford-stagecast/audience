from django.contrib import admin
from .models import AudienceFeedback, AudioFeedback, UserProfile

admin.site.register(AudienceFeedback)
admin.site.register(AudioFeedback)
admin.site.register(UserProfile)
