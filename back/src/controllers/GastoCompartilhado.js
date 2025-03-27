const GastoCompartilhadoModel = require("../models/GastoCompartilhado");

const GastoCompartilhadoController = {
  list: async (req, res) => {
    const userId = req.user?.userId;

    try {
      const gastos = await GastoCompartilhadoModel.findAllByUserId(userId);
      res.json(gastos);
    } catch (error) {
      console.error("Erro ao listar gastos:", error);
      res.status(500).json({ error: "Erro ao buscar gastos compartilhados" });
    }
  },
  findById: async (req, res) => {
    const userId = req.user?.userId;
    const { id } = req.params;

    try {
      const gastos = await GastoCompartilhadoModel.findById(userId, id);
      res.json(gastos);
    } catch (error) {
      console.error("Erro ao buscar gasto:", error);
      res.status(500).json({ error: "Erro ao buscar gasto compartilhado" });
    }
  },
};

module.exports = GastoCompartilhadoController;
