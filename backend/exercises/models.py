from django.db import models

# 1. Modelo para el LENGUAJE (Ej: Python, JavaScript, Java)
class Language(models.Model):
    name = models.CharField(max_length=50) # Ej: Python
    icon = models.CharField(max_length=10, default="🐍") # Emoji o URL de icono
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

# 2. Modelo para el TEMA (Ej: Variables, Condicionales, Bucles)
class Topic(models.Model):
    name = models.CharField(max_length=100) # Ej: Introducción
    language = models.ForeignKey(Language, on_delete=models.CASCADE, related_name='topics')
    order = models.IntegerField(default=1) # Para ordenar: Tema 1, Tema 2...
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.language.name} - {self.name}"

# 3. Modelo EJERCICIO (Actualizado)
class Exercise(models.Model):
    # --- CONEXIÓN NUEVA ---
    # Vinculamos el ejercicio a un Tema específico
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='exercises', null=True, blank=True)
    
    # --- Datos del Ejercicio (Lo que ya tenías) ---
    title = models.CharField(max_length=255, default="Nuevo Ejercicio")
    points_reward = models.IntegerField(default=10)
    question = models.TextField()
    choice_a = models.CharField(max_length=255)
    choice_b = models.CharField(max_length=255)
    choice_c = models.CharField(max_length=255)
    correct_answer = models.CharField(max_length=1)
    explanation = models.TextField(default="Respuesta correcta", blank=True)

    def __str__(self):
        return self.title

# 4. Modelo COMPLETADO (Sin cambios, solo para referencia)
from users.models import User
class ExerciseCompletion(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    completed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'exercise')