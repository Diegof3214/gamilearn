import React, { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterForm() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("users/register/", formData);
      alert("¡Cuenta creada! Ahora inicia sesión.");
      navigate("/"); // Redirigir al Login
    } catch (err) {
      console.error(err);
      setError("Error al registrar. El usuario quizás ya existe.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🚀 Crea tu cuenta</h2>
        <p style={styles.subtitle}>Únete a GamiLearn y empieza a codificar.</p>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            placeholder="Nombre de usuario"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
          <input
            style={styles.input}
            type="email"
            placeholder="Correo electrónico (opcional)"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          
          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button}>Registrarse</button>
        </form>

        <p style={styles.footerText}>
          ¿Ya tienes cuenta? <Link to="/" style={styles.link}>Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

// Estilos Dark Mode / Mimo
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#13132B", // Fondo oscuro
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Nunito', sans-serif"
  },
  card: {
    backgroundColor: "#1e1e2f",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center"
  },
  title: { color: "#fff", marginBottom: "10px", fontSize: "2rem" },
  subtitle: { color: "#a0a0b0", marginBottom: "30px" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: {
    padding: "15px",
    borderRadius: "12px",
    border: "2px solid #2d2d44",
    backgroundColor: "#2d2d44",
    color: "#fff",
    fontSize: "1rem",
    outline: "none"
  },
  button: {
    padding: "15px",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#6c5ce7",
    color: "#fff",
    fontSize: "1.1rem",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
    boxShadow: "0 4px 0 #4834d4",
    transition: "transform 0.1s"
  },
  error: { color: "#ff7675", fontSize: "0.9rem" },
  footerText: { color: "#a0a0b0", marginTop: "20px" },
  link: { color: "#6c5ce7", textDecoration: "none", fontWeight: "bold" }
};