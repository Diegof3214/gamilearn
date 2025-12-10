import axios from "axios";

// 👇 PEGA AQUÍ TU URL DE RENDER (Asegúrate de que termine en /api/)
const API_URL = "https://gamilearn-backend.onrender.com/api/"; 

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;