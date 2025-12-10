import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Obtener lista de usuarios ordenados
    api.get("users/leaderboard/")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));

    // 2. Saber quién soy yo para resaltarme en la lista
    api.get("users/me/")
      .then((res) => setCurrentUser(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate("/dashboard")}>← Volver</button>
        <h1 style={styles.title}>🏆 Tabla de Posiciones</h1>
      </div>

      {/* Lista de Ranking */}
      <div style={styles.listContainer}>
        {users.map((user, index) => {
          // Determinar medalla para el top 3
          let medal = null;
          if (index === 0) medal = "🥇";
          else if (index === 1) medal = "🥈";
          else if (index === 2) medal = "🥉";
          else medal = `#${index + 1}`;

          // Resaltar si es el usuario actual
          const isMe = currentUser && currentUser.id === user.id;

          return (
            <div 
              key={user.id} 
              style={isMe ? styles.myCard : styles.card}
            >
              <div style={styles.leftSection}>
                <span style={styles.rank}>{medal}</span>
                <div style={styles.avatar}>{user.username.charAt(0).toUpperCase()}</div>
                <span style={styles.username}>
                  {user.username} {isMe && "(Tú)"}
                </span>
              </div>
              
              <div style={styles.rightSection}>
                <span style={styles.points}>{user.points} XP</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Estilos Dark Mode / Mimo
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#13132B",
    color: "#fff",
    fontFamily: "'Nunito', sans-serif",
    padding: "20px"
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "600px",
    margin: "0 auto 30px auto"
  },
  backBtn: {
    backgroundColor: "transparent",
    color: "#a0a0b0",
    border: "none",
    fontSize: "1rem",
    cursor: "pointer"
  },
  title: { fontSize: "1.5rem", margin: 0 },
  listContainer: {
    maxWidth: "600px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1e1e2f",
    padding: "15px 20px",
    borderRadius: "15px",
    boxShadow: "0 4px 0 #151525",
    transition: "transform 0.2s"
  },
  myCard: { // Estilo especial para "mí"
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2d2d44",
    border: "2px solid #6c5ce7", // Borde morado brillante
    padding: "15px 20px",
    borderRadius: "15px",
    boxShadow: "0 4px 0 #151525"
  },
  leftSection: { display: "flex", alignItems: "center", gap: "15px" },
  rank: { fontSize: "1.2rem", fontWeight: "bold", width: "30px" },
  avatar: {
    width: "40px",
    height: "40px",
    backgroundColor: "#6c5ce7",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "1.2rem"
  },
  username: { fontSize: "1.1rem", fontWeight: "bold" },
  rightSection: {},
  points: { color: "#ffbd2e", fontWeight: "bold", fontSize: "1.1rem" }
};