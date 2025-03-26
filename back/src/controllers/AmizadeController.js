const AmizadeModel = require("../models/Amizade");

const AmizadeController = {
  list: async (req, res) => {
    const userId = req.user?.userId;
    try {
      const amizades = await AmizadeModel.findAllByUserId(userId);
      res.json(amizades);
    } catch (error) {
      console.error("Erro ao listar amizades:", error);
      res.status(500).json({ error: "Erro ao buscar amizades" });
    }
  },
  create: async (req, res) => {
    const user1Id = req.user?.userId;
    const { user2Id } = req.body;

    if (!user1Id || !user2Id) {
      return res.status(400).json({ error: "IDs de usuários inválidos" });
    }

    if (user1Id === user2Id) {
      return res.status(400).json({ error: "Você não pode adicionar a si mesmo" });
    }

    try {
      const amizade = await AmizadeModel.create(user1Id, user2Id);
      res.status(201).json(amizade);
    } catch (error) {
      console.error("Erro ao criar amizade:", error);
      res.status(500).json({ error: "Erro ao criar amizade" });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;

    try {
      const amizade = await AmizadeModel.findById(id);
      if (!amizade) {
        return res.status(404).json({ error: "Amizade não encontrada" });
      }

      await AmizadeModel.deleteById(id);
      res.json({ message: "Amizade deletada com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar amizade:", error);
      res.status(500).json({ error: "Erro ao deletar amizade" });
    }
  },
};

module.exports = AmizadeController;
