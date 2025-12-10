import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function TeacherDashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Intentamos cargar la lista. Si falla (403 Forbidden), es que no es profe.
    api.get("users/students/")
      .then((res) => {
        setStudents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("⛔ Acceso Denegado: Se requieren permisos de profesor.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={styles.container}>Cargando datos...</div>;
  
  if (error) return (
    <div style={styles.container}>
      <h2 style={{color: '#ff7675'}}>{error}</h2>
      <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>Volver al Dashboard</button>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🎓 Panel del Docente</h1>
        <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>Volver</button>
      </div>

      <div style={styles.card}>
        <h3>Resumen de la Clase</h3>
        <p>Estudiantes registrados: <strong>{students.length}</strong></p>
        
        <table style={styles.table}>
          <thead>
            <tr style={styles.trHead}>
              <th style={styles.th}>Estudiante</th>
              <th style={styles.th}>Nivel</th>
              <th style={styles.th}>Puntos (XP)</th>
              <th style={styles.th}>Insignias</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} style={styles.tr}>
                <td style={styles.td}>
                   <span style={styles.avatarSmall}>{student.username.charAt(0).toUpperCase()}</span>
                   {student.username}
                </td>
                <td style={styles.td}>⚡ {student.level}</td>
                <td style={styles.td}>🏆 {student.points}</td>
                <td style={styles.td}>🏅 {student.badges ? student.badges.split(',').filter(x=>x).length : 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", backgroundColor: "#f0f2f5", padding: "40px", fontFamily: "sans-serif", color: "#333" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" },
  title: { color: "#13132B", margin: 0 },
  backBtn: { padding: "10px 20px", borderRadius: "8px", border: "none", backgroundColor: "#6c5ce7", color: "white", cursor: "pointer" },
  card: { backgroundColor: "white", padding: "30px", borderRadius: "15px", boxShadow: "0 5px 20px rgba(0,0,0,0.05)" },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "20px" },
  trHead: { borderBottom: "2px solid #eee", textAlign: "left" },
  th: { padding: "15px", color: "#888", fontSize: "0.9rem" },
  tr: { borderBottom: "1px solid #eee" },
  td: { padding: "15px", fontWeight: "bold" },
  avatarSmall: { display: "inline-block", width: "30px", height: "30px", backgroundColor: "#eee", borderRadius: "50%", textAlign: "center", lineHeight: "30px", marginRight: "10px", fontSize: "0.8rem", color: "#555" }
};