import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { useState } from "react";
import { AuthProvider } from "../context/AuthContext"; // Importa o AuthProvider
import { GastosProvider } from "../context/GastosContext"; // Importa o GastosProvider
import AdicionarGasto from "./AdicionarGasto";
import ListaGastos from "./ListaGastos";
import GraficoGastos from "./GraficoGastos";
import Login from "./Login";
import Cadastro from "./Cadastro";
import "./styles.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticação

  return (
    <AuthProvider> {/* Envolva o Router com o AuthProvider */}
      <GastosProvider> {/* Envolva o Router com o GastosProvider */}
        <Router>
          {!isAuthenticated ? (
            <Routes>
              <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          ) : (
            <>
              <nav>
                <Link to="/">Adicionar Gasto</Link>
                <Link to="/lista">Lista de Gastos</Link>
                <Link to="/relatorios">Relatórios</Link>
                <button onClick={() => setIsAuthenticated(false)}>Sair</button>
              </nav>
              <div className="container">
                <Routes>
                  <Route path="/" element={<AdicionarGasto />} />
                  <Route path="/lista" element={<ListaGastos />} />
                  <Route path="/relatorios" element={<GraficoGastos />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </div>
            </>
          )}
        </Router>
      </GastosProvider>
    </AuthProvider>
  );
};

export default App;
