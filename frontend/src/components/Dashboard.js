import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Controla si se ve el modal
  const [editForm, setEditForm] = useState({ username: "", email: "" }); // Datos del formulario
  const navigate = useNavigate();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    api.get("users/me/")
      .then((res) => setUser(res.data))
      .catch(() => handleLogout());
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/");
  };

  // --- LÓGICA DE EDICIÓN ---
  const openEditModal = () => {
    // Pre-llenar el formulario con los datos actuales
    setEditForm({ username: user.username, email: user.email });
    setIsEditing(true);
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      // Enviamos PATCH para actualizar solo lo que cambió
      const res = await api.patch("users/me/", editForm);
      setUser(res.data); // Actualizamos la vista con los datos nuevos
      setIsEditing(false); // Cerramos modal
      alert("✅ Perfil actualizado correctamente");
    } catch (error) {
      console.error(error);
      alert("Error al actualizar. Quizás el nombre ya existe.");
    }
  };
  // -------------------------

  if (!user) return <div style={styles.loading}>Cargando perfil...</div>;

  const badgeIcons = {
    "first_blood": { icon: "🩸", title: "Primera Sangre", desc: "Completaste tu primer reto" },
    "hunter": { icon: "🏹", title: "Cazador", desc: "Ganaste 100 puntos" },
    "level_2": { icon: "🆙", title: "Ascenso", desc: "Llegaste al nivel 2" }
  };

  const userBadges = user.badges 
    ? user.badges.split(",").map(b => b.trim()).filter(b => b !== "")
    : [];

  return (
    <div style={styles.container}>
      
      <div style={styles.profileHeader}>
        <div style={styles.avatarLarge}>
          {user.username.charAt(0).toUpperCase()}
        </div>
        <h2 style={styles.username}>{user.username}</h2>
        <span style={styles.userEmail}>{user.email || "Sin correo registrado"}</span>
        
        {/* BOTÓN AHORA ACTIVO */}
        <button style={styles.editBtn} onClick={openEditModal}>
          ✏️ Editar Perfil
        </button>
      </div>

      <div style={styles.statsRow}>
        <div style={styles.statItem}>
          <span style={styles.statValue}>🏆 {user.points}</span>
          <span style={styles.statLabel}>XP Total</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statValue}>⚡ {user.level}</span>
          <span style={styles.statLabel}>Nivel</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statValue}>🏅 {userBadges.length}</span>
          <span style={styles.statLabel}>Logros</span>
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Colección de Insignias</h3>
        <div style={styles.badgeGrid}>
          {userBadges.length > 0 ? (
            userBadges.map((badgeCode, index) => {
              const badge = badgeIcons[badgeCode];
              if (!badge) return null;
              return (
                <div key={index} style={styles.badgeCard} title={badge.desc}>
                  <div style={{fontSize: '2rem'}}>{badge.icon}</div>
                  <span style={styles.badgeTitle}>{badge.title}</span>
                </div>
              )
            })
          ) : (
            <div style={styles.emptyState}>
              <p>Aún no tienes insignias.</p>
            </div>
          )}
        </div>
      </div>

      <div style={styles.actionButtons}>
      <button 
        onClick={() => navigate("/topics")} // <--- CAMBIO AQUÍ (Antes era "/exercises")
        style={styles.playBtn}
      >
        🚀 Continuar Aprendizaje
      </button>
        <button onClick={() => navigate("/leaderboard")} style={styles.rankBtn}>
          🏆 Ver Ranking Global
        </button>
        {user.is_staff && (
          <button 
            onClick={() => navigate("/teacher")} 
            style={styles.teacherBtn}
          >
            👨‍🏫 Panel de Profesor
          </button>
        )}
      </div>

      <div style={styles.footer}>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Cerrar Sesión
        </button>
      </div>

      {/* --- VENTANA MODAL DE EDICIÓN --- */}
      {isEditing && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={{color: '#fff', marginBottom: '20px'}}>Editar Datos</h3>
            <form onSubmit={saveProfile} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
              
              <div style={{textAlign: 'left'}}>
                <label style={styles.label}>Usuario</label>
                <input 
                  style={styles.input} 
                  value={editForm.username}
                  onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                  required
                />
              </div>

              <div style={{textAlign: 'left'}}>
                <label style={styles.label}>Correo</label>
                <input 
                  style={styles.input} 
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                />
              </div>

              <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
                <button type="button" onClick={() => setIsEditing(false)} style={styles.cancelBtn}>
                  Cancelar
                </button>
                <button type="submit" style={styles.saveBtn}>
                  Guardar Cambios
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
      {/* ------------------------------- */}

    </div>
  ); 
}

// Estilos
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#13132B",
    color: "#fff",
    fontFamily: "'Nunito', sans-serif",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: 'relative' // Necesario para el modal
  },
  loading: { color: "#fff", marginTop: "50px" },
  
  profileHeader: { display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "30px", width: "100%", maxWidth: "400px" },
  avatarLarge: { width: "80px", height: "80px", backgroundColor: "#6c5ce7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem", fontWeight: "bold", boxShadow: "0 0 20px rgba(108, 92, 231, 0.4)", marginBottom: "15px" },
  username: { margin: "0", fontSize: "1.8rem" },
  userEmail: { color: "#a0a0b0", fontSize: "0.9rem", marginBottom: "10px" },
  editBtn: { backgroundColor: "transparent", border: "1px solid #6c5ce7", color: "#6c5ce7", padding: "5px 15px", borderRadius: "20px", cursor: "pointer", fontSize: "0.8rem", transition: '0.2s', ":hover": {backgroundColor: "#6c5ce7", color: "white"} },

  statsRow: { display: "flex", justifyContent: "space-around", width: "100%", maxWidth: "400px", backgroundColor: "#1e1e2f", padding: "15px", borderRadius: "15px", marginBottom: "30px", boxShadow: "0 4px 0 #151525" },
  statItem: { display: "flex", flexDirection: "column", alignItems: "center" },
  statValue: { fontSize: "1.5rem", fontWeight: "bold", color: "#ffbd2e" },
  statLabel: { fontSize: "0.8rem", color: "#a0a0b0" },

  section: { width: "100%", maxWidth: "400px", marginBottom: "30px" },
  sectionTitle: { fontSize: "1.2rem", marginBottom: "15px", borderBottom: "1px solid #333", paddingBottom: "10px" },
  badgeGrid: { display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" },
  badgeCard: { backgroundColor: "#2d2d44", borderRadius: "12px", padding: "10px", width: "80px", textAlign: "center", border: "1px solid #3d3d5c" },
  badgeTitle: { fontSize: "0.7rem", color: "#ccc" },
  emptyState: { color: "#666", fontStyle: "italic" },

  actionButtons: { width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column", gap: "15px", marginBottom: "30px" },
  playBtn: { padding: "15px", borderRadius: "12px", border: "none", backgroundColor: "#58cc02", color: "#fff", fontSize: "1.1rem", fontWeight: "bold", cursor: "pointer", boxShadow: "0 4px 0 #46a302" },
  rankBtn: { padding: "15px", borderRadius: "12px", border: "none", backgroundColor: "#1cb0f6", color: "#fff", fontSize: "1.1rem", fontWeight: "bold", cursor: "pointer", boxShadow: "0 4px 0 #1899d6" },

  footer: { marginTop: "auto", paddingBottom: "20px" },
  logoutBtn: { backgroundColor: "transparent", border: "1px solid #ff7675", color: "#ff7675", padding: "10px 30px", borderRadius: "20px", cursor: "pointer", fontWeight: "bold" },

  // --- ESTILOS DEL MODAL ---
  modalOverlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)', // Fondo oscuro transparente
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000
  },
  modalContent: {
    backgroundColor: '#1e1e2f',
    padding: '30px',
    borderRadius: '15px',
    width: '90%',
    maxWidth: '350px',
    textAlign: 'center',
    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
    border: '1px solid #444'
  },
  label: { display: 'block', color: '#a0a0b0', marginBottom: '5px', fontSize: '0.9rem' },
  input: {
    width: '100%', padding: '10px', borderRadius: '8px',
    border: '1px solid #444', backgroundColor: '#2d2d44',
    color: 'white', fontSize: '1rem'
  },
  cancelBtn: {
    flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #666',
    backgroundColor: 'transparent', color: '#ccc', cursor: 'pointer'
  },
  saveBtn: {
    flex: 1, padding: '10px', borderRadius: '8px', border: 'none',
    backgroundColor: '#58cc02', color: 'white', fontWeight: 'bold', cursor: 'pointer'
  },
  teacherBtn: {
    padding: "15px",
    borderRadius: "12px",
    border: "2px dashed #a29bfe", // Borde discontinuo para diferenciarlo
    backgroundColor: "transparent",
    color: "#a29bfe",
    fontSize: "1.1rem",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "none",
    transition: "0.2s",
    ":hover": { backgroundColor: "rgba(162, 155, 254, 0.1)" }
  },
};