const express = require("express"); // Importa o express
const app = express(); //instancia o express

const { PrismaClient } = require("@prisma/client"); //DIFERENTE
const prisma = new PrismaClient(); //DIFERENTE

const cors = require("cors"); //DIFERENTE
app.use(cors()); // DIFERENTE (Libera o acesso do frontend, VAMOS VER MAIS NA FRENTE)

const PORT = 3001; //Aqui eu defino a porta
app.use(express.json()); // Permite que a API receba JSON


// Rota para listar todos os gastos
app.get("/gastos", async (req, res) => {
  try {
    const gastos = await prisma.gasto.findMany();
    res.json(gastos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar gastos" });
  }
});

// Rota para buscar um gasto por ID
app.get("/gastos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const gasto = await prisma.gasto.findUnique({ where: { id } });

    if (!gasto) {
      return res.status(404).json({ error: "Gasto não encontrado" });
    }

    res.json(gasto);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar gasto" });
  }
});

// Rota para adicionar um novo gasto
app.post("/gastos", async (req, res) => {
  try {
    const { descricao, valor, categoria, data } = req.body;
    const novoGasto = await prisma.gasto.create({
      data: { descricao, valor: parseFloat(valor), categoria, data: new Date(data) },
    });
    res.status(201).json(novoGasto);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar gasto" });
  }
});

// Rota para excluir um gasto por ID
app.delete("/gastos/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const gastoExiste = await prisma.gasto.findUnique({ where: { id } });
  
      if (!gastoExiste) {
        return res.status(404).json({ error: "Gasto não encontrado" });
      }
  
      await prisma.gasto.delete({ where: { id } });
  
      res.json({ message: "Gasto excluído com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao excluir gasto" });
    }
  });
  
app.get("/", (req, res) => {
  res.send("API da aplicação financeira está rodando!");
});
  
// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});