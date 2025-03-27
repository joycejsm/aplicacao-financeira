const GastoCompartilhadoModel = require("../models/GastoCompartilhado");

const GastoCompartilhadoController = {
  list: async (req, res) => {
    const userId = req.user?.userId;

    try {
      const gastos = await GastoCompartilhadoModel.findAllByUserId(userId);
      res.json(gastos);
    } catch (error) {
      console.error("Erro ao listar gastos:", error);
      res.status(500).json({ 
        error: "Erro ao buscar gastos compartilhados",
        details: error.message 
      });
    }
  },

  findById: async (req, res) => {
    const userId = req.user?.userId;
    const { id } = req.params;

    try {
      const gasto = await GastoCompartilhadoModel.findById(userId, id);
      if (!gasto) {
        return res.status(404).json({ error: "Gasto compartilhado não encontrado" });
      }
      res.json(gasto);
    } catch (error) {
      console.error("Erro ao buscar gasto:", error);
      res.status(500).json({ 
        error: "Erro ao buscar gasto compartilhado",
        details: error.message 
      });
    }
  },

  aceitar: async (req, res) => {
    const userId = req.user?.userId;
    const { id } = req.params;

    try {
      // Verifica se o gasto pertence ao usuário antes de aceitar
      const gasto = await GastoCompartilhadoModel.findById(userId, id);
      if (!gasto || gasto.length === 0) {
        return res.status(403).json({ error: "Não autorizado" });
      }

      const gastoAtualizado = await GastoCompartilhadoModel.updateStatus(id, 'Aceito');
      res.json(gastoAtualizado);
    } catch (error) {
      console.error("Erro ao aceitar gasto:", error);
      res.status(500).json({ 
        error: "Erro ao aceitar gasto compartilhado",
        details: error.message 
      });
    }
  },

  recusar: async (req, res) => {
    const userId = req.user?.userId;
    const { id } = req.params;

    try {
      // Verifica se o gasto pertence ao usuário antes de recusar
      const gasto = await GastoCompartilhadoModel.findById(userId, id);
      if (!gasto || gasto.length === 0) {
        return res.status(403).json({ error: "Não autorizado" });
      }

      const gastoAtualizado = await GastoCompartilhadoModel.updateStatus(id, 'Recusado');
      res.json(gastoAtualizado);
    } catch (error) {
      console.error("Erro ao recusar gasto:", error);
      res.status(500).json({ 
        error: "Erro ao recusar gasto compartilhado",
        details: error.message 
      });
    }
  }
};

module.exports = GastoCompartilhadoController;
