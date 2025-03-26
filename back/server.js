const express = require("express"); // Importa o express
const app = express(); // Instancia o express
const { PrismaClient } = require("@prisma/client"); // Importa o Prisma Client
const prisma = new PrismaClient(); // Instancia o Prisma Client
const cors = require("cors"); // Importa o CORS
const bcrypt = require("bcrypt"); // Para hash de senhas
const jwt = require("jsonwebtoken"); // Para gerar tokens JWT

app.use(cors()); // Libera o acesso do frontend
const PORT = 3001; // Define a porta
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

// Rota para login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: "Usuário não encontrado" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Senha inválida" });
  }

  // Gerar token JWT
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Rota inicial
app.get("/", (req, res) => {
  res.send("API da aplicação financeira está rodando!");
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
