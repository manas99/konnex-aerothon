from django.urls import path, include

urlpatterns = [
    path('users/', include('api.users.urls')),
    path('feedback/', include('api.feedback.urls')),
    path('announcements/', include('api.announcements.urls')),
    path('bugreports/', include('api.bugreports.urls')),
    path('tutorials/', include('api.tutorials.urls')),
    path('definitions/', include('api.definitions.urls')),
]
