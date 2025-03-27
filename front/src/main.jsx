import React from "react";
import { createRoot } from "react-dom/client"; // Correto
import App from "./components/App";
import { GastosProvider } from "./components/GastosContext";
import { AuthProvider } from "./AuthContext";

const root = createRoot(document.getElementById('root')); // Usando createRoot direto
root.render(
  <React.StrictMode>
    <AuthProvider>
      <GastosProvider>
        <App />
      </GastosProvider>
    </AuthProvider>
  </React.StrictMode>
);

