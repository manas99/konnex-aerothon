from django.urls import path, include

urlpatterns = [
    path('users/', include('api.users.urls')),
    path('feedback/', include('api.feedback.urls')),
    path('announcements/', include('api.announcements.urls')),
]
