const express = require("express"); // Importa o express
const app = express(); // Instancia o express
const { PrismaClient } = require("@prisma/client"); // Importa o Prisma Client
const prisma = new PrismaClient(); // Instancia o Prisma Client
const bcrypt = require("bcrypt"); // Para hash de senhas
const jwt = require("jsonwebtoken"); // Para gerar tokens JWT



const cors = require("cors"); //DIFERENTE
app.use(cors()); // DIFERENTE (Libera o acesso do frontend, VAMOS VER MAIS NA FRENTE)

const PORT = 5000; //Aqui eu defino a porta
app.use(express.json()); // Permite que a API receba JSON

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Não autorizado" });
  }

  try {
    const token = authHeader.split(" ")[1];
    // Aqui você deve validar o token JWT
    // Exemplo simplificado:
    const user = await prisma.user.findFirst({
      where: { id: parseInt(token) } // Isso é apenas exemplo - use JWT na prática
    });
    if (!user) {
      return res.status(401).json({ error: "Não autorizado" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: "Erro de autenticação" });
  }
  }

// Rota para listar todos os gastos
app.get("/gastos", authenticateUser, async (req, res) => {
  try {
    const gastos = await prisma.gasto.findMany({
      where: { userId: req.user.id }
    });
    res.json(gastos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar gastos" });
  }
});

// Rota para buscar um gasto por ID
app.get("/gastos/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;

    // Busca o gasto verificando se pertence ao usuário
    const gasto = await prisma.gasto.findFirst({
      where: { 
        id,
        userId: req.user.id 
      }
    });

    if (!gasto) {
      return res.status(404).json({ 
        error: "Gasto não encontrado ou não pertence ao usuário" 
      });
    }
    res.json(gasto);
  } catch (error) {
    console.error("Erro ao buscar gasto:", error);
    res.status(500).json({ 
      error: "Erro ao buscar gasto",
      details: error.message 
    });
  }
});

// Rota para adicionar um novo gasto
app.post("/gastos", authenticateUser, async (req, res) => {
  try {
    const { descricao, valor, categoria, data } = req.body;
    const novoGasto = await prisma.gasto.create({
      data: { 
        descricao, 
        valor: parseFloat(valor), 
        categoria, 
        data: data ? new Date(data) : new Date(),
        userId: req.user.id 
      },
    });
    res.status(201).json(novoGasto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao adicionar gasto" });
  }
});

// Rota para excluir um gasto por ID
app.delete("/gastos/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verifica se o gasto existe e pertence ao usuário
    const gasto = await prisma.gasto.findFirst({
      where: { 
        id,
        userId: req.user.id 
      }
    });

    if (!gasto) {
      return res.status(404).json({ 
        error: "Gasto não encontrado ou não pertence ao usuário" 
      });
    }

    await prisma.gasto.delete({ 
      where: { id } 
    });

    res.json({ 
      success: true,
      message: "Gasto excluído com sucesso!" 
    });
  } catch (error) {
    console.error("Erro ao excluir gasto:", error);
    res.status(500).json({ 
      error: "Erro ao excluir gasto",
      details: error.message 
    });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
