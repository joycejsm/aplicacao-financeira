import { createContext, useState, useEffect } from "react";
import api from "../api";

export const GastosContext = createContext();

export const GastosProvider = ({ children }) => {
  const [gastos, setGastos] = useState([]);

  const fetchGastos = async () => {
    try {
      const response = await api.get("/gastos");
      setGastos(response.data);
    } catch (error) {
      console.error("Erro ao buscar gastos:", error);
    }
  };

  useEffect(() => {
    fetchGastos(); // ✅ só uma vez ao iniciar
  }, []);

  const adicionarGasto = async (novoGasto) => {
    try {
      await api.post("/gastos", novoGasto); // ❌ não usa setGastos aqui
      await fetchGastos(); // ✅ sempre atualiza a lista real do banco
    } catch (error) {
      console.error("Erro ao adicionar gasto:", error);
    }
  };

  return (
    <GastosContext.Provider value={{ gastos, adicionarGasto }}>
      {children}
    </GastosContext.Provider>
  );
};
