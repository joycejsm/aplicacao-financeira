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

  const categorias = [...new Set(gastos.map((g) => g.categoria))];
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState(categorias);

  // ✅ Lidar com seleção/desseleção de categoria
  const toggleCategoria = (categoria) => {
    if (categoriasSelecionadas.includes(categoria)) {
      setCategoriasSelecionadas(categoriasSelecionadas.filter((c) => c !== categoria));
    } else {
      setCategoriasSelecionadas([...categoriasSelecionadas, categoria]);
    }
  };

  // ✅ Filtrar categorias visíveis
  const categoriasFiltradas = categorias.filter((c) => categoriasSelecionadas.includes(c));

  // ✅ Calcular os valores apenas das categorias selecionadas
  const valoresPorCategoria = categoriasFiltradas.map((categoria) =>
    gastos
      .filter((g) => g.categoria === categoria)
      .reduce((total, gasto) => total + gasto.valor, 0)
  );

  const data = {
    labels: categoriasFiltradas,
    datasets: [
      {
        label: "Gastos por Categoria",
        data: valoresPorCategoria,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0","#646cff"]
      },
    ],
  };

  return (
    <div>
      <h2>Gráfico de Gastos</h2>

      {/* ✅ Checkboxes para controle */}
      <div style={{ marginBottom: "1rem" }}>
        {categorias.map((categoria) => (
          <label key={categoria} style={{ marginRight: "1rem" }}>
            <input
              type="checkbox"
              checked={categoriasSelecionadas.includes(categoria)}
              onChange={() => toggleCategoria(categoria)}
            />
            {categoria}
          </label>
        ))}
      </div>

      {/* ✅ Gráfico com categorias filtradas */}
      <Bar data={data} />
    </div>
  );
};

export default GraficoGastos;
