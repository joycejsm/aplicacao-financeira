import { useState, useContext } from "react";
import { GastosContext } from "./GastosContext";
import api from "../api";

const AdicionarGasto = () => {
  const { adicionarGasto } = useContext(GastosContext);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [data, setData] = useState("");

  const limparCampos = () => {
    setDescricao("");
    setValor("");
    setCategoria("");
    setData("");
  };

  const handleSubmitGastoPessoal = async (e) => {
    e.preventDefault();
    try {
      await adicionarGasto({
        descricao,
        valor: Number(valor),
        categoria,
        data,
      });
      limparCampos();
    } catch (error) {
      console.error("Erro ao adicionar gasto:", error);
    }
  };

  const handleSubmitGastoCompartilhado = async () => {
    try {
      await api.post("/gastos-compartilhados", {
        descricao,
        valor,
        data,
        categoria,
        amigosIds: [1] // simbólico, vai pra você mesmo
      });
  
      // Em vez de alert, loga no console:
      console.log("Gasto compartilhado adicionado com sucesso!");
  
      // Limpa os campos:
      limparCampos();
  
      // Opcional: redireciona automaticamente pra aba de compartilhados
      window.location.href = "/compartilhados"; // Só se sua rota for essa
    } catch (err) {
      console.error("Erro ao adicionar gasto compartilhado:", err.response?.data || err.message);
      
      // Remove alert e mostra erro discreto no console
    }
  };
  

  return (
    <form>
      <input
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Valor"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        required
      />
      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
        required
      />
      <select
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        required
      >
        <option value="">Escolha a categoria</option>
        <option value="Custos Fixos">Custos Fixos</option>
        <option value="Alimentação">Alimentação</option>
        <option value="Transporte">Transporte</option>
        <option value="Lazer">Lazer</option>
        <option value="Outros">Outros</option>
      </select>

      <button type="submit" onClick={handleSubmitGastoPessoal}>
        Adicionar Gasto
      </button>

      <button
        type="button"
        onClick={handleSubmitGastoCompartilhado}
        className="btn-gasto-compartilhado"
        style={{ marginTop: "10px" }}
      >
        Adicionar Gasto de Amigos
      </button>
    </form>
  );
};

export default AdicionarGasto;
