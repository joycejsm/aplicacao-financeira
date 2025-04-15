import axios from "axios";

// 🔧 Detecta se está no ambiente local ou de produção
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: BASE_URL, // Flexível para ambiente futuro
});

// 🔐 Adiciona o token de autenticação automaticamente se existir
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
