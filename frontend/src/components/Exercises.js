import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import confetti from "canvas-confetti";

export default function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedbackState, setFeedbackState] = useState("idle"); 
  const [sessionPoints, setSessionPoints] = useState(0); 
  const [correctCount, setCorrectCount] = useState(0); 
  const [isFinished, setIsFinished] = useState(false); 
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const topicId = queryParams.get("topic");
    const endpoint = topicId ? `exercises/?topic=${topicId}` : "exercises/";

    api.get(endpoint)
      .then((res) => {
        const shuffled = res.data.sort(() => Math.random() - 0.5);
        setExercises(shuffled);
      })
      .catch((err) => console.error(err));
  }, [location]);

  const handleCheck = async (optionKey) => {
    if (feedbackState !== "idle") return;
    setSelectedOption(optionKey);

    const currentExercise = exercises[currentIndex];
    const isCorrect = optionKey === currentExercise.correct_answer;

    if (isCorrect) {
      setFeedbackState("correct");
      setCorrectCount((prev) => prev + 1); 
      
      try {
        const res = await api.post(`exercises/${currentExercise.id}/complete/`);
        setSessionPoints((prev) => prev + res.data.puntos_ganados);
      } catch (error) {
        console.error("Error guardando progreso:", error);
      }
    } else {
      setFeedbackState("incorrect");
    }
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setFeedbackState("idle");
      setSelectedOption(null);
    } else {
      setIsFinished(true);
      triggerCelebration();
    }
  };

  const triggerCelebration = () => {
    if (correctCount > exercises.length / 2) {
        confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#58cc02', '#2ecc71', '#f1c40f']
        });
    }
  };

  if (exercises.length === 0) return <div style={styles.container}>Cargando lección...</div>;

  if (isFinished) {
    return (
      <div style={styles.container}>
        <div style={styles.summaryCard}>
          <div style={{fontSize: '4rem', marginBottom: '10px'}}>
            {correctCount === exercises.length ? "🌟" : "🎉"}
          </div>
          <h1 style={styles.title}>¡Lección Completada!</h1>
          
          <div style={styles.resultRow}>
            <div style={styles.resultItem}>
              <span style={styles.resultLabel}>XP Ganada</span>
              <span style={styles.resultValue}>+{sessionPoints}</span>
            </div>
            <div style={styles.resultItem}>
              <span style={styles.resultLabel}>Aciertos</span>
              <span style={styles.resultValue}>{correctCount}/{exercises.length}</span>
            </div>
          </div>

            <p style={{marginBottom: '20px', color: '#ccc'}}>
                {correctCount === exercises.length 
                    ? "¡Perfecto! Eres un genio." 
                    : "¡Buen trabajo! Sigue practicando."}
            </p>

          <button onClick={() => navigate("/dashboard")} style={styles.finishBtn}>
            CONTINUAR
          </button>
        </div>
      </div>
    );
  }

  const currentExercise = exercises[currentIndex];
  const progressPercent = ((currentIndex) / exercises.length) * 100;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate("/topics")} style={styles.closeBtn}>✕</button>
        <div style={styles.progressBarBg}>
          <div style={{...styles.progressBarFill, width: `${progressPercent}%`}}></div>
        </div>
      </div>

      <h2 style={styles.questionTitle}>Selecciona la opción correcta:</h2>
      
      <div style={styles.codeCard}>
        <div style={styles.dots}>
          <span style={{...styles.dot, background: '#ff5f56'}}></span>
          <span style={{...styles.dot, background: '#ffbd2e'}}></span>
          <span style={{...styles.dot, background: '#27c93f'}}></span>
        </div>
        <pre style={styles.codeBlock}>{currentExercise.question}</pre>
      </div>

      <div style={styles.optionsGrid} key={currentIndex}>
        {['a', 'b', 'c'].map((key) => {
            const upperKey = key.toUpperCase();
            const isSelected = selectedOption === upperKey;
            const isActualCorrect = currentExercise.correct_answer === upperKey;
            
            // 1. Estilo base
            let btnStyle = {...styles.optionBtn};

            // 2. Estado "Seleccionado" (mientras piensas)
            if (feedbackState === "idle" && isSelected) {
                btnStyle = {...btnStyle, ...styles.selected};
            }

            // 3. Estado "Resultado" (ya respondiste)
            if (feedbackState !== "idle") {
                // A. La correcta SIEMPRE se ilumina en verde
                if (isActualCorrect) {
                    btnStyle = {...btnStyle, ...styles.correct};
                }
                // B. Si te equivocaste, tu elección se pone roja
                else if (isSelected && feedbackState === "incorrect") {
                    btnStyle = {...btnStyle, ...styles.incorrect};
                }
                // C. Las demás se opacan para no distraer
                else {
                    btnStyle = {...btnStyle, opacity: 0.5};
                }
            }

            return (
                <button 
                    key={key} 
                    onClick={() => handleCheck(upperKey)}
                    style={btnStyle}
                    disabled={feedbackState !== "idle"}
                >
                    <span style={styles.keyBadge}>{upperKey}</span>
                    {currentExercise[`choice_${key}`]}
                </button>
            )
        })}
      </div>

      {feedbackState !== "idle" && (
        <div style={feedbackState === "correct" ? styles.footerCorrect : styles.footerIncorrect}>
          <div style={styles.feedbackContent}>
            <div style={{fontSize: '1.5rem', marginRight: '15px'}}>
               {feedbackState === "correct" ? "✅ ¡Excelente!" : "❌ Ups, incorrecto"}
            </div>
            {feedbackState === "correct" && (
                <div style={{fontSize: '0.9rem', opacity: 0.9}}>
                   {currentExercise.explanation}
                </div>
            )}
            {feedbackState === "incorrect" && (
               <div style={{textAlign: 'left'}}>
                  <div style={{fontWeight: 'bold'}}>
                      Respuesta correcta: {currentExercise.correct_answer}
                  </div>
                  <div style={{fontSize: '0.9rem', marginTop: '5px'}}>{currentExercise.explanation}</div>
               </div>
            )}
          </div>
          <button onClick={handleNext} style={feedbackState === "correct" ? styles.nextBtnCorrect : styles.nextBtnIncorrect}>
            CONTINUAR
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", backgroundColor: "#13132B", color: "#fff", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "'Nunito', sans-serif" },
  header: { width: "100%", maxWidth: "600px", display: "flex", alignItems: "center", gap: "15px", marginBottom: "30px" },
  closeBtn: { background: "none", border: "none", color: "#a0a0b0", fontSize: "1.5rem", cursor: "pointer" },
  progressBarBg: { flex: 1, height: "15px", backgroundColor: "#2d2d44", borderRadius: "10px", overflow: "hidden" },
  progressBarFill: { height: "100%", backgroundColor: "#58cc02", transition: "width 0.3s ease" },
  questionTitle: { marginBottom: "20px", textAlign: "center" },
  codeCard: { backgroundColor: "#1e1e2f", padding: "20px", borderRadius: "15px", width: "100%", maxWidth: "500px", marginBottom: "30px", boxShadow: "0 8px 0 #151525", border: "1px solid #333" },
  dots: { display: "flex", gap: "8px", marginBottom: "15px" },
  dot: { width: "12px", height: "12px", borderRadius: "50%" },
  codeBlock: { margin: 0, fontSize: "1.1rem", lineHeight: "1.5", color: "#a29bfe", whiteSpace: "pre-wrap", textAlign: 'left' },
  optionsGrid: { display: "flex", flexDirection: "column", gap: "15px", width: "100%", maxWidth: "500px", marginBottom: "100px" },
  
  // Estilo base del botón
  optionBtn: { 
    padding: "15px 20px", 
    backgroundColor: "#2d2d44", 
    border: "2px solid #2d2d44", 
    borderRadius: "15px", 
    color: "#fff", 
    fontSize: "1rem", 
    cursor: "pointer", 
    display: "flex", 
    alignItems: "center", 
    transition: "0.2s", 
    boxShadow: "0 4px 0 #1e1e2f",
    // IMPORTANTE: Esto evita que el navegador ponga el botón gris cuando está disabled
    opacity: 1 
  },
  
  selected: { borderColor: "#a29bfe", backgroundColor: "#3a3a55" },
  
  // Estilos fuertes para asegurar que se vean
  correct: { 
    borderColor: "#58cc02", 
    backgroundColor: "#58cc02", 
    color: "#fff", 
    boxShadow: "0 4px 0 #46a302" 
  },
  incorrect: { 
    borderColor: "#ff4757", 
    backgroundColor: "#ff4757", 
    color: "#fff",
    boxShadow: "0 4px 0 #d63031"
  },
  
  keyBadge: { backgroundColor: "rgba(255,255,255,0.1)", padding: "5px 10px", borderRadius: "8px", marginRight: "15px", fontWeight: "bold", fontSize: "0.8rem" },
  footerCorrect: { position: "fixed", bottom: 0, left: 0, right: 0, backgroundColor: "#13132B", borderTop: "2px solid #58cc02", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "15px", animation: "slideUp 0.3s" },
  footerIncorrect: { position: "fixed", bottom: 0, left: 0, right: 0, backgroundColor: "#13132B", borderTop: "2px solid #ff4757", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "15px", animation: "slideUp 0.3s" },
  feedbackContent: { width: "100%", maxWidth: "600px", display: "flex", alignItems: "center", justifyContent: "space-between", color: "#fff" },
  nextBtnCorrect: { padding: "15px 40px", backgroundColor: "#58cc02", color: "white", border: "none", borderRadius: "12px", fontWeight: "bold", fontSize: "1rem", cursor: "pointer", boxShadow: "0 4px 0 #46a302", width: "100%", maxWidth: "600px" },
  nextBtnIncorrect: { padding: "15px 40px", backgroundColor: "#ff4757", color: "white", border: "none", borderRadius: "12px", fontWeight: "bold", fontSize: "1rem", cursor: "pointer", boxShadow: "0 4px 0 #d63031", width: "100%", maxWidth: "600px" },
  summaryCard: { backgroundColor: "#1e1e2f", padding: "40px", borderRadius: "20px", textAlign: "center", maxWidth: "400px", width: "100%", boxShadow: "0 10px 30px rgba(0,0,0,0.5)", marginTop: "50px" },
  title: { fontSize: "1.8rem", marginBottom: "30px", color: "#fff" },
  resultRow: { display: "flex", justifyContent: "space-around", marginBottom: "40px" },
  resultItem: { display: "flex", flexDirection: "column" },
  resultLabel: { color: "#a0a0b0", fontSize: "0.9rem", marginBottom: "5px" },
  resultValue: { color: "#ffbd2e", fontSize: "1.5rem", fontWeight: "bold" },
  finishBtn: { padding: "15px", width: "100%", borderRadius: "12px", border: "none", backgroundColor: "#58cc02", color: "#fff", fontSize: "1.1rem", fontWeight: "bold", cursor: "pointer", boxShadow: "0 4px 0 #46a302" }
};