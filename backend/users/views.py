from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import RegisterSerializer
from .models import User
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser

class MeView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

class LeaderboardView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_queryset(self):
        # Ordenar por puntos descendente (-points) y traer solo los top 10
        return User.objects.order_by('-points')[:10]
    
class StudentListView(generics.ListAPIView):
    # Solo permitimos entrar a usuarios con permiso de "Staff" (Profesores/Admins)
    permission_classes = [IsAdminUser] 
    serializer_class = UserSerializer
    queryset = User.objects.filter(is_staff=False) # Traemos solo alumnos, no otros profes