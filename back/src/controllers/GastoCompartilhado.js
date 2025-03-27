const GastoCompartilhadoModel = require("../models/GastoCompartilhado");

const GastoCompartilhadoController = {
  list: async (req, res) => {
    const userId = req.user?.id; // Corrigido aqui para usar req.user.id diretamente
    try {
      const gastos = await GastoCompartilhadoModel.findAllByUserId(userId);
      res.json(gastos);
    } catch (error) {
      console.error("Erro ao listar gastos:", error);
      res.status(500).json({ error: "Erro ao buscar gastos compartilhados" });
    }
  },

  findById: async (req, res) => {
    const userId = req.user?.id;
    const { id } = req.params;

    try {
      const gasto = await GastoCompartilhadoModel.findById(userId, id);
      res.json(gasto);
    } catch (error) {
      console.error("Erro ao buscar gasto:", error);
      res.status(500).json({ error: "Erro ao buscar gasto compartilhado" });
    }
  },

  aceitar: async (req, res) => {
    const userId = req.user?.id;
    const { id } = req.params;

    try {
      const gasto = await GastoCompartilhadoModel.updateStatus(id, userId, "Aceito");
      res.json({ success: true, message: "Gasto aceito com sucesso", gasto });
    } catch (error) {
      console.error("Erro ao aceitar gasto:", error);
      res.status(500).json({ error: "Erro ao aceitar gasto compartilhado" });
    }
  },

  recusar: async (req, res) => {
    const userId = req.user?.id;
    const { id } = req.params;

    try {
      const gasto = await GastoCompartilhadoModel.updateStatus(id, userId, "Recusado");
      res.json({ success: true, message: "Gasto recusado com sucesso", gasto });
    } catch (error) {
      console.error("Erro ao recusar gasto:", error);
      res.status(500).json({ error: "Erro ao recusar gasto compartilhado" });
    }
  }
};

module.exports = GastoCompartilhadoController;
