import React from "react";
import { createRoot } from "react-dom/client"; // Correção na importação
import App from "./components/App";
import { GastosProvider } from "./components/GastosContext";
import { AuthProvider } from "./AuthContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <GastosProvider>
        <App />
      </GastosProvider>
    </AuthProvider>
  </React.StrictMode>
);
