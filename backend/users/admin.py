from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

# Registramos el usuario personalizado
@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'points', 'level', 'badges') # <--- Agrega badges aquí
    fieldsets = UserAdmin.fieldsets + (
        ('Gamificación', {'fields': ('points', 'level', 'badges')}), # <--- Y aquí
    )