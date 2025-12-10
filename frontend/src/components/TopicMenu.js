import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function TopicMenu() {
  const [languages, setLanguages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("exercises/languages/")
      .then((res) => setLanguages(res.data))
      .catch((err) => console.error("Error cargando temas:", err));
  }, []);

  const handleTopicClick = (topicId) => {
    // Navegamos a los ejercicios, pero pasando el ID del tema
    navigate(`/exercises?topic=${topicId}`);
  };

  return (
    <div style={styles.container}>
      <button style={styles.backBtn} onClick={() => navigate("/dashboard")}>← Volver</button>
      <h1 style={styles.title}>🗺️ Ruta de Aprendizaje</h1>
      
      {languages.length === 0 && <p>Cargando cursos...</p>}

      {languages.map((lang) => (
        <div key={lang.id} style={styles.langSection}>
          <h2 style={styles.langTitle}>
            <span style={{marginRight: '10px'}}>{lang.icon}</span> 
            {lang.name}
          </h2>
          
          <div style={styles.topicGrid}>
            {lang.topics.map((topic) => (
              <div key={topic.id} style={styles.topicCard} onClick={() => handleTopicClick(topic.id)}>
                <div style={styles.topicIcon}>📚</div>
                <h3 style={styles.topicName}>{topic.name}</h3>
                <span style={styles.topicOrder}>Lección {topic.order}</span>
                <button style={styles.startBtn}>EMPEZAR</button>
              </div>
            ))}
          </div>

          {lang.topics.length === 0 && <p style={{opacity: 0.6}}>Próximamente...</p>}
        </div>
      ))}
    </div>
  );
}

// Estilos Dark Mode
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#13132B",
    color: "#fff",
    fontFamily: "'Nunito', sans-serif",
    padding: "20px",
    textAlign: "center"
  },
  backBtn: {
    position: 'absolute', top: 20, left: 20,
    backgroundColor: "transparent", color: "#a0a0b0", border: "none", cursor: "pointer", fontSize: "1rem"
  },
  title: { marginBottom: "40px" },
  langSection: { marginBottom: "50px", maxWidth: "800px", margin: "0 auto" },
  langTitle: { textAlign: "left", borderBottom: "1px solid #333", paddingBottom: "10px", marginBottom: "20px", color: "#a29bfe" },
  
  topicGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "20px"
  },
  topicCard: {
    backgroundColor: "#1e1e2f",
    borderRadius: "15px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 4px 0 #151525",
    border: "2px solid transparent"
  },
  topicIcon: { fontSize: "2rem", marginBottom: "10px" },
  topicName: { fontSize: "1.1rem", margin: "0 0 5px 0" },
  topicOrder: { fontSize: "0.8rem", color: "#888", marginBottom: "15px" },
  startBtn: {
    backgroundColor: "#6c5ce7",
    color: "white",
    border: "none",
    padding: "8px 20px",
    borderRadius: "20px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "0.8rem"
  }
};