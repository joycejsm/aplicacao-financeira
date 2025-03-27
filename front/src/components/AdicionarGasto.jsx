import { useState, useContext } from "react";
import { GastosContext } from "./GastosContext";
import api from "../api"; // Importa a API configurada com Axios
const AdicionarGasto = () => {
  const { adicionarGasto } = useContext(GastosContext);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [data, setData] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adicionarGasto({
        descricao,
        valor: Number(valor),
        categoria,
        data,
      });

      // Limpa os campos
      setDescricao("");
      setValor("");
      setCategoria("");
      setData("");
    } catch (error) {
      console.error("Erro ao adicionar gasto:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
      <input type="number" placeholder="Valor" value={valor} onChange={(e) => setValor(e.target.value)} required />
      <input type="date" value={data} onChange={(e) => setData(e.target.value)} required />
      <select value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
        <option value="">Escolha a categoria</option>
        <option value="Custos Fixos">Custos Fixo</option>
        <option value="Alimentação">Alimentação</option>
        <option value="Transporte">Transporte</option>
        <option value="Lazer">Lazer</option>
        <option value="Outros">Outros</option>
      </select>
      <button type="submit">Adicionar Gasto</button>
    </form>
  );
};
export default AdicionarGasto;