import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import AdicionarGasto from "./AdicionarGasto";
import ListaGastos from "./ListaGastos";
//import GastosCompartilhados from "./GastosCompartilhados.jsx";
import GraficoGastos from "./GraficoGastos";
import GastosCompartilhados from "./GastosCompartilhados";
import Login from "./Login";
import Cadastro from "./Cadastro";
// import "./styles.css";
import { useAuth } from "../AuthContext.jsx";
import "./App.css"

const App = () => {
  const { user, logout } = useAuth();

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
                <Link to="/compartilhados">Compartilhados</Link> {/* ✅ novo link */}
              </div>
              <button onClick={logout}>Sair</button>
            </div>
          </nav>

          <div className="container">
            <Routes>
              <Route path="/" element={<AdicionarGasto />} />
              <Route path="/lista" element={<ListaGastos />} />
              <Route path="/compartilhados" element={<GastosCompartilhados />} />
              <Route path="/relatorios" element={<GraficoGastos />} />
              <Route path="/compartilhados" element={<GastosCompartilhados />} /> {/* ✅ nova rota */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </>
      )}
    </Router>
  );
};

export default App;
