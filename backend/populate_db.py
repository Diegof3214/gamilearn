import os
import django

# 1. Configurar entorno Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gamilearn.settings')
django.setup()

from exercises.models import Language, Topic, Exercise

# --- CONTENIDO CURRICULAR COMPLETO (4 Lenguajes, 5 Temas c/u) ---
CURRICULUM = [
    # ---------------- PYTHON ----------------
    {
        "name": "Python",
        "icon": "🐍",
        "desc": "Backend y Ciencia de Datos.",
        "topics": [
            {
                "name": "1. Sintaxis Básica",
                "questions": [
                    {"q": "¿Imprimir en consola?", "a": "echo", "b": "print()", "c": "log()", "correct": "B", "exp": "print() es la función de salida estándar."},
                    {"q": "¿Comentario de una línea?", "a": "//", "b": "/*", "c": "#", "correct": "C", "exp": "Python usa # para comentarios."},
                    {"q": "¿Extensión de archivo?", "a": ".py", "b": ".pt", "c": ".pi", "correct": "A", "exp": "Los scripts terminan en .py"},
                    {"q": "¿Bloques de código?", "a": "Llaves {}", "b": "Indentación", "c": "End", "correct": "B", "exp": "La sangría es obligatoria."},
                    {"q": "¿Asignar variable?", "a": "x = 5", "b": "int x = 5", "c": "var x = 5", "correct": "A", "exp": "Tipado dinámico, no declaras tipo."},
                    {"q": "¿Es Case Sensitive?", "a": "Sí", "b": "No", "c": "A veces", "correct": "A", "exp": "Distingue mayúsculas de minúsculas."}
                ]
            },
            {
                "name": "2. Variables y Tipos",
                "questions": [
                    {"q": "x = 10. Tipo:", "a": "float", "b": "int", "c": "str", "correct": "B", "exp": "Entero."},
                    {"q": "y = 3.14. Tipo:", "a": "double", "b": "float", "c": "decimal", "correct": "B", "exp": "Flotante."},
                    {"q": "Convertir string a entero:", "a": "int()", "b": "str()", "c": "parse()", "correct": "A", "exp": "Casteo con int()."},
                    {"q": "Booleano verdadero:", "a": "true", "b": "True", "c": "Verdadero", "correct": "B", "exp": "Debe iniciar con mayúscula."},
                    {"q": "Concatenar strings:", "a": "+", "b": ".", "c": "&", "correct": "A", "exp": "'Hola' + 'Mundo'."},
                    {"q": "Verificar tipo:", "a": "typeof()", "b": "type()", "c": "check()", "correct": "B", "exp": "Devuelve la clase del objeto."}
                ]
            },
            {
                "name": "3. Control de Flujo",
                "questions": [
                    {"q": "Condicional:", "a": "if", "b": "check", "c": "when", "correct": "A", "exp": "if, elif, else."},
                    {"q": "Distinto de:", "a": "!=", "b": "<>", "c": "not", "correct": "A", "exp": "Operador de desigualdad."},
                    {"q": "Y lógico:", "a": "&&", "b": "and", "c": "&", "correct": "B", "exp": "Palabra reservada 'and'."},
                    {"q": "Iterar secuencia:", "a": "for", "b": "loop", "c": "repeat", "correct": "A", "exp": "for item in secuencia."},
                    {"q": "Rango de números:", "a": "range()", "b": "list()", "c": "count()", "correct": "A", "exp": "Genera una secuencia numérica."},
                    {"q": "Detener bucle:", "a": "stop", "b": "break", "c": "exit", "correct": "B", "exp": "Sale del ciclo actual."}
                ]
            },
            {
                "name": "4. Listas y Tuplas",
                "questions": [
                    {"q": "Definir lista:", "a": "[]", "b": "()", "c": "{}", "correct": "A", "exp": "Corchetes para listas mutables."},
                    {"q": "Definir tupla:", "a": "[]", "b": "()", "c": "{}", "correct": "B", "exp": "Paréntesis para tuplas inmutables."},
                    {"q": "Agregar elemento:", "a": "add()", "b": "append()", "c": "push()", "correct": "B", "exp": "Añade al final."},
                    {"q": "Longitud de lista:", "a": "len()", "b": "size()", "c": "count()", "correct": "A", "exp": "Función built-in len()."},
                    {"q": "Acceder al primero:", "a": "[0]", "b": "[1]", "c": ".first", "correct": "A", "exp": "Índice base 0."},
                    {"q": "Eliminar elemento:", "a": "remove()", "b": "delete()", "c": "cut()", "correct": "A", "exp": "Elimina por valor."}
                ]
            },
            {
                "name": "5. Funciones",
                "questions": [
                    {"q": "Definir función:", "a": "func", "b": "def", "c": "function", "correct": "B", "exp": "Palabra reservada def."},
                    {"q": "Retornar valor:", "a": "return", "b": "give", "c": "back", "correct": "A", "exp": "Devuelve el resultado."},
                    {"q": "Parámetros opcionales:", "a": "Posibles", "b": "Imposibles", "c": "Solo uno", "correct": "A", "exp": "Usando valores por defecto."},
                    {"q": "Función anónima:", "a": "lambda", "b": "arrow", "c": "anon", "correct": "A", "exp": "Funciones lambda en una línea."},
                    {"q": "Llamar función:", "a": "nombre()", "b": "call nombre", "c": "run nombre", "correct": "A", "exp": "Paréntesis invocan la ejecución."},
                    {"q": "Variables dentro de func:", "a": "Globales", "b": "Locales", "c": "Estáticas", "correct": "B", "exp": "Alcance local por defecto."}
                ]
            }
        ]
    },
    
    # ---------------- JAVASCRIPT ----------------
    {
        "name": "JavaScript",
        "icon": "🟨",
        "desc": "Desarrollo Web Frontend.",
        "topics": [
            {
                "name": "1. Fundamentos",
                "questions": [
                    {"q": "Declarar constante:", "a": "const", "b": "let", "c": "var", "correct": "A", "exp": "No se puede reasignar."},
                    {"q": "Imprimir consola:", "a": "print", "b": "console.log", "c": "echo", "correct": "B", "exp": "Salida de depuración."},
                    {"q": "Igualdad estricta:", "a": "==", "b": "===", "c": "=", "correct": "B", "exp": "Compara valor y tipo."},
                    {"q": "Concatenar:", "a": "+", "b": ".", "c": "&", "correct": "A", "exp": "El operador suma concatena strings."},
                    {"q": "Tipo de NaN:", "a": "Number", "b": "Null", "c": "Void", "correct": "A", "exp": "Not a Number es numérico."},
                    {"q": "Ventana emergente:", "a": "alert()", "b": "popup()", "c": "msg()", "correct": "A", "exp": "Nativa del navegador."}
                ]
            },
            {
                "name": "2. Funciones",
                "questions": [
                    {"q": "Sintaxis Flecha:", "a": "() => {}", "b": "-> {}", "c": "=> ()", "correct": "A", "exp": "Arrow Functions ES6."},
                    {"q": "Palabra clásica:", "a": "function", "b": "def", "c": "fun", "correct": "A", "exp": "Declaración tradicional."},
                    {"q": "Retorno implícito:", "a": "Solo en Flecha", "b": "Siempre", "c": "Nunca", "correct": "A", "exp": "Si no hay llaves en arrow function."},
                    {"q": "Argumentos:", "a": "arguments", "b": "params", "c": "args", "correct": "A", "exp": "Objeto disponible en funciones clásicas."},
                    {"q": "Ejecutar después de tiempo:", "a": "setTimeout", "b": "wait", "c": "delay", "correct": "A", "exp": "Ejecuta callback tras milisegundos."},
                    {"q": "Función autoejecutable:", "a": "IIFE", "b": "SELF", "c": "AUTO", "correct": "A", "exp": "Immediately Invoked Function Expression."}
                ]
            },
            {
                "name": "3. DOM",
                "questions": [
                    {"q": "Significado DOM:", "a": "Document Object Model", "b": "Data Object", "c": "Disk Mode", "correct": "A", "exp": "Árbol HTML."},
                    {"q": "Seleccionar ID:", "a": "getElementById", "b": "selectId", "c": "getId", "correct": "A", "exp": "Método del document."},
                    {"q": "Selector CSS:", "a": "querySelector", "b": "find", "c": "search", "correct": "A", "exp": "Usa sintaxis CSS (#id, .clase)."},
                    {"q": "Cambiar texto:", "a": "innerText", "b": "textValue", "c": "content", "correct": "A", "exp": "O textContent."},
                    {"q": "Evento clic:", "a": "onclick", "b": "onpress", "c": "ontouch", "correct": "A", "exp": "Al pulsar elemento."},
                    {"q": "Añadir clase:", "a": "classList.add", "b": "className.push", "c": "style.add", "correct": "A", "exp": "Manipula clases CSS."}
                ]
            },
            {
                "name": "4. Arrays y Objetos",
                "questions": [
                    {"q": "Añadir al final:", "a": "push()", "b": "add()", "c": "append()", "correct": "A", "exp": "Método de Array."},
                    {"q": "Recorrer array:", "a": "map()", "b": "loop()", "c": "cycle()", "correct": "A", "exp": "Crea nuevo array transformado."},
                    {"q": "Filtrar elementos:", "a": "filter()", "b": "select()", "c": "where()", "correct": "A", "exp": "Retorna elementos que cumplan condición."},
                    {"q": "Objeto literal:", "a": "{}", "b": "[]", "c": "()", "correct": "A", "exp": "Pares clave:valor."},
                    {"q": "Claves de objeto:", "a": "Object.keys", "b": "Object.names", "c": "Object.props", "correct": "A", "exp": "Devuelve array de claves."},
                    {"q": "Convertir a JSON:", "a": "JSON.stringify", "b": "JSON.parse", "c": "JSON.to", "correct": "A", "exp": "Objeto a Texto."}
                ]
            },
            {
                "name": "5. Asincronía",
                "questions": [
                    {"q": "Promesa completada:", "a": "resolve", "b": "reject", "c": "done", "correct": "A", "exp": "Éxito en la promesa."},
                    {"q": "Promesa fallida:", "a": "reject", "b": "fail", "c": "catch", "correct": "A", "exp": "Error en la promesa."},
                    {"q": "Esperar promesa:", "a": "await", "b": "wait", "c": "stop", "correct": "A", "exp": "Dentro de función async."},
                    {"q": "Manejar error promesa:", "a": ".catch()", "b": ".error()", "c": ".fail()", "correct": "A", "exp": "Captura el rechazo."},
                    {"q": "Petición HTTP:", "a": "fetch()", "b": "get()", "c": "http()", "correct": "A", "exp": "API nativa moderna."},
                    {"q": "JSON texto a Objeto:", "a": "JSON.parse", "b": "JSON.obj", "c": "JSON.from", "correct": "A", "exp": "Texto a Datos."}
                ]
            }
        ]
    },

    # ---------------- JAVA ----------------
    {
        "name": "Java",
        "icon": "☕",
        "desc": "Empresarial y Android.",
        "topics": [
            {
                "name": "1. Introducción",
                "questions": [
                    {"q": "Punto de entrada:", "a": "main()", "b": "start()", "c": "run()", "correct": "A", "exp": "public static void main."},
                    {"q": "Imprimir:", "a": "System.out.println", "b": "print", "c": "echo", "correct": "A", "exp": "Salida estándar."},
                    {"q": "Compila a:", "a": "Bytecode", "b": "Binario", "c": "Script", "correct": "A", "exp": "Ejecutado por la JVM."},
                    {"q": "Archivo fuente:", "a": ".java", "b": ".class", "c": ".jar", "correct": "A", "exp": "Código legible."},
                    {"q": "Tipado:", "a": "Estático", "b": "Dinámico", "c": "Débil", "correct": "A", "exp": "Debes declarar tipos."},
                    {"q": "Terminar instrucción:", "a": ";", "b": ".", "c": "Enter", "correct": "A", "exp": "Punto y coma obligatorio."}
                ]
            },
            {
                "name": "2. Tipos de Datos",
                "questions": [
                    {"q": "Entero estándar:", "a": "int", "b": "integer", "c": "num", "correct": "A", "exp": "32 bits."},
                    {"q": "Decimal grande:", "a": "double", "b": "float", "c": "dec", "correct": "A", "exp": "64 bits precisión doble."},
                    {"q": "Verdadero/Falso:", "a": "boolean", "b": "bool", "c": "bit", "correct": "A", "exp": "true o false."},
                    {"q": "Texto:", "a": "String", "b": "char", "c": "text", "correct": "A", "exp": "Es una Clase (S mayúscula)."},
                    {"q": "Carácter simple:", "a": "char", "b": "string", "c": "byte", "correct": "A", "exp": "Comillas simples 'a'."},
                    {"q": "Entero largo:", "a": "long", "b": "big", "c": "huge", "correct": "A", "exp": "64 bits."}
                ]
            },
            {
                "name": "3. POO Básica",
                "questions": [
                    {"q": "Crear objeto:", "a": "new", "b": "make", "c": "create", "correct": "A", "exp": "Instancia memoria."},
                    {"q": "Plantilla objeto:", "a": "Clase", "b": "Struct", "c": "Map", "correct": "A", "exp": "Define atributos y métodos."},
                    {"q": "Herencia:", "a": "extends", "b": "inherits", "c": "super", "correct": "A", "exp": "Hereda de padre."},
                    {"q": "Contrato métodos:", "a": "interface", "b": "abstract", "c": "class", "correct": "A", "exp": "Define qué hacer, no cómo."},
                    {"q": "Referencia propia:", "a": "this", "b": "self", "c": "me", "correct": "A", "exp": "Objeto actual."},
                    {"q": "Constructor:", "a": "Mismo nombre clase", "b": "init()", "c": "start()", "correct": "A", "exp": "Inicializa objeto."}
                ]
            },
            {
                "name": "4. Control",
                "questions": [
                    {"q": "Bucle contador:", "a": "for", "b": "while", "c": "loop", "correct": "A", "exp": "for(i=0; i<10; i++)."},
                    {"q": "Bucle condición:", "a": "while", "b": "for", "c": "repeat", "correct": "A", "exp": "Mientras sea true."},
                    {"q": "Condicional:", "a": "if-else", "b": "check", "c": "when", "correct": "A", "exp": "Evaluación booleana."},
                    {"q": "Múltiples casos:", "a": "switch", "b": "select", "c": "choose", "correct": "A", "exp": "Evalúa valor variable."},
                    {"q": "Al menos una vez:", "a": "do-while", "b": "while", "c": "for", "correct": "A", "exp": "Evalúa al final."},
                    {"q": "Romper ciclo:", "a": "break", "b": "stop", "c": "end", "correct": "A", "exp": "Sale del bucle."}
                ]
            },
            {
                "name": "5. Colecciones",
                "questions": [
                    {"q": "Lista dinámica:", "a": "ArrayList", "b": "Array", "c": "ListArray", "correct": "A", "exp": "Crece automáticamente."},
                    {"q": "Tamaño Array fijo:", "a": ".length", "b": ".size()", "c": ".count", "correct": "A", "exp": "Propiedad de array."},
                    {"q": "Tamaño ArrayList:", "a": ".size()", "b": ".length", "c": ".count()", "correct": "A", "exp": "Método de colección."},
                    {"q": "Par Clave-Valor:", "a": "HashMap", "b": "ArrayList", "c": "HashSet", "correct": "A", "exp": "Diccionario."},
                    {"q": "Sin duplicados:", "a": "Set", "b": "List", "c": "Map", "correct": "A", "exp": "Conjunto único."},
                    {"q": "Agregar a lista:", "a": ".add()", "b": ".push()", "c": ".put()", "correct": "A", "exp": "Inserta elemento."}
                ]
            }
        ]
    },

    # ---------------- SQL ----------------
    {
        "name": "SQL",
        "icon": "🗄️",
        "desc": "Bases de Datos.",
        "topics": [
            {
                "name": "1. Consultas Básicas",
                "questions": [
                    {"q": "Leer datos:", "a": "SELECT", "b": "GET", "c": "FETCH", "correct": "A", "exp": "Sentencia DML."},
                    {"q": "Todas columnas:", "a": "*", "b": "ALL", "c": "%", "correct": "A", "exp": "Comodín."},
                    {"q": "Tabla origen:", "a": "FROM", "b": "IN", "c": "AT", "correct": "A", "exp": "Especifica tabla."},
                    {"q": "Valores únicos:", "a": "DISTINCT", "b": "UNIQUE", "c": "ONLY", "correct": "A", "exp": "Sin duplicados."},
                    {"q": "Limitar filas:", "a": "LIMIT", "b": "TOP", "c": "MAX", "correct": "A", "exp": "Varía según motor DB."},
                    {"q": "Alias columna:", "a": "AS", "b": "IS", "c": "LIKE", "correct": "A", "exp": "Nombre temporal."}
                ]
            },
            {
                "name": "2. Filtros",
                "questions": [
                    {"q": "Condición:", "a": "WHERE", "b": "IF", "c": "WHEN", "correct": "A", "exp": "Filtra filas."},
                    {"q": "Y lógico:", "a": "AND", "b": "&", "c": "&&", "correct": "A", "exp": "Ambos true."},
                    {"q": "O lógico:", "a": "OR", "b": "|", "c": "||", "correct": "A", "exp": "Uno true."},
                    {"q": "En lista:", "a": "IN", "b": "WITHIN", "c": "ON", "correct": "A", "exp": "Valor en conjunto."},
                    {"q": "Rango:", "a": "BETWEEN", "b": "RANGE", "c": "FROM TO", "correct": "A", "exp": "Entre dos valores."},
                    {"q": "Patrón texto:", "a": "LIKE", "b": "SIMILAR", "c": "SAME", "correct": "A", "exp": "Usa comodines %."}
                ]
            },
            {
                "name": "3. Modificación",
                "questions": [
                    {"q": "Insertar:", "a": "INSERT INTO", "b": "ADD", "c": "PUT", "correct": "A", "exp": "Crea fila."},
                    {"q": "Actualizar:", "a": "UPDATE", "b": "SET", "c": "CHANGE", "correct": "A", "exp": "Modifica existente."},
                    {"q": "Borrar fila:", "a": "DELETE", "b": "REMOVE", "c": "DROP", "correct": "A", "exp": "Borra datos."},
                    {"q": "Asignar valor:", "a": "SET", "b": "TO", "c": "VAL", "correct": "A", "exp": "En UPDATE."},
                    {"q": "Borrar todo rápido:", "a": "TRUNCATE", "b": "EMPTY", "c": "VOID", "correct": "A", "exp": "Resetea tabla."},
                    {"q": "Cuidado con DELETE:", "a": "Usar WHERE", "b": "Usar IF", "c": "Nada", "correct": "A", "exp": "Sin WHERE borra todo!"}
                ]
            },
            {
                "name": "4. Agregación",
                "questions": [
                    {"q": "Contar:", "a": "COUNT()", "b": "SUM()", "c": "TOTAL()", "correct": "A", "exp": "Número de filas."},
                    {"q": "Promedio:", "a": "AVG()", "b": "MEAN()", "c": "MID()", "correct": "A", "exp": "Media aritmética."},
                    {"q": "Suma:", "a": "SUM()", "b": "ADD()", "c": "PLUS()", "correct": "A", "exp": "Sumatoria."},
                    {"q": "Máximo:", "a": "MAX()", "b": "TOP()", "c": "HIGH()", "correct": "A", "exp": "Valor más alto."},
                    {"q": "Agrupar por:", "a": "GROUP BY", "b": "ORDER BY", "c": "SORT BY", "correct": "A", "exp": "Agrupa resultados."},
                    {"q": "Filtro grupo:", "a": "HAVING", "b": "WHERE", "c": "IF", "correct": "A", "exp": "Condición sobre agregación."}
                ]
            },
            {
                "name": "5. Tablas (DDL)",
                "questions": [
                    {"q": "Crear tabla:", "a": "CREATE TABLE", "b": "MAKE TABLE", "c": "NEW TABLE", "correct": "A", "exp": "Define estructura."},
                    {"q": "Eliminar tabla:", "a": "DROP TABLE", "b": "DELETE TABLE", "c": "CUT TABLE", "correct": "A", "exp": "Borra todo."},
                    {"q": "Modificar tabla:", "a": "ALTER TABLE", "b": "CHANGE TABLE", "c": "MOD TABLE", "correct": "A", "exp": "Añade columnas."},
                    {"q": "Clave primaria:", "a": "PRIMARY KEY", "b": "MAIN KEY", "c": "ID KEY", "correct": "A", "exp": "Identificador único."},
                    {"q": "No nulo:", "a": "NOT NULL", "b": "NO EMPTY", "c": "REQUIRED", "correct": "A", "exp": "Obligatorio."},
                    {"q": "Valor defecto:", "a": "DEFAULT", "b": "INIT", "c": "START", "correct": "A", "exp": "Si no se envía valor."}
                ]
            }
        ]
    }
]

def populate():
    print("🗑️  LIMPIEZA: Borrando datos antiguos...")
    Exercise.objects.all().delete()
    Topic.objects.all().delete()
    Language.objects.all().delete()

    print("🌱 SEMBRANDO: Insertando Plan de Estudios Completo (20 Temas, ~120 Ejercicios)...")

    total_ex = 0
    for lang_data in CURRICULUM:
        l = Language.objects.create(
            name=lang_data["name"],
            icon=lang_data["icon"],
            description=lang_data["desc"]
        )
        print(f"\n[{l.name}]")

        for i, topic_data in enumerate(lang_data["topics"]):
            t = Topic.objects.create(
                name=topic_data["name"],
                language=l,
                order=i+1,
                description=f"Lección sobre {topic_data['name']}"
            )
            
            # Insertar las preguntas definidas (6 por tema)
            for j, q_data in enumerate(topic_data["questions"]):
                Exercise.objects.create(
                    topic=t,
                    title=f"Ejercicio {j+1}",
                    points_reward=15, 
                    question=q_data["q"],
                    choice_a=q_data["a"],
                    choice_b=q_data["b"],
                    choice_c=q_data["c"],
                    correct_answer=q_data["correct"],
                    explanation=q_data["exp"]
                )
                total_ex += 1
            
            print(f"   └── Tema '{t.name}': {len(topic_data['questions'])} ejercicios.")

    print(f"\n✨ ¡HECHO! Base de datos lista con {total_ex} ejercicios de alta calidad. ✨")

if __name__ == '__main__':
    populate()