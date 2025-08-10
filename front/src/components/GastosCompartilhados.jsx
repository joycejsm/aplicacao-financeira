import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../AuthContext";
import { GastosContext } from "./GastosContext";
import api from "../api";

const GastosCompartilhados = () => {
  const { user } = useAuth();
  const { refreshGastos } = useContext(GastosContext);

  const [gastosCompartilhados, setGastosCompartilhados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGastosCompartilhados = async () => {
    try {
      setLoading(true);
      const response = await api.get("/gastos-compartilhados/compartilhados_comigo");
      setGastosCompartilhados(response.data);
    } catch (err) {
      console.error("Erro ao buscar gastos compartilhados:", err);
      setError("Erro ao carregar gastos compartilhados");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchGastosCompartilhados();
    }
  }, [user, refreshGastos]);

  const atualizarStatus = async (id, acao) => {
    try {
      await api.put(`/gastos/compartilhados/${id}/${acao}`);
      fetchGastosCompartilhados();
    } catch (err) {
      console.error(`Erro ao ${acao} gasto:`, err);
    }
  };

  if (loading) return <div className="loading">Carregando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="gastos-compartilhados">
      <h2>Gastos compartilhados com amigos</h2>
      {gastosCompartilhados.length === 0 ? (
        <p>Nenhum gasto compartilhado encontrado</p>
      ) : (
        <ul className="lista-gastos">
          {gastosCompartilhados.map((item) => (
            <li key={item.id} className="gasto-item">
              <div className="gasto-info">
                <h3>{item.gasto.descricao}</h3>
                <p>Valor: R$ {item.valor?.toFixed(2) || item.gasto.valor.toFixed(2)}</p>
                <p>Pago por: {item.gasto.payer?.name || "Você"}</p>
                <p>Data: {new Date(item.gasto.data).toLocaleDateString()}</p>
                <p>Status: {item.status}</p>
              </div>

              {item.status === "Pendente" && (
                <div className="gasto-actions">
                  <button onClick={() => atualizarStatus(item.id, "aceitar")} className="btn-aceitar">
                    Aceitar
                  </button>
                  <button onClick={() => atualizarStatus(item.id, "recusar")} className="btn-recusar">
                    Recusar
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GastosCompartilhados;
