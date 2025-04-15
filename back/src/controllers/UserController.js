const UserModel = require("../models/User");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const UserController = {
  create: async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      const newUser = await prisma.user.create({
        data: { name, email, password }
      });
  
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      res.status(500).json({
        error: "Erro ao cadastrar usuário",
        details: error.message
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await prisma.user.findUnique({
        where: { email }
      });
  
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }
  
      // ✅ Agora o "token" é o ID do usuário em texto
      const fakeToken = String(user.id);
  
      res.json({
        token: fakeToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      console.error("Erro no login:", error);
      res.status(500).json({
        error: "Erro no login",
        details: error.message
      });
    }
  },
  

  getAll: async (req, res) => {
    try {
      const users = await UserModel.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar usuários", details: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const user = await UserModel.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar usuário", details: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const [updatedRows] = await UserModel.update(req.body, {
        where: { id: req.params.id },
      });
      if (updatedRows === 0) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      const updatedUser = await UserModel.findByPk(req.params.id);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar usuário", details: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const deleted = await UserModel.destroy({ where: { id: req.params.id } });
      if (!deleted) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.json({ success: true, message: "Usuário excluído com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao excluir usuário", details: error.message });
    }
  },
};

module.exports = UserController;
