import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import axios from "axios"
import { useAuth } from "../AuthContext.jsx"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {login} = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password
      })

      login(response.data.token, response.data.user);
      
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.message || "Credenciais inválidas")
      console.error("Erro no login:", err);
      
    } finally {
      setLoading(false)
    }
    
    
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleLogin}>
        <label>
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>{loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
      <p>
        Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
      </p>
    </div>
  );
};

export default Login;
