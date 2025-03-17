import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import AdicionarGasto from "./AdicionarGasto";
import ListaGastos from "./ListaGastos";
import GraficoGastos from "./GraficoGastos";
import Login from "./Login";
import Register from "./Register";
import "./styles.css";

const App = () => {
  const { token, logout } = useAuth();

  return (
    <Router>
      {!token ? (
        <div>
          <h1>Bem-vindo!</h1>
          <Link to="/login">Login</Link> | <Link to="/register">Cadastro</Link>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      ) : (
        <div>
          <nav>
            <Link to="/">Adicionar Gasto</Link>
            <Link to="/lista">Lista de Gastos</Link>
            <Link to="/relatorios">Relatórios</Link>
            <button onClick={logout}>Sair</button>
          </nav>
          <div className="container">
            <Routes>
              <Route path="/" element={<AdicionarGasto />} />
              <Route path="/lista" element={<ListaGastos />} />
              <Route path="/relatorios" element={<GraficoGastos />} />
            </Routes>
          </div>
        </div>
      )}
    </Router>
  );
};

export default App;

