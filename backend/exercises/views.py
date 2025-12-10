from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from .models import Exercise, ExerciseCompletion
from .serializers import ExerciseSerializer
from .models import Language, Topic # <--- Agregar Topic
from .serializers import LanguageSerializer # <--- Agregar

class LanguageList(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        languages = Language.objects.all()
        serializer = LanguageSerializer(languages, many=True)
        return Response(serializer.data)
    
# Vista para listar ejercicios
class ExerciseList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        topic_id = request.query_params.get('topic') # Leemos ?topic=1 de la URL
        
        if topic_id:
            exercises = Exercise.objects.filter(topic_id=topic_id)
        else:
            exercises = Exercise.objects.all()
            
        serializer = ExerciseSerializer(exercises, many=True)
        return Response(serializer.data)

# Vista para detalle de ejercicio
class ExerciseDetail(generics.RetrieveAPIView):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer

# Vista para completar ejercicio (Lógica Gamificada + Repaso)
class CompleteExercise(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, exercise_id):
        user = request.user

        # 1. Validar que el ejercicio existe
        try:
            exercise = Exercise.objects.get(id=exercise_id)
        except Exercise.DoesNotExist:
            return Response({"detail": "Ejercicio no encontrado"}, status=404)

        # --- LÓGICA DE REPASO (Evita Error 500 y da Puntos) ---
        
        # Verificamos si ya existe el registro
        completion = ExerciseCompletion.objects.filter(user=user, exercise=exercise).first()
        
        points_to_award = 0
        message = ""

        if completion:
            # CASO: REPASO (Ya existe)
            # Damos la mitad de los puntos (división entera //)
            points_to_award = exercise.points_reward // 2
            message = "¡Repaso completado! (Mitad de XP)"
            
            # Actualizamos la fecha para saber que lo acaba de hacer
            completion.save() 
            
        else:
            # CASO: PRIMERA VEZ (No existe)
            # Damos puntos completos
            points_to_award = exercise.points_reward
            message = "¡Ejercicio completado!"
            
            # Creamos el registro en BD
            ExerciseCompletion.objects.create(user=user, exercise=exercise)

        # ----------------------------------

        # 2. Sumar los puntos
        user.points += points_to_award
        
        # 3. Calcular Nivel (100 XP = 1 Nivel)
        previous_level = user.level
        new_level = (user.points // 100) + 1
        
        level_up = False
        if new_level > previous_level:
            user.level = new_level
            level_up = True
        
        # 4. Sistema de Insignias
        current_badges = user.badges.split(",") if user.badges else []
        
        # Insignia: Primera Sangre
        if user.points >= 10 and "first_blood" not in current_badges:
            current_badges.append("first_blood")
        
        # Insignia: Cazador (100 pts)
        if user.points >= 100 and "hunter" not in current_badges:
            current_badges.append("hunter")

        # Insignia: Nivel 2
        if user.level >= 2 and "level_2" not in current_badges:
            current_badges.append("level_2")

        user.badges = ",".join(current_badges)
        user.save()

        return Response({
            "detail": message, 
            "puntos_ganados": points_to_award,
            "total_puntos": user.points,
            "nuevo_nivel": user.level,
            "subio_nivel": level_up,
            "badges": current_badges
        })