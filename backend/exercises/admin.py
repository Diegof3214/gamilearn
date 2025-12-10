from django.contrib import admin
from .models import Language, Topic, Exercise, ExerciseCompletion

@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    list_display = ('name', 'icon')

@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = ('name', 'language', 'order')
    list_filter = ('language',) # Filtro lateral útil

@admin.register(Exercise)
class ExerciseAdmin(admin.ModelAdmin):
    list_display = ('title', 'topic', 'points_reward')
    list_filter = ('topic__language', 'topic') # Filtros mágicos para navegar

admin.site.register(ExerciseCompletion)