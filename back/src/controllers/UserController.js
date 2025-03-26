const UserModel = require("../models/User");

const UserController = {
  create: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const newUser = await UserModel.create({ name, email, password });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Erro ao cadastrar usuário", details: error.message });
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
      const user = await UserModel.findById(req.params.id);
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
      const user = await UserModel.update(req.params.id, req.body);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar usuário", details: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      await UserModel.delete(req.params.id);
      res.json({ success: true, message: "Usuário excluído com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao excluir usuário", details: error.message });
    }
  },
};

module.exports = UserController;
