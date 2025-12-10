import { useEffect, useState } from "react";
import api from "../services/api";

export default function QuizExercise() {
  const [exercises, setExercises] = useState([]);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    api.get("quiz/")
      .then((res) => setExercises(res.data))
      .catch(() => console.log("Error cargando ejercicios"));
  }, []);

  const checkAnswer = (ex, option) => {
    if (option === ex.correct_answer) {
      setFeedback("¡Correcto! 🎉");
    } else {
      setFeedback("Incorrecto ❌, intenta de nuevo");
    }

    setSelected(option);
  };

  return (
    <div>
      <h2>Ejercicios de Programación</h2>

      {exercises.map((ex) => (
        <div key={ex.id} style={{ marginBottom: 20 }}>
          <h3>{ex.title}</h3>
          <p>{ex.question}</p>

          {ex.options.map((opt) => (
            <button
              key={opt}
              onClick={() => checkAnswer(ex, opt)}
              style={{ display: "block", margin: "5px 0" }}
            >
              {opt}
            </button>
          ))}

          {selected && <p>{feedback}</p>}
        </div>
      ))}
    </div>
  );
}
