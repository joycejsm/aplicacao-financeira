import { useContext, useState } from "react";
import { GastosContext } from "./GastosContext";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const GraficoGastos = () => {
  const { gastos } = useContext(GastosContext);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("todas");

  // 🔹 Categorias únicas
  const categorias = ["todas", ...new Set(gastos.map((g) => g.categoria))];

  // 🔹 Filtra os gastos pela categoria
  const gastosFiltrados =
    categoriaSelecionada === "todas"
      ? gastos
      : gastos.filter((g) => g.categoria === categoriaSelecionada);

  // 🔹 Agrupa os valores por categoria (inclusive para o modo "todas")
  const categoriasParaExibir = [...new Set(gastosFiltrados.map((g) => g.categoria))];
  const valoresPorCategoria = categoriasParaExibir.map((categoria) =>
    gastosFiltrados
      .filter((g) => g.categoria === categoria)
      .reduce((total, gasto) => total + gasto.valor, 0)
  );

  const data = {
    labels: categoriasParaExibir,
    datasets: [
      {
        label:
          categoriaSelecionada === "todas"
            ? "Gastos por Categoria"
            : `Gastos - ${categoriaSelecionada}`,
        data: valoresPorCategoria,
        backgroundColor: "#36A2EB",
      },
    ],
  };

  return (
    <div>
      <h2>Gráfico de Gastos</h2>

      {/* 🔹 Dropdown de categorias */}
      <select
        value={categoriaSelecionada}
        onChange={(e) => setCategoriaSelecionada(e.target.value)}
        style={{ marginBottom: "1rem" }}
      >
        {categorias.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>

      {/* 🔹 Gráfico */}
      <Bar data={data} />
    </div>
  );
};

export default GraficoGastos;
