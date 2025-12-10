from django.urls import path
from .views import MeView
from .views import MeView, RegisterView, LeaderboardView, StudentListView

urlpatterns = [
    path("me/", MeView.as_view()),
    path('register/', RegisterView.as_view()),
    path('leaderboard/', LeaderboardView.as_view()),
    path('students/', StudentListView.as_view()),
]
