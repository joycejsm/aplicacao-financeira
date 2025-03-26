import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import axios from "axios";

const Cadastro = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        password
      });
    
      console.log("Usuário cadastrado:", response.data);
      alert("Cadastro realizado com sucesso!");
      navigate('/login');
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Erro ao cadastrar usuário";
      setError(errorMessage);
      console.error("Erro no cadastro:", error);
    } finally {
      setLoading(false);
    }
    
  };

  

  return (
    <div className="auth-container">
      <h2>Cadastro</h2>
      {error && <div className="error-message"> {error}</div>}
      <form onSubmit={handleRegister}>
        <label>
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
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
            maxLength={10}
          />
        </label>
        <button type="submit" disabled={loading}>{loading ? "Cadastrando..." : "Cadastrar"}</button>
        
      </form>
      <p>
        Já tem uma conta? <Link to="/login">Faça login</Link>
      </p>
    </div>
  );
};

export default Cadastro;
