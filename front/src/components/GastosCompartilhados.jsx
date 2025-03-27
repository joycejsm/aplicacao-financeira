import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { GastosContext } from './GastosContext';

const GastosCompartilhados = () => {
  const { user } = useAuth();
  const { refreshGastos } = useContext(GastosContext);
  const [gastosCompartilhados, setGastosCompartilhados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [amigos, setAmigos] = useState([]);

  // Busca os amigos do usuário
  const fetchAmigos = async () => {
    try {
      const response = await axios.get('/api/amigos', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setAmigos(response.data);
    } catch (err) {
      console.error('Erro ao buscar amigos:', err);
    }
  };

  // Busca os gastos compartilhados
  const fetchGastosCompartilhados = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/gastos/compartilhados_comigo', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      
      // Filtra apenas gastos de amigos (opcional, pode ser feito no backend)
      const gastosDeAmigos = response.data.filter(gasto => 
        amigos.some(amigo => 
          amigo.id === gasto.gasto.payerId || 
          amigo.id === gasto.gasto.beneficiarioId
        )
      );
      
      setGastosCompartilhados(gastosDeAmigos);
    } catch (err) {
      console.error('Erro ao buscar gastos compartilhados:', err);
      setError('Erro ao carregar gastos compartilhados');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAmigos().then(fetchGastosCompartilhados);
    }
  }, [user, refreshGastos]);

  const handleAceitarGasto = async (gastoId) => {
    try {
      await axios.put(`/api/gastos/compartilhados/${gastoId}/aceitar`, {}, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      fetchGastosCompartilhados();
    } catch (err) {
      console.error('Erro ao aceitar gasto:', err);
    }
  };

  const handleRecusarGasto = async (gastoId) => {
    try {
      await axios.put(`/api/gastos/compartilhados/${gastoId}/recusar`, {}, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      fetchGastosCompartilhados();
    } catch (err) {
      console.error('Erro ao recusar gasto:', err);
    }
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="gastos-compartilhados">
      <h2>Gastos Compartilhados com Você</h2>
      
      {gastosCompartilhados.length === 0 ? (
        <p>Nenhum gasto compartilhado encontrado</p>
      ) : (
        <ul className="lista-gastos">
          {gastosCompartilhados.map((gastoCompartilhado) => (
            <li key={gastoCompartilhado.id} className="gasto-item">
              <div className="gasto-info">
                <h3>{gastoCompartilhado.gasto.descricao}</h3>
                <p>Valor: R$ {gastoCompartilhado.valor.toFixed(2)}</p>
                <p>Pago por: {gastoCompartilhado.gasto.payer?.name || 'Usuário desconhecido'}</p>
                <p>Data: {new Date(gastoCompartilhado.gasto.data).toLocaleDateString()}</p>
                <p>Status: {gastoCompartilhado.status}</p>
              </div>
              
              {gastoCompartilhado.status === 'Pendente' && (
                <div className="gasto-actions">
                  <button 
                    onClick={() => handleAceitarGasto(gastoCompartilhado.id)}
                    className="btn-aceitar"
                  >
                    Aceitar
                  </button>
                  <button 
                    onClick={() => handleRecusarGasto(gastoCompartilhado.id)}
                    className="btn-recusar"
                  >
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