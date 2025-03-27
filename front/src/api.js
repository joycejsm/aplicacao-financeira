import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // Backend rodando aqui
});

// Adiciona o token a cada requisição automaticamente
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
