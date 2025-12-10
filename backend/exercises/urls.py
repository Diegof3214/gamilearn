from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import LanguageList, ExerciseList, ExerciseDetail, CompleteExercise


urlpatterns = [
    path('admin/', admin.site.urls),

    # Autenticación JWT
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Usuarios
    path('api/users/', include('users.urls')),

    # Ejercicios
    path('languages/', LanguageList.as_view()),
    path("", ExerciseList.as_view()),        # GET /api/exercises/
    path("<int:pk>/", ExerciseDetail.as_view()),  # GET /api/exercises/1/
    path('<int:exercise_id>/complete/', CompleteExercise.as_view()),
]

