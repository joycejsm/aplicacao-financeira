import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { useState } from "react";
import AdicionarGasto from "./AdicionarGasto";
import ListaGastos from "./ListaGastos";
import GraficoGastos from "./GraficoGastos";
import Login from "./Login";
import Cadastro from "./Cadastro";
import "./styles.css";
import { useAuth } from "../AuthContext.jsx";

const App = () => {
  const { user, logout } = useAuth(); // Estado de autenticação

  return (
    <Router>
      {!user ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <>
          <nav className="navbar">
            <div className="navbar-container">
              <div className="navbar-links">
                <Link to="/">Adicionar Gasto</Link>
                <Link to="/lista">Lista de Gastos</Link>
                <Link to="/relatorios">Relatórios</Link>
              </div>
              <button onClick={logout}>Sair</button>
            </div>
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
  );
};

export default App;
