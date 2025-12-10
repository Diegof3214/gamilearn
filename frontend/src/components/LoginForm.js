import { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom"; // Importar Link

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("token/", { username, password });
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      onLogin();
    } catch (err) {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.logo}>GamiLearn 🎮</h1>
        <h2 style={styles.title}>¡Bienvenido de nuevo!</h2>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button}>INGRESAR</button>
        </form>

        <p style={styles.footerText}>
          ¿No tienes cuenta? <Link to="/register" style={styles.link}>Regístrate gratis</Link>
        </p>
      </div>
    </div>
  );
}

// Reutilizamos los estilos del registro para consistencia
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#13132B",
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
  logo: { color: "#6c5ce7", fontSize: "2.5rem", marginBottom: "10px", margin: 0 },
  title: { color: "#fff", marginBottom: "30px", fontSize: "1.5rem" },
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
    backgroundColor: "#58cc02", // Verde para login
    color: "#fff",
    fontSize: "1.1rem",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
    boxShadow: "0 4px 0 #46a302"
  },
  error: { color: "#ff7675", fontSize: "0.9rem" },
  footerText: { color: "#a0a0b0", marginTop: "20px" },
  link: { color: "#58cc02", textDecoration: "none", fontWeight: "bold" }
};